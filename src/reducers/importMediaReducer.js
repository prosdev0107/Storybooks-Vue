

const importMediaReducer = (state = [], action) => {

    let isImage = typeof state.media_picker !== "undefined" ? state.media_picker.preselected.type === "img" : 1

    let displayTemplateSelector = false
    let displayMediaPicker = false
    let displayVideoCropper = false
    let displayMediaResizer = false

    const getModalInitialState = (initState) => {
        return {
            ...initState,
            show_modal: true,
            template_selector: {
                ...initState.template_selector,
                display: false,
                template: {}
            },
            media_picker: {
                ...initState.media_picker,
                display: true
            },
            videocrop:  {
                ...initState.videocrop,
                display: false
            },
            resizer:  {
                ...initState.resizer,
                display: false
            }
        }
    }

    switch (action.type) {

        // Show/hide the modal

        case 'SHOW_IMPORT_MEDIA_MODAL':

            // Display a large modal that let user import a media into story
            // Also initialize every steps
            return getModalInitialState(state)

        case 'IMPORT_MEDIA_MODAL_HIDE':

            return {
                ...state,
                show_modal: false
            }

        // What happened when user presses "Confirm" or "Cancel" on modal footer section

        case 'IMPORT_MEDIA_GO_NEXT_STEP':

            // Find out which step should be now display

            if (state.template_selector.display) {
                displayMediaPicker = true
            } else if (state.media_picker.display) {
                // If is video, go to video cropper
                displayVideoCropper = isImage ? false : true
                // Else skip this step and go directly to media resize
                displayMediaResizer = isImage ? true : false
            } else if (state.videocrop.display) {
                displayMediaResizer = true
            }

            // Do we need to reset cropper cursor positions and resizer zoom ?
            // Yes if we come from media picking step
            let resetMediaSettings = state.media_picker.display

            return {
                ...state,
                template_selector:  {
                    ...state.template_selector,
                    display: displayTemplateSelector
                },
                media_picker:  {
                    ...state.media_picker,
                    display: displayMediaPicker
                },
                videocrop:  {
                    ...state.videocrop,
                    display: displayVideoCropper,
                    start: resetMediaSettings ? 0 : state.videocrop.start,
                    end: resetMediaSettings ? 0 : state.videocrop.end
                },
                resizer:  {
                    ...state.resizer,
                    display: displayMediaResizer,
                    zoom: resetMediaSettings ? 1.2 : state.resizer.zoom
                }
            }

        case 'IMPORT_MEDIA_GO_PREVIOUS_STEP':

            // Find out which step should be now display

            if (state.media_picker.display) {
                displayTemplateSelector = true
            } else if (state.videocrop.display) {
                displayMediaPicker = true
            } else if (state.resizer.display) {
                // If is video, go to video cropper
                displayVideoCropper = isImage ? false : true
                // Else skip this step and go directly to media picker
                displayMediaPicker = isImage ? true : false
            }

            return {
                ...state,
                template_selector:  {
                    ...state.template_selector,
                    display: displayTemplateSelector
                },
                media_picker:  {
                    ...state.media_picker,
                    display: displayMediaPicker
                },
                videocrop:  {
                    ...state.videocrop,
                    display: displayVideoCropper
                },
                resizer:  {
                    ...state.resizer,
                    display: displayMediaResizer
                },
            }

        // Save modified data among each step of creation

        case 'IMPORT_MEDIA_SELECT_TEMPLATE':

            if (typeof action.data === "undefined" || action.data === null) {
                return state
            }

            // User has chosen his media to import, just show a thumbnail at modal footers
            // Also reinitialize video cropper and image resizer
            return {
                ...state,
                template_selector: {
                    ...state.template_selector,
                    template: {
                        ...state.template,
                        ...action.data
                    }
                }
            }

        case 'IMPORT_MEDIA_SELECT_MEDIA':

            if (typeof action.data === "undefined"
                || action.data === null
                || typeof action.data.source === "undefined" ) {
                return state
            }

            // User has chosen his media to import, just show a thumbnail at modal footer
            // Also reset  every
            return {
                ...state,
                media_picker: {
                    ...state.media_picker,
                    preselected: action.data
                }
            }

        case 'IMPORT_MEDIA_VIDEO_CROPPER_UPDATE_DURATION':

            // User has validated his media to import, let's suggest him to resize/crop it
            let new_time_limits = action.data
            return {
                ...state,
                videocrop:  {
                    ...state.videocrop,
                    start: new_time_limits.start,
                    end: new_time_limits.end
                }
            }

        case 'IMPORT_MEDIA_RESIZER_UPDATE_CROPPED_ZONE': {

            let new_cropped_zone = action.data
            return {
                ...state,
                resizer:  {
                    ...state.resizer,
                    crop_zone: new_cropped_zone
                }
            }
        }

        case 'IMPORT_MEDIA_RESIZER_CHANGE_PROPERTY':

            let event = action.data
            let target = event.target
            let fieldName = target.name
            let fieldValue = target.value

            if (typeof fieldName !== "undefined" && typeof fieldName !== "undefined") {

                if (fieldName === "resizer_input_zoom") {

                    return {
                        ...state,
                        resizer: {
                            ...state.resizer,
                            zoom: fieldValue
                        }
                    }
                } else if (fieldName === "resizer_input_cropping") {

                    return {
                        ...state,
                        resizer: {
                            ...state.resizer,
                            cropped_zone: fieldValue
                        }
                    }
                }

            }

            return state

        case 'IMPORT_MEDIA_UPDATE_VIDEO_THUMBNAIL':

            return {
                ...state,
                media_picker: {
                    ...state.media_picker,
                    preselected: {
                        ...state.media_picker.preselected,
                        source: {
                            ...state.media_picker.preselected.source,
                            thumbnail: action.data
                        }
                    }
                }
            }

        // End of media creation on boarding : create the new CSItem

        case 'API_CREATE_CS_MEDIA_BEGIN':

            return {
                ...state,
                uploading_file_progress: 0,
                uploading_file: true
            }

        case "IMPORT_MEDIA_PROGRESS_PERCENT":

            // Progress status (scale 0-100) of current uploading file
            return {
                ...state,
                uploading_file_progress: action.data
            }

        case 'API_CREATE_CS_MEDIA_END':

            if (typeof action.data === "undefined"
                || action.data === null
                || typeof action.data.source === "undefined" ) {
                return {
                    ...state,
                    uploading_file_progress: 0,
                    uploading_file: false,
                }
            }

            return {
                ...state,
                uploading_file_progress: 0,
                uploading_file: false,
                media_picker: {
                    ...state.media_picker,
                    preselected: action.data
                }
            }

        case 'API_CREATE_CS_ITEM_BEGIN':

            return {
                ...state,
                creating_final_item: true
            }

        case "API_CREATE_CS_ITEM_END":

            // Progress status (scale 0-100) of current uploading file
            return {
                ...state,
                creating_final_item: false,
                resizer: {
                    display: false,
                    crop_zone: {},
                    zoom: 1.2
                },
                media_picker: {
                    ...state.media_picker,
                    preselected: {
                        id: null,
                        type: null,
                        source: {}
                    }
                }
            }

        case 'MEDIA_SWITCHER_DELETE_MEDIA':

            // If there is no media left, display media import modal
            if (action.data.items_length <= 1) {
                return getModalInitialState(state)
            }
            return state

        default:
            return state
    }
}

export default importMediaReducer