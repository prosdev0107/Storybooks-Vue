import {CsItemDefaults} from "../components/propTypes/CsItemTypes"

// Simply returned the current edited cs item data from store
export default function currentCsItemEdited(state) {

    let cs_item = {}
    let defaultsDeepCopy = JSON.parse(JSON.stringify(CsItemDefaults))

    if (typeof state.cs_items !== "undefined") {

        let cs_items = state.cs_items, selected_index = state.cs_item_index_editing

        if (typeof cs_items !== "undefined" && selected_index >= 0 && cs_items.length > selected_index) {

            // Get selected cs item
            cs_item = cs_items[selected_index]

            // Add default values for missing fields, with a deep copy
            cs_item = Object.assign(defaultsDeepCopy, cs_item)

            // Repeat inside template field
            cs_item.template =  Object.assign(defaultsDeepCopy.template, cs_item.template)

            // Repeat inside template->general field
            cs_item.template.general = Object.assign(defaultsDeepCopy.template.general, cs_item.template.general)
        } else {

            // When no media, just default values
            return defaultsDeepCopy
        }
    }

    return cs_item
}


/*
Schema of ONE cs_item
(non exhaustive)
    id: "",
    // Constant (once media uploaded)
    media: {
        src: "",
        thumbnail: "",
        ext: "",
        isVideo: false
    },
    // Variables
    template: {
        story_stickers: [],
        general: {
            overlay: {},
            theme: {},
            img_filter_class: "",
            media: {}
        },
    }
 */

