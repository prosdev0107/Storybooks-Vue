import React from 'react'
import InputRange from 'react-input-range'
import {reduxForm} from "redux-form"
import 'react-input-range/lib/css/index.css'
import {tryGenerateVideoThumbnail} from "../utilities/videoThumbnail"
import {timeToString} from "../utilities/toolbox"

// No reliable plugin for that one !
// Need to do all by ourselves

class ImportMediaVideoCropper extends React.Component {

    state = {
        player: 0,
        playerVisible: true,
        timer: {
            min: this.props.crop_start,
            max: this.props.crop_end
        },
        videoDuration: 0,
        videoIsPlaying: false,
        maxVideoWidth: 640,
        updateTimeout: null
    }

    // After initialization, simulate a 1st crop to generate a thumbnail (chrome f@ix)
    componentDidMount() {
        tryGenerateVideoThumbnail(document.getElementById("trim-video"),0,this.videoThumbnailCallback)
    }

    // Same just before unloading the view
    componentWillUnmount() {
        tryGenerateVideoThumbnail(document.getElementById("trim-video"),100,this.videoThumbnailCallback)
    }

    // With firefox, we need to remove controls this way
    removeControls = (event) => {
        let video = event.target
        video.controls = false
    }

    // Init slider max range value with video durations
    manageVideoDuration = (e) => {

        let video = e.target
        let newDuration = video.duration

        if (newDuration > 0 && newDuration !== this.state.videoDuration) {

            // Because this method will be triggered if back from resize step,
            // We cannot just set start = 0 and end = newDuration
            // Else previous crop will be erased
            let timerStart = this.state.timer.min >= newDuration ? 0 : this.state.timer.min
            let timerEnd = this.state.timer.max === 0 || this.state.timer.max > newDuration ? newDuration : this.state.timer.max

            // Update time cropper slider
            this.setState({
                videoDuration: newDuration,
                timer: {
                    min: timerStart,
                    max: timerEnd
                }
            })
            this.setPlayerCursorPosition(timerStart)

            // Store to global state
            this.props.updateDurations({
                start: timerStart,
                end: timerEnd
            })

            // Also, adapt crop editor to window
            let modalHeight = document.querySelector('.import-media-modal .modal-content').offsetHeight;

            let videoHeight = video.videoHeight;
            let videoWidth = video.videoWidth;

            // let maxVideoHeight = modalHeight - 290;
            let maxVideoHeight = modalHeight - 200;
            let maxVideoWidth = Math.min(640, maxVideoHeight * videoWidth / videoHeight)

            this.setState({
                maxVideoWidth: maxVideoWidth
            })
        }
    }

    // Play/pause video control button
    toggleVideo = (state) => {

        let video = document.getElementById("trim-video")
        if(video.paused && (typeof state === "undefined" || state === 1)) {
            video.play()
            this.setState({
                videoIsPlaying: true
            })
        } else if (!video.paused && (typeof state === "undefined" || state === 0)) {
            video.pause()
            this.setState({
                videoIsPlaying: false
            })
        }
    }

    // Set player cursor position along with video current time property
    setPlayerCursorPosition = (newPosition) => {

        let video = document.getElementById("trim-video")
        let videoCurrentTime = video.currentTime

        newPosition = newPosition || videoCurrentTime

        this.setState({
            player: newPosition
        })

        if (newPosition !== videoCurrentTime) {
            video.currentTime = newPosition
        }
    }

    // Avoid video playing beyond defined timer range
    manageVideoCurrentTime = (event) => {

        let video = event.target
        let currentTime = video.currentTime

        // Javascript is still messing around with exact values
        // So we need to round everything before comparison
        if (Math.trunc(currentTime*1000) < Math.trunc(1000*this.state.timer.min)
            || Math.trunc(currentTime*1000) > Math.trunc(1000*this.state.timer.max) ) {

            // Pause video if was playing, to avoid auto-loop effect
            this.toggleVideo(0)

            // Go back to video start
            this.setPlayerCursorPosition(this.state.timer.min)

        } else {

            // Update player cursor position
            this.setState({
                player: currentTime
            })
        }
    }

    playerInputChanged = (value) => {

        // When user moves player cursor himself, ensure the cursor is still on the right range
        let newPosition = Math.min(this.state.timer.max, Math.max(this.state.timer.min,value))
        this.setPlayerCursorPosition(newPosition)
    }

    cropInputChanged = (value) => {

        // Javascript is still messing around with exact values
        // So we need to round everything before comparison
        let hasMovedLeftCursor = Math.trunc(1000*this.state.timer.min) !== Math.trunc(1000*this.props.crop_start)

        // Edit local state
        this.cropInputChanging(value)

        this.setState({
            playerVisible: true,
        })

        // Store new cursor position to global state
        let correctedMax = Math.min(this.state.videoDuration, Math.max(0,value.max))
        let correctedMin = Math.min(correctedMax, Math.max(0,value.min))
        this.props.updateDurations({
            start: correctedMin,
            end: correctedMax
        })

        // Update video with a short timeout, time for video to have an up-to-date preview
        if (hasMovedLeftCursor) {
            tryGenerateVideoThumbnail(document.getElementById("trim-video"),0, this.videoThumbnailCallback)
        }
    }

    videoThumbnailCallback = (url) => {

        if (url != null && url.length > 100) {
            this.props.sendToReducers("IMPORT_MEDIA_UPDATE_VIDEO_THUMBNAIL", url)
        }

    }

    cropInputChanging = (value) => {

        // Hide player cursor for no strange transition
        if (this.state.playerVisible) {
            this.setState({playerVisible:false})
        }

        // Pause video if was playing
        this.toggleVideo(0)

        // Are we editing left or right cursor
        let isMovingRightCursor = Math.round(100*this.state.timer.max) !== Math.round(100*value.max);
        let isMovingLeftCursor = Math.round(100*this.state.timer.min) !== Math.round(100*value.min);

        // If moving right cursor, move video player cursor on it
        let newPlayerPosition = isMovingLeftCursor ?
            value.min :
            (isMovingRightCursor ? value.max : this.state.player)

        this.setState({
            timer: value
        })

        // Update video preview
        this.setPlayerCursorPosition(newPlayerPosition)
    }



    renderVideo = () => {

        let blocStyles = {
            maxWidth: this.state.maxVideoWidth+"px"
        }

        return !this.props.url_video || this.props.url_video.length === 0 ?
            <div />
            :
            <video id={"trim-video"}
                   crossOrigin="anonymous"
                   className={"center-block"}
                   width="640"
                   /* poster={this.props.url_poster} */
                   onLoadStart={(e) => this.removeControls(e)}
                   onLoadedMetadata={(e) => this.manageVideoDuration(e)}
                   onDurationChange={(e) => this.manageVideoDuration(e)}
                   onTimeUpdate={(e) => this.manageVideoCurrentTime(e)}
                   src={this.props.url_video}
                   style={blocStyles}
            />
    }
    render() {

        let maxWrapperWidth = Math.max(400, this.state.maxVideoWidth)+"px"
        let blocStyles = {
            maxWidth: maxWrapperWidth
        }

        // What should we display as video duration ?
        let durationCropped = this.state.timer.max - this.state.timer.min
        // If user crops the video, change color of the duration label
        // Because it's hard for user to come back EXACTLY to original cursor position, we calculate that this way :
        let isCropped = (this.state.videoDuration - durationCropped)/this.state.videoDuration >= 0.01

        // The following calculations are theoricately useless, but we have some problems of rounded number with js
        let vidDuration = this.state.videoDuration > 0 ? this.state.videoDuration : 0.1
        let playerCorrected = Math.max(0,Math.min(this.state.player, vidDuration))
        let timerCorrected = {
            min: Math.max(this.state.timer.min, 0),
            max: Math.min(this.state.timer.max, vidDuration),
        }

        return <div className="video-cropper">

            <div className="video-player-wrapper center-block" style={blocStyles}>

                {this.renderVideo()}

                <div className={"video-player"}>

                    <button
                        className={"video-player-control btn btn-pure inline-block"}
                        onClick={() => this.toggleVideo()} >
                        <i className={"fas "+(this.state.videoIsPlaying ? "fa-pause" : "fa-play")} />
                    </button>

                    <div className={"video-player-slider inline-block relative"}>

                        <div className={"absolute absolute-center width-full slider-player "+(this.state.playerVisible ? "" : "hidden")}>
                            <InputRange
                                draggableTrack
                                maxValue={vidDuration}
                                minValue={0}
                                allowSameValues={true}
                                step={0.01}
                                formatLabel={value => timeToString(value, true)}
                                onChange={value => this.setState({player:value})}
                                onChangeComplete={value => this.playerInputChanged(value)}
                                value={playerCorrected} />
                        </div>

                        <div className={"absolute absolute-center width-full slider-cropper"}>
                            <InputRange
                                draggableTrack
                                maxValue={vidDuration}
                                minValue={0}
                                allowSameValues={true}
                                step={0.01}
                                formatLabel={value => timeToString(value, true)}
                                onChange={value => this.cropInputChanging(value)}
                                onChangeComplete={value => this.cropInputChanged(value)}
                                value={timerCorrected} />
                        </div>

                    </div>

                    <span
                        className={"video-player-duration-crop "+(isCropped ? "video-player-duration-cropped" : "")}
                    >{ timeToString(durationCropped, true) }</span>

                </div>

            </div>

            {/*
            <div className={"margin-10 margin-bottom-0"}>

                <InputRange
                    draggableTrack
                    maxValue={this.state.videoDuration > 0 ? this.state.videoDuration : 0.1}
                    minValue={0}
                    allowSameValues={true}
                    step={0.01}
                    formatLabel={value => this.timeToString(value)}
                    onChange={value => this.setState({timer:value})}
                    onChangeComplete={value => this.cropInputChanged(value)}
                    value={this.state.timer} />

                    <div className={"width-full timer-display"}>


                    <span className={"text-left"}>
                        <FormattedMessage id="import.videocrop.time.start" /> : { this.timeToString(this.state.timer.min) }
                    </span>
                        <span className={"text-right"}>
                        <FormattedMessage id="import.videocrop.time.end" /> : { this.timeToString(this.state.timer.max) }
                    </span>


                    </div>

            </div>
            */}

        </div>
    }
}

export default reduxForm({
    form: 'ImportMediaVideoCropperForm'
})(ImportMediaVideoCropper)
