
// !!!! WARNING !!!!
// That's not a real reducer. It's used by csItemsReducer.
// If returns false, no event was activated.

const generalSubReducer = (state = [], action) => {

    switch (action.type) {

        case "LIBRARY_CHANGE_FILTER_CLASS":

            // Change css filter class to be apply on media
            return {
                ...state,
                img_filter_class: action.data
            }


        case "FORM_PREVENT_ENTER_KEY_SUBMIT":

            // Disable form submit when enter key is pressed
            let event = action.data
            let keyCode = event.which || event.keyCode || event.code || 0
            if (keyCode === 13) {
                // That's enter key !
                event.preventDefault()
                event.stopPropagation()
            }
            return state

        case 'PROPERTIES_FORM_CHANGED':

            const editOverlayFromForm = (initialState, inputName, inputValue, target) => {

                // First need to deep copy the original object
                // Else we would modify directly the state itself
                // Which is an anti-pattern, React would consider state hasn't changed so no re-rendering

                if (inputName.indexOf('overlay_') === 0) {

                    let overlay = JSON.parse(JSON.stringify(initialState.overlay || {}))

                    switch (inputName) {

                        case "overlay_color":
                            overlay.color = inputValue
                            break
                        case "overlay_opacity":
                            overlay.opacity = Math.round(parseFloat(inputValue))/100
                            break
                        default:
                            break
                    }

                    return {
                        ...initialState,
                        overlay: overlay
                    }

                } else if (inputName.indexOf('media_') === 0) {

                    let media = JSON.parse(JSON.stringify(initialState.media || {}))

                    switch (inputName) {

                        case "media_duration":
                            media.duration = inputValue
                            break
                        case "media_animation":
                            media.animation = inputValue
                            break
                        default:
                            break
                    }

                    return {
                        ...initialState,
                        media: media
                    }
                }
                return initialState
            }

            return editOverlayFromForm(state, action.name, action.value, action.target)

        default:
            return false
    }
}

export default generalSubReducer