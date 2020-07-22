
import generalSubReducer from "./csItemTemplateReducers/generalSubReducer"
import storyStickersSubReducer from "./csItemTemplateReducers/storyStickersSubReducer"
import currentCsItemEdited from "../utilities/csItemFromList"
import isEqual from 'lodash/isEqual'

const csItemsReducer = (state = [], action) => {

    switch (action.type) {

        case 'API_UPDATE_CS_ITEMS':

            if (typeof action.data !== "undefined") {

                return action.data
            }
            return state

        case 'MEDIA_SWITCHER_DELETE_MEDIA':

            // Remove item from cs_items list
            // delete API is not called here, we will call it once user pressed "save" button
            let mediaIndexToDelete = action.data.index

            if (typeof mediaIndexToDelete !== "undefined") {

                // Remove from store
                return state.filter((elt,index) => index !== mediaIndexToDelete)
            }
            return state

        case 'ITEMS_UPDATE_FROM_HISTORY':

            return action.data

        default:
            break
    }

    // Also pass event to complementary "fake" reducers
    // To edit information about the current

    if (typeof action.cs_item_index_editing !== "undefined") {


        // Get current cs_item edited from current state
        let cs_item_index_editing = action.cs_item_index_editing
        let cs_item_selected = currentCsItemEdited({
            cs_items: state,
            cs_item_index_editing
        })

        // Check if data from current cs_item being edited has changed
        let old_story_stickers = cs_item_selected.template.story_stickers
        let new_story_stickers = storyStickersSubReducer(old_story_stickers,action)
        let old_general = cs_item_selected.template.general
        let new_general = generalSubReducer(old_general,action)

        if (
            (new_story_stickers !== false && !isEqual(old_story_stickers,new_story_stickers))
            || (new_general !== false && !isEqual(old_general,new_general))
        ) {
            // Data changed, record into state
            return state.map((cs_item, idx) =>
                idx === cs_item_index_editing
                    ? {
                        ...cs_item,
                        template: {
                            general: new_general !== false ? new_general : old_general,
                            story_stickers: new_story_stickers !== false ? new_story_stickers : old_story_stickers
                        }
                    } : cs_item
            )
        }

    }


    return state
}

export default csItemsReducer