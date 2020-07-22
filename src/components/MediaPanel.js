import React from 'react'

import StickerLayerContainer from '../containers/central/StickersLayerContainer'
import {MEDIA_PANEL_ID} from "../constants/constants"
import ClipIframeContainer from '../containers/central/ClipIframeContainer'
import {isSafari} from 'react-device-detect'
import PreviewSwitcherContainer from "../containers/central/PreviewSwitcherContainer"

/**
 * The Media Panel is where we can customize media with content
 * It has 4 layers (from bottom to top) :
 * - Media layer : display the media itself (picture or video)
 * - Overlay layer : A transparent layer just above media that allows make text more readable
 * - Stickers layer : Where we can drag, resize, rotate our layers
 * - Buttons layer : All the clip native elements like cta buttons, header...
 * @returns {*}
 * @constructor
 */
const MediaPanel = ({ cs_item_general, cs_item_media, listen_drag_events, is_importing_media, cs_item_index_editing, sendToReducers }) => {

    let overlay = cs_item_general.overlay || {}
    let mediaParams = cs_item_general.media || {}
    let overlay_styles = {
        backgroundColor: overlay.color,
        opacity: overlay.opacity
    }

    if ((cs_item_media.src || "").length === 0 && cs_item_index_editing > 0) {
        // Media is not available anymore (could happen when redo/undo last element while editing it)
        // Better reinit to index 0 than displaying "empty" media
        sendToReducers('MEDIA_SWITCHER_CHANGE_INDEX',{
            new_index: 0
        })
    }

    const renderBlurBackground = () => {

        let blur_background_styles = {
            backgroundImage: "url('"+(cs_item_media.thumbnail || cs_item_media.src)+"')"
        }

        return !(mediaParams.fit_screen || 0) ?
            "" : <div id="blur-background" className="blur-background absolute-center" style={blur_background_styles}/>
    }

    // Display image or video depending of media type
    const renderMedia = () => {

        if (typeof cs_item_media === "undefined") {
            return null
        }

        // Full screen or fit screen with blurred background ?
        let posterType = mediaParams.fit_screen || 0 ? "poster-fit-screen" : "poster-full-screen"

        // Get thumbnail static image if video
        let mediaToImg = cs_item_media.isVideo ? cs_item_media.thumbnail : cs_item_media.src

        if (typeof mediaToImg === "undefined" || mediaToImg.length < 5) {
            return null
        }

        // If image already loaded, need to call function manually to adapt media size depending on full screen on/off
        // Because of asynchronous rendering, we need to add class from there
        // let additionalClass = fillMediaMethod(posterType)

        return <img
            className={`poster absolute-center ${posterType}`}
            src={mediaToImg}
            alt="media"
            onLoad={() => fillMediaMethod(posterType)}
        />
    }

    // Adapt to height or width depending of media dimensions
    const fillMediaMethod = (posterType) => {

        let panel = document.getElementById(MEDIA_PANEL_ID)
        if (panel != null) {
            let mediaPanelRect = panel.getBoundingClientRect()
            let media = panel.querySelector(".media-panel-layer-media .poster")
            if (typeof media !== "undefined" && media !== null && (media.videoWidth || media.width)) {

                let isVideo = typeof media.videoWidth !== "undefined" && media.videoWidth != null
                let mediaWidth = isVideo ? media.videoWidth : media.naturalWidth,
                    mediaHeight = isVideo ? media.videoHeight : media.naturalHeight,
                    panelWidth = mediaPanelRect.width,
                    panelHeight = mediaPanelRect.height

                let fillMethod = "poster-fill-width"

                if (posterType === "poster-full-screen") {

                    if (mediaWidth/mediaHeight > panelWidth/panelHeight) {
                        // For same height, media is wider than panel
                        // Thus to get full screen media we need to set height at 100%
                        fillMethod = "poster-fill-height"
                    }

                } else if (mediaWidth/mediaHeight < panelWidth/panelHeight) {
                    fillMethod = "poster-fill-height"
                }

                // Apply fill method to media
                if (fillMethod === "poster-fill-height") {
                    media.classList.remove('poster-fill-width')
                    media.classList.add('poster-fill-height')
                } else {
                    media.classList.remove('poster-fill-height')
                    media.classList.add('poster-fill-width')
                }
                return fillMethod
            }
        }

        // By default (when we don't dim yet),
        // There is a better chance we need to fill height when full screen
        return posterType === "poster-full-screen" ? "poster-fill-height" : "poster-fill-width"
    }

    return <div className={"media-panel-container absolute-center "}>

        <div id={MEDIA_PANEL_ID} className="media-panel">

            {/* Media layer */}
            <div className={"media-panel-layer media-panel-layer-media "+cs_item_general.img_filter_class}>

                {renderBlurBackground()}

                {renderMedia()}

            </div>

            {/* Overlay layer */}
            <div className={"media-panel-layer media-panel-layer-overlay"} style={overlay_styles}>

            </div>

            {/* Stickers layer */}
            <div className={"media-panel-layer media-panel-layer-stickers"} >
                <StickerLayerContainer />
            </div>

            {/* Native elements layer or preview mode */}
            {/* On Safari, iframe CONTENT cannot be set entirely to pointer-event none, so will receive the drag over and on drop events */}
            {/* That's why we need to deactivate it while dragging elements */}
            {/* Also need to hide it when drag'n dropping file from import modal, else dropzone is not working well on CHROME */}
            <div className={"media-panel-layer media-panel-layer-buttons "
                +((isSafari && listen_drag_events) || is_importing_media ? "hidden" : "")} >

                <ClipIframeContainer is_preview={0} />

            </div>

        </div>

        <PreviewSwitcherContainer />

    </div>
}


export default MediaPanel
