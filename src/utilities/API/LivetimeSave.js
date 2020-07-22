
import api_client from "./CliprRequest"
import store from '../../store'
import {sendToReducersAction} from "../../actions"
import isEqual from 'lodash/isEqual'
import data_providers from '../../api_endpoints.js'



// Timeout that avoid recording too much entries in history
// Example : when sliding opacity slider
var historySaveTimeout
var apiSaveTimeout

var clearMessageTimeout


// See if there is something to save
// If yes, save it to history
// Change to history will trigger TriggerSave and will send data to server
export const LivetimeSave = (new_state) => {

    // new changes
    let new_changes = {
        cs_items: new_state.cs_items,
        clip: new_state.clip
    }


    if (new_state.history.redoOrUndoAsked) {

        // A redo or undo action is in progress
        // New data is already sent to server so don't need to dispatch a HISTORY_ADD_NEW_CHANGE event

        // We only need to make redoOrUndoAsked passed to false once all data is up to date
        let newPresentState = new_state.history.present
        if (isEqual(new_changes, newPresentState)) {
            store.dispatch(sendToReducersAction("HISTORY_UPDATE_PRESENT_END"))
        }

    } else {

        // Should we save data into history ?
        let oldData = new_state.history.present
        let is_page_initializing = new_state.page_actions.page_is_loading
        let shouldAutoSaveData = hasDataChanged(oldData,new_changes,is_page_initializing)

        if (shouldAutoSaveData) {

            // Save change in history

            // Cancel previous history saving call if LivetimeSave is triggered within a specific timeout
            if (historySaveTimeout) {
                clearTimeout(historySaveTimeout)
            }

            historySaveTimeout = setTimeout(function() {

                store.dispatch(sendToReducersAction("HISTORY_ADD_NEW_CHANGE",new_changes))

            },250)

        }
    }



    return true
}

// Confirm new data sending to server for saving
export const TriggerSave = (state) => {

    let history = state.history
    let dataToSend = history.present

    if (!history.sendToServer || typeof dataToSend.cs_items === "undefined" || typeof dataToSend.clip === "undefined") {

        // Missing data or don't need to save
        return false
    }

    if (history.redoOrUndoAsked) {
        // Update cs_items and clip state data with data from history
        if (!isEqual(state.cs_items, dataToSend.cs_items)) {

            store.dispatch(sendToReducersAction("ITEMS_UPDATE_FROM_HISTORY",dataToSend.cs_items))

            // If current edited media will change from order after cs_items update,
            // We need cs_item_index_editing to follow this change
            if (state.cs_items.length > state.cs_item_index_editing) {
                let current_edited_item = state.cs_items[state.cs_item_index_editing]
                let current_edited_id = current_edited_item.id

                // Find index of this same item in the new cs_items
                for (var i=0; i < dataToSend.cs_items.length; i++) {
                    if (dataToSend.cs_items[i].id === current_edited_id) {
                        if (i !== state.cs_item_index_editing) {
                            store.dispatch(sendToReducersAction("MEDIA_SWITCHER_CHANGE_INDEX",{
                                new_index: i
                            }))
                        }
                        break;
                    }
                }
            }

        }
        if (!isEqual(state.clip, dataToSend.clip)) {
            store.dispatch(sendToReducersAction("CLIP_UPDATE_FROM_HISTORY",dataToSend.clip))
        }
    }

    // Cancel previous API call delay if any save already about to be triggered
    // Ex when user hits "previous" button very quickly
    if (apiSaveTimeout) {
        clearTimeout(apiSaveTimeout)
    }
    // Program a new API call
    apiSaveTimeout = setTimeout(function() {

        updateSaveStatus(1)

        // Post data to API, all items at a time
        let clip = dataToSend.clip

        if (typeof clip.cnv_short_code !== "undefined" && clip.cnv_short_code.length > 0) {

            let request = api_client()

            // Step 1 : update clip main info
            request
                .post(data_providers.clip.update(clip.cnv_short_code), {'clip': dataToSend.clip})
                .then(response => {

                    // Step 2 : update cs items data
                    request
                        .post(data_providers.cs_items.update(clip.cnv_short_code), {'items': dataToSend.cs_items})
                        // Step 3 : done ! Hide save button
                        .then(response => {

                            // Notify for success
                            updateSaveStatus(200,null,dataToSend)
                            // Reload clip preview in iframe if necessary

                            if (history.reloadClipPreviews) {
                                store.dispatch(sendToReducersAction("REFRESH_CLIP_PREVIEWS"))
                            }
                        })
                        .catch(error => updateSaveStatus(404,error.toString()))

                })
                .catch(error => updateSaveStatus(404,error.toString()))

        } else {
            updateSaveStatus(404,"wrong short code")
        }

    },400)



    return true
}

// Test if data to save is different from old one
// We can't do that directly in reducer, else this would be an infinite loop
const hasDataChanged = (oldData, dataToSave, is_page_initializing) => {

    // If no previous data, that's page initialization. We fill last_data_saved but we don't make save btn appear
    // Also don't auto-save data is currently initializing the editor
    if (typeof oldData === "undefined" || oldData === null
        || (is_page_initializing && !isEqual(oldData,dataToSave))) {

        // Just fill data
        if (dataToSave !== null) {
            // Just call reducer if data changed
            store.dispatch(sendToReducersAction("HISTORY_INIT_PRESENT",dataToSave))
        }

        return false
    }

    // Just compare previous data saved set and the new one
    let hasChanged = !isEqual(oldData,dataToSave)

    return hasChanged
}


// Update save status text
const updateSaveStatus = (status, text) => {

    clearTimeout(clearMessageTimeout)

    if (status === 1) {

        store.dispatch(sendToReducersAction("API_UPDATE_SAVING"))

    } else if (status === 200) {

        store.dispatch(sendToReducersAction("API_UPDATE_SAVED",text))

        // Hide message after 2 sec
        clearMessageTimeout = setTimeout(function() {
            store.dispatch(sendToReducersAction("API_UPDATE_CLEAR_MESSAGE"))
        },2000)

    } else {

        // Probably an error
        store.dispatch(sendToReducersAction("API_UPDATE_FAILED",text))
        clearMessageTimeout = setTimeout(function() {
            store.dispatch(sendToReducersAction("API_UPDATE_CLEAR_MESSAGE"))
        },2000)
    }
}
