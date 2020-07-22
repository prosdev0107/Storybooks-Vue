
const clipReducer = (state = [], action) => {

    switch (action.type) {

        case 'API_UPDATE_CLIP':

            let data = action.data

            if (typeof data.id !== "undefined") {

                return {
                    ...state,
                    id: data.id,
                    cnv_short_code: data.cnv_short_code,
                    cnv_type: data.cnv_type,
                    url_preview: data.url_preview,
                    url_only_native: data.url_only_native,
                    theme: data.theme,
                    timerMode: data.timerMode,
                    sponsored: data.sponsored,
                    showSponsoredSwitch: data.showSponsoredSwitch,
                }
            }
            return state

        case 'PROPERTIES_FORM_CHANGED':

            const editThemeFromForm = (initialState, inputName, inputValue, target) => {

                // First need to deep copy the original object
                // Else we would modify directly the state itself
                // Which is an anti-pattern, React would consider state hasn't changed so no re-rendering

                if (inputName === "timer_mode_is_horizontal") {
                    return {
                        ...initialState,
                        timerMode: target.checked ? "HORIZONTAL" : "CIRCULAR"
                    }

                } else if (inputName === "is_sponsored") {
                    return {
                        ...initialState,
                        sponsored: target.checked ? 1 : 0
                    }

                } else if (inputName.indexOf('theme_') === 0) {

                    let theme = JSON.parse(JSON.stringify(initialState.theme || {}))

                    switch (inputName) {

                        case "theme_color":

                            // Need to find the full info about the color (inputValue is the color id)
                            let params_colors = action.params.themes.colors
                            let full_color_info = params_colors.find((obj) => { return obj.id === inputValue })

                            theme.color = full_color_info
                            break

                        case "theme_color_is_gradient":

                            // Should we now use static or gradient color for backgrounds ?
                            theme.use_static_color = !target.checked

                            break

                        case "theme_font":
                            theme.font = inputValue
                            break

                        default:
                            break
                    }

                    return {
                        ...initialState,
                        theme: theme
                    }

                }
                return initialState
            }

            return editThemeFromForm(state, action.name, action.value, action.target)

        case 'CLIP_UPDATE_FROM_HISTORY':

            return action.data

        default:
            return state
    }
}

export default clipReducer