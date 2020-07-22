import React from 'react'
import SimpleStickerContainer from "../containers/SimpleStickerContainer"
import {StoryStickerTypes,StoryStickerDefaults} from "./propTypes/StoryStickerTypes"

// A draggable, resizable box on storyStickerBoxes

const StorySticker = ({
                             id,
                             sticker,          // What should be displayed inside the box
                             position,         // Current position relative to parent container
                             edit_info,        // If currently edited by user, information about current modification
                         }) => {

    let styles = {
        left:   position.x*100+'%',
        top:    position.y*100+'%',
        width:  position.width*100+'%'
    }

    if (typeof position.maxWidth !== "undefined" && position.maxWidth.length >= 3) {
        styles.maxWidth = position.maxWidth
    }

    // paddingTop allows to keep sticker ratio whatever the screen ratio is
    let container_styles = {
        paddingTop: (Math.round(1000/position.ratio)/10)+"%"
    }

    if (typeof position.rotation !== "undefined" && position.rotation != null) {
        styles.transform= "translate(-50%,-50%) rotate("+position.rotation+"rad)"
    }

    return (
        <div id={id}
             data-component="story-sticker"
             className={"story-sticker-"+sticker.type+(edit_info.selected ? " story-sticker selected " : " story-sticker ")}
             draggable={true}
             style={styles}
        >

            {/* This sticker container allow us to keep the ratio w/h of the sticker */}
            <div className={"width-full relative"} style={container_styles}>
                {/* Render box content */}
                <SimpleStickerContainer sticker={sticker}/>
            </div>


            {/* Render rotate symbol on top of box when selected */}
            <div className="rotatable-handle">
                <div className="rotatable-handle-bar" />
                <div className="rotatable-handle-circle" data-rotate-handler={1}/>
            </div>

            {/* Render 8 "resizable-style" squares around the box when selected */}
            {['nw','ne','sw','se','n','s','e','w'].map((region, i) =>
                <div
                    key={i}
                    data-region={region}
                    className={`resizable-handle resizable-${region}`}
                    data-resize-handler={1}
                />
            )}
        </div>
    )
}


StorySticker.propTypes = StoryStickerTypes

StorySticker.defaultProps = StoryStickerDefaults

export default StorySticker
