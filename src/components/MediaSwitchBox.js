import React from 'react'

const MediaSwitchBox = ({index, selected, type, cs_item, cs_items_length, mediasSwitchBoxAction}) => {

    function renderButtonContent() {

        if (type === "add") {

            // "add new media" button
            return <div className={"media-switchbox-btn-container"}>
                <button
                    onClick={(event) => mediasSwitchBoxAction('SHOW_IMPORT_MEDIA_MODAL')}
                >
                    <div className={"overlay absolute"}>
                        <span className={"absolute absolute-center"}>+</span>
                    </div>

                </button>
            </div>
        } else if (type === "delete"){

            // "remove media" button "appears when one media is dragging
            return <div className={"media-switchbox-btn-container"}>
                <button>
                    <div className={"overlay absolute"}>
                        <span className={"absolute absolute-center"}><i className={"fa fa-trash-alt"}/> </span>
                    </div>
                </button>
            </div>

        } else if ( selected === -1 ){

            // That's the placeholder when dragging element
            return <div className={"media-switchbox-btn-container"}>
                <button>
                    <div className={"overlay absolute"}>
                    </div>

                </button>
            </div>

        }

        // Media box
        let btnStyles = {
            backgroundImage: "url('"+cs_item.media.thumbnail+"')"
        }

        return <div className={"media-switchbox-btn-container"}>

            <button
                className={selected ? "relative btn-active" : "relative"}
                onClick={(event) => mediasSwitchBoxAction('MEDIA_SWITCHER_CHANGE_INDEX',{
                    new_index: index
                })}
                style={btnStyles}
            >
                <div className={"overlay absolute"}>
                    <span className={"absolute absolute-center"}>{index+1}</span>
                </div>
            </button>

        </div>
    }

    return <div className="media-switchbox">

        { renderButtonContent() }

    </div>
}

export default MediaSwitchBox
