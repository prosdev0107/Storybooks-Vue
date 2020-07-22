import React from 'react'
import {isSafari} from 'react-device-detect'
import LeftMenuContainer from "../containers/library/LeftMenuContainer"
import LibraryContentContainer from "../containers/library/LibraryContentContainer"
import SearchAPIBarContainer from "../containers/library/SearchAPIBarContainer"
import LibraryImgFiltersContainer from "../containers/library/LibraryImgFiltersContainer"
import {TAB_GENERAL, TAB_GIF, TAB_IMAGE, TAB_TEXT} from "../constants/constants"

const Library = ({stickers_menu_tab, listen_drag_events, selectFromLibrary, loadMoreStickers}) => {

    let onDragOverDo = listen_drag_events && !isSafari ? (event) => selectFromLibrary('EVENT_PREVENT_DEFAULT',event) : null
    let onMouseMoveDo = listen_drag_events && isSafari ? (event) => selectFromLibrary('EVENT_PREVENT_DEFAULT',event) : null
    let onDropDo = (event) => selectFromLibrary('EVENT_PREVENT_DEFAULT',event)
    let api_source = stickers_menu_tab === TAB_GIF ? "giphy" : "pixabay"

    // Render library content to display depending on chosen tab
    const renderLibraryContent = (stickers_menu_tab) => {

        // let hide_column = stickers_menu_tab === TAB_GENERAL ? "animate-hide-left" : ""
        let hide_column = ""

        if (stickers_menu_tab === TAB_GENERAL) {

            return  <div className={"stickers-library-container"} >
                <div className={"stickers-library animate-left"}>
                    <LibraryImgFiltersContainer />
                </div>
            </div>

        } else if (stickers_menu_tab === TAB_IMAGE || stickers_menu_tab === TAB_GIF || stickers_menu_tab === TAB_TEXT) {

            // Render stickers content
            return <div className={"stickers-library-container"} >
                <div className={"stickers-library animate-left "+hide_column}
                     onDragStart={(event) => selectFromLibrary('LIBRARY_STICKER_DRAG_START',event)}
                     onDragOver={onDragOverDo}
                     onMouseMove={onMouseMoveDo}
                     onDoubleClick={(event) => selectFromLibrary('LIBRARY_STICKER_DOUBLE_CLICK',event)}
                     onDrop={onDropDo}
                     onScroll={(event) => handleScroll(event)}
                >
                    {/* Search tool dedicated to the selected stickers category */}
                    {renderSearchBar(stickers_menu_tab)}

                    {/* Stickers found for that search */}
                    <LibraryContentContainer source={api_source} type={"sticker"}/>

                </div>
            </div>
        }

        return <div/>

    }

    // Render a search bar to search through Image API
    const renderSearchBar = (stickers_menu_tab) => {


        if (stickers_menu_tab === TAB_GIF || stickers_menu_tab === TAB_IMAGE) {

            // Here we render one form per search type
            // So that search bears can evolve independently
            return  <div>
                <div className={stickers_menu_tab === TAB_GIF ? "hidden" : ""}>
                    <SearchAPIBarContainer source={"pixabay"} type={"sticker"} />
                </div>
                <div className={stickers_menu_tab === TAB_IMAGE ? "hidden" : ""}>
                    <SearchAPIBarContainer source={"giphy"} type={"sticker"} />
                </div>
            </div>
        }

        return <div/>
    }

    const handleScroll = (event) => {

        let scrollTop = event.target.scrollTop
        let libraryHeight = event.target.offsetHeight
        let scrollHeight = event.target.scrollHeight

        let scrolledToBottom = Math.ceil(scrollTop + libraryHeight + 50) >= scrollHeight

        if (scrolledToBottom) {
            loadMoreStickers({
                api_source: api_source,
                type: "sticker"
            })
        }
    }

    return <div>

        {/* Left sidebar menu to switch from tab*/}
        <LeftMenuContainer />

        {/* Preload dashbox image to get ghost image when dragging at first time */}
        <img className="hidden" src="images/dashbox.png" alt="dashbox"/>

        {/* Render library content to display depending on chosen tab  */}
        {renderLibraryContent(stickers_menu_tab)}

    </div>
}

export default Library
