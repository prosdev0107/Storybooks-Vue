import React from 'react'
import {tryGenerateVideoThumbnail} from "../utilities/videoThumbnail"
import {timeToString} from "../utilities/toolbox"

const ImportAPIMedia = ({media, isCurrentlyPreselected, preselectMedia}) => {

    const clickMedia = () => {

        // Ask for image resize before upload
        preselectMedia(media)

    }
    let mediaUrl = media.source.src_comp

    // Generate thumbnail from video if we don't have any yet
    // ACCES CONTROL ALLOW ORIGIN * MUST BE SET ON TARGET VIDEO if loaded from external API
    // Else, forget the library
    const generateThumbnail = (event) => {

        if ((media.source.thumbnail || "").length === 0
        || (media.source.thumbnail || "").indexOf('.mp4') !== -1) {

            // We need to generate image thumbnail ourself
            let button = event.target

            // Find video element
            let mediaContainer = button.closest(".api-library-media")
            let video = mediaContainer.querySelector("video")

            // Generate thumbnail and get its url
            tryGenerateVideoThumbnail(video, 0, function(url) {
                // Inject in media thumbnail field
                if (url != null && url.length > 0) {
                    media.source.thumbnail = url
                }
            })
        }

        preselectMedia(media)
    }

    const removeControls = (event) => {
        // With firefox, we need to remove controls this way
        let video = event.target
        video.controls = false
    }

    const playVideo = (event) => {

        // Play video the user is hovering
        let video = event.target
        if(video.paused){
            video.play();
        }
    }

    const stopVideo = (event) => {

        // Play video the user is leaving the video
        let video = event.target
        if(!video.paused){
            video.pause();
        }
    }

    // Display total length of video available
    const updateVideoDuration = (event) => {

        // Find where to display duration
        let video = event.target
        let durationSpan = video.parentNode.querySelector('.video-duration')

        // Transform time to a readable one
        durationSpan.innerHTML = timeToString(video.duration)
    }

    // hide media if src not found
    const mediaSrcNotFound = (event) => {
        let elmt = event.target

        // Find media container
        let i=0
        let parent = elmt.parentNode
        while (!parent.classList.contains("api-library-media-container") && i < 2) {
            parent = parent.parentNode
            i++
        }

        // Hide it
        if (parent.classList.contains("api-library-media-container")) {
            parent.style.display="none"
        }
    }

    // If user just imports this media, we may have not optimized it yet
    // let isMediaDisabled = media.need_optimization || 0
    let isMediaDisabled = 0 // For now we can disable that behaviour

    if (isMediaDisabled && media.type !== "img") {
        // That's a non-clickable video, need to display a thumbnail
        mediaUrl = media.source.thumbnail
    }

    return media.type === "img" || isMediaDisabled ?
        <div
            className={"api-library-media relative "+ (isMediaDisabled ? "disabled" : (isCurrentlyPreselected ? "selected" : ""))}
            onClick={() => isMediaDisabled ? null : clickMedia()}
        >
            <img src={mediaUrl}
                 alt=""
                 onError={(evt) => mediaSrcNotFound(evt)}
            />

            <i className={isMediaDisabled ? "fa fa-hourglass-half absolute absolute-center" : "hidden"}/>
        </div>
        :
        <div
            className={"api-library-media relative "+ (isCurrentlyPreselected ? "selected" : "")}
            onClick={() => clickMedia()}
        >
            <video crossOrigin="anonymous" loop
                   onLoadStart={(e) => removeControls(e)}
                   onClick={(e) => generateThumbnail(e)}
                   onMouseOver={(e) => playVideo(e)}
                   onMouseOut={(e) => stopVideo(e)}
                   onLoadedMetadata={(e) => updateVideoDuration(e)}
                   onError={(evt) => mediaSrcNotFound(evt)}
                   /* poster={(media.source.thumbnail || "")} */
            >
                <source src={mediaUrl} type="video/mp4" />
            </video>
            <i className={"fas fa-video"}/>
            <span className={"video-duration"}></span>
        </div>
}


export default ImportAPIMedia
