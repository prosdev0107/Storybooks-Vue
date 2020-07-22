
import api_client from "./CliprRequest"
import store from '../../store'
import {sendToReducersAction} from "../../actions"
import data_providers from '../../api_endpoints.js'

// Send user imported file to its personal library
export const sendFileToLibrary = (file) => {

    let postData

    if (typeof file === "string" && file.length < 500) {
        postData = {'file':file}
    } else {
        postData = new FormData()
        postData.append('file', file)
    }


    // Initialize state
    store.dispatch(sendToReducersAction("API_CREATE_CS_MEDIA_BEGIN"))

    // Get and store progress status of upload
    let config = {
        onUploadProgress: progressEvent => {
            // Store progress status in global state
            let percentCompleted = Math.min(100,Math.max(0,Math.floor((progressEvent.loaded * 100) / progressEvent.total)))
            store.dispatch(sendToReducersAction("IMPORT_MEDIA_PROGRESS_PERCENT",percentCompleted))
        }
    }

    // Call create API asynchronously
    let request = api_client()
    request
        .post(data_providers.cs_media.create(), postData, config)
        .then(response => {

            // Server returns the new cs_media, can stop showing uploading progress
            store.dispatch(sendToReducersAction("API_CREATE_CS_MEDIA_END",response.data))

            // Also, we need to reload user personal library
            store.dispatch(sendToReducersAction("LIBRARY_SCROLL_LOAD_MORE", {
                api_source: "clipr",
                type: "all",
                reload: true
            }))

        })
        .catch(error => console.log(error.toString()))
}

// Create a CS Item from uploaded file
export const createCSItemFromFile = (fileParams, cropped_zone, cropped_time) => {

    let cnvShortCode = store.getState().clip.cnv_short_code
    let postData

    // Initialize state
    store.dispatch(sendToReducersAction("API_CREATE_CS_ITEM_BEGIN"))

    // That's a URL string. Server will download it by itself
    // In case
    postData = {
        idMedia: fileParams.id || null,
        fileUrl: fileParams.url || null,
        cropped_zone: cropped_zone,
        cropped_time: cropped_time
    }

    // Call create API asynchronously
    let request = api_client()
    request
        .post(data_providers.cs_item.create(cnvShortCode), postData)
        .then(response => {

            let all_items = response.data || []

            // Update all stories items
            store.dispatch(sendToReducersAction("API_UPDATE_CS_ITEMS",all_items))
            store.dispatch(sendToReducersAction("API_CREATE_CS_ITEM_END"))

            // Select last item of story
            store.dispatch(sendToReducersAction("MEDIA_SWITCHER_CHANGE_INDEX",{
                new_index: all_items.length - 1
            }))

            // Reload user personal library (fileUrl is from external API, it will be added to personal library)
            store.dispatch(sendToReducersAction("LIBRARY_SCROLL_LOAD_MORE", {
                api_source: "clipr",
                type: "all",
                reload: true
            }))

            // Also close media import modal
            store.dispatch(sendToReducersAction("IMPORT_MEDIA_MODAL_HIDE"))

        })
        .catch(error => console.log(error.toString()))
}