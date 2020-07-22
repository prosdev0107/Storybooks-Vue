
import {MEDIA_PANEL_ID} from "../constants/constants"
import store from '../store'

const getMediaPanelSize = () => {
    var mediaPanel = document.getElementById(MEDIA_PANEL_ID)
    var panelRect = mediaPanel.getBoundingClientRect()
    return {
        width: panelRect.width,
        height: panelRect.height,
        left: panelRect.left,
        top: panelRect.top
    }
}

const findStickerWithId = (stickerId) => {

    let stickers = store.getState().params.stickers

    for (let stickerType in stickers) {

        if (typeof stickers[stickerType] !== "undefined" && stickers[stickerType]  !== null) {

            let sticker = stickers[stickerType].find((obj) => { return obj.id === stickerId })
            if (typeof sticker !== "undefined" && sticker !== null) {

                return sticker
            }
        }
    }

    // If not found, search in stickers loaded from API (pixabay, giphy)
    stickers = store.getState().library_dynamic.search

    for (let mediaKey in stickers) {

        if (mediaKey.indexOf('sticker') !== -1 && typeof stickers[mediaKey] !== "undefined" && stickers[mediaKey]  !== null) {

            let sticker = stickers[mediaKey].medias.find((obj) => { return obj.id === stickerId })
            if (typeof sticker !== "undefined" && sticker !== null) {
                return sticker
            }
        }
    }

    return null
}

// A simple action to transfer data to reducer without any edit
export const sendToReducersAction = (type, data) => {

    // Format and return
    return {
        cs_item_index_editing: store.getState().cs_item_index_editing,
        type: type,
        data: data || {}
    }
}

// Select some sticker from library
export const selectFromLibraryAction = (type, event) => {

    var target = event.target || event.srcElement


    // Event can be triggered on content inside the sticker
    // But we need to select the sticker container
    if (target.getAttribute("data-component") !== 'sticker') {
        target = target.closest("*[data-component='sticker']")
    }

    if (target !== null && target.getAttribute("data-component") === 'sticker') {

        // Get media panel dimensions
        let mediaPanelSize = getMediaPanelSize()

        // Get selected sticker info
        let sticker = findStickerWithId(target.getAttribute('data-sticker-id'))

        // Original width of sticker compared to medial panel width
        let init_width = Math.round(100*target.offsetWidth / mediaPanelSize.width)/100

        return {
            cs_item_index_editing: store.getState().cs_item_index_editing,
            type: type,
            event: event,
            target: target,
            sticker: sticker,
            init_width: init_width
        }
    }
    return {
        cs_item_index_editing: store.getState().cs_item_index_editing,
        type: "DO_NOTHING",
        target: null
    }
}

// Manipulate story stickers on
export const transformStoryStickerAction = (type, event) => {

    // Get media panel dimensions
    let mediaPanelSize = getMediaPanelSize()

    // Get CURSOR position data from event in px, relative to top left corner of simulator
    var target  = event.target || event.srcElement,
        x_px = event.clientX - mediaPanelSize.left,
        y_px  = event.clientY - mediaPanelSize.top,
        region = null           // Case resize : the id of the selected handler

    // Target should be the SSBox itself
    // if current target is one of its 8 resize handler, need to redefine target
    if (target.getAttribute('data-resize-handler')) {
        region = target.getAttribute('data-region')
        target = target.closest("*[data-component='story-sticker']")
    }
    // Same if target is rotable handle
    if (target.getAttribute('data-rotate-handler')) {
        region = "rotation"
        target = target.closest("*[data-component='story-sticker']")
    }

    if (target !== null) {
        // Format and return
        return {
            cs_item_index_editing: store.getState().cs_item_index_editing,
            type: type,
            event: event,
            target: target,
            region: region,
            moveType: region == null ? "translate" : (region === "rotation" ? "rotate" : "resize"),
            media_panel_ratio: mediaPanelSize.height/mediaPanelSize.width,
            cursor_position: {
                x: Math.round(1000*x_px / mediaPanelSize.width)/1000,
                y: Math.round(1000*y_px / mediaPanelSize.height)/1000,
            }
        }
    }
}

// Change selected object attributes from properties column
export const propertiesFormChangedAction = (event) => {

    var target  = event.target || event.srcElement
    /*if (target.tagName !== "form") {
        target = target.closest('form')
    }
    const data = new FormData(target)*/

    let inputName = target.name, inputValue = target.value

    return {
        cs_item_index_editing: store.getState().cs_item_index_editing,
        event: event,
        // formData: data,
        name: inputName,
        value: inputValue,
        target: target,
        params: store.getState().params,
        type: "PROPERTIES_FORM_CHANGED"
    }
}