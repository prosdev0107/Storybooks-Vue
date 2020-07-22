import {TAB_GENERAL} from "../constants/constants"

const libraryDynamicReducer = (state = [], action) => {

    let api_source, type, api_state_key

    switch (action.type) {

        case 'LIBRARY_TAB_SELECTED':

            return {
                ...state,
                stickers_menu_tab: action.data || TAB_GENERAL,
            }

        case 'LIBRARY_API_SEARCH_BAR_CHANGED':

            // String the user queries
            let searchText = action.data.text

            // Identify search bar that has just been used
            api_source = action.data.source
            type = action.data.type

            // Edit info at this location
            let newSearchInfo = {
                text: searchText,
                length: 0,           // Reset offset to 0,
                is_loading: true
            }

            return {
                ...state,
                search: {
                    ...state.search,
                    [api_source+"_"+type]: newSearchInfo
                }
            }

        case 'LIBRARY_SCROLL_LOAD_MORE':

            // Identify search bar that has just been used
            api_source = action.data.api_source
            type = action.data.type
            api_state_key = api_source+"_"+type

            // Do we need to empty library before reload ?
            let reload = action.data.reload || false

            // Load more content into library when scrolling down
            // We already know what have been loaded, so just need to pass is_loading to true
            // And SearchApiBar component will launch the load more process
            return {
                ...state,
                search: {
                    ...state.search,
                    // Update total length of elements already updated
                    [api_state_key]: {
                        ...state.search[api_state_key],
                        is_loading: true,
                        medias: reload ? [] : state.search[api_state_key].medias
                    }
                },
            }

        case 'LIBRARY_EXTERNAL_CONTENT_LOADED':

            // Identify search bar that has just been used
            api_source = action.data.api_source
            type = action.data.type
            api_state_key = api_source+"_"+type

            // Let's format gifs data from giphy into our classic sticker data
            // So we can render them as simple sticker
            let medias = action.data.medias
            let old_state = state.search[api_state_key] || {}
            let old_medias = old_state.medias || []

            // If no reinitialize, append to previous data
            let new_medias = action.data.reinitialize || typeof old_medias === "undefined" ?  medias : [
                ...old_medias,
                ...medias
            ]

            // Compute new pagination parameters
            return {
                ...state,
                search: {
                    ...state.search,
                    // Update total length of elements already updated
                    [api_state_key]: {
                        ...state.search[api_state_key],
                        length: new_medias.length,
                        medias: new_medias,
                        is_loading: false
                    }
                },
            }

        default:
            return state
    }
}

export default libraryDynamicReducer