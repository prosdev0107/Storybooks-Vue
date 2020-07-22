import React from 'react'
import { reduxForm } from 'redux-form'
import {renderField} from "./form/renderField"
import {ClipTypes} from "./propTypes/ClipTypes"
import PropTypes from "prop-types"
import { FormattedMessage } from 'react-intl'

const GeneralForm = ({cs_item_general,cs_item_index_editing,cs_items_length,clip,params,formChanged, preventEnterKeySubmit}) => {

    // Constants
    let img_animations = params.img_animations || []
    let themes = params.themes
    let theme_colors = themes.colors || {}, theme_fonts = themes.fonts || {}
    let theme_default_color = theme_colors.default_color || {}

    let select_fonts = theme_fonts.map( (font) => {
        return { value: font.name, label: font.name, fontFamily: "theme_"+font.name  }
    })

    let select_colors = theme_colors.map( (color) => {
        return { value: color.id, label:  <FormattedMessage id={"general.form.main_color."+color.id} /> }
    })

    let animations_label = {
        'zoom-in' : <FormattedMessage id="general.form.animation.zoom-in"/>,
        'zoom-out' :  <FormattedMessage id="general.form.animation.zoom-out"/>,
        'move-from-left':  <FormattedMessage id="general.form.animation.move-from-left"/>,
        'move-from-right':  <FormattedMessage id="general.form.animation.move-from-right"/>,
        'move-from-top':  <FormattedMessage id="general.form.animation.move-from-top"/>,
        'move-from-bottom':  <FormattedMessage id="general.form.animation.move-from-bottom"/>
    }
    let select_animations = img_animations.map( (anim) => {
        return { value: anim, label: animations_label[anim] }
    })

    // Media params
    let overlay = cs_item_general.overlay || {}
    let media_params = cs_item_general.media || {}
    let media_theme = clip.theme || {}

    // media_theme_color contains full information about the theme color, like static and gradient colors components
    let media_theme_color = media_theme.color || {}

    // Generate choices for display orders, knowing total number of available cs_items
    let display_order_choices = []
    for (let i=0; i < cs_items_length; i++) {
        display_order_choices.push({
            value: i,
            label: i+1
        })
    }

    // Let's build the row data to be displayed
    let rowInputInfo = [
        {
            'separator': 'general.form.separator.theme',
        },
        {
            id: "timer_mode_is_horizontal",
            value: clip.timerMode,
            type: "css",
            options: [
                {
                    value: "HORIZONTAL",
                    label: "general.form.timer_mode.hrz"
                },
                {
                    value: "CIRCULAR",
                    label: "general.form.timer_mode.crl"
                }
            ],
            input: {
                label: "general.form.timer_mode",
                type: "radio",
            }
        },
        /*{
            id: "is_sponsored",
            value: clip.sponsored || 0,
            type: "css",
            hidden: !clip.showSponsoredSwitch,
            input: {
                label: "general.form.is_sponsored",
                type: "checkbox",
            }
        },*/
        {
            id: "theme_font",
            value: media_theme.font || "",
            type: "css",
            options: select_fonts,
            input: {
                label: "general.form.main_font",
                type: "font",
            }
        },
        {
            id: "theme_color",
            value: media_theme_color.id || (theme_default_color.id || ""),
            type: "css",
            options: select_colors,
            input: {
                label: "general.form.main_color",
                type: "select",
            }
        },
        {
            id: "theme_color_is_gradient",
            // We are showing a checkbox as "enable full screen", the opposite of fit_screen value
            value: !(media_theme.use_static_color || 0),
            type: "css",
            input: {
                label: "general.form.gradient_color",
                type: "checkbox",
            }
        },
        {
        'separator': 'general.form.separator.overlay',
        },
        {
            id: "overlay_color",
            value: overlay.color || "#000000",
            type: "css",
            input: {
                label: "general.form.color",
                type: "color",
            }
        },
        {
            id: "overlay_opacity",
            value: Math.round(100*overlay.opacity) || 0,
            type: "css",
            input: {
                label: "general.form.opacity",
                type: "number_slider",
                step: 1,
                min: 0,
                max: 100
            }
        }
    ]

    if (!(media_params.isVideo || 0)) {

        // Duration selector
        let size = 12 // Max is 15s
        let startAt = 3 // Min is 3s
        let duration_options = [...Array(size).keys()].map(i => ({
            value: i + startAt,
            label: i + startAt
        }))

        rowInputInfo.push({
                id: "media_duration",
                value: (media_params.duration || 5),
                type: "css",
                options: duration_options,
                input: {
                    label: "general.form.media.duration",
                    type: "select",
                    selectUp: true
                }
            },{
            id: "media_animation",
            value: media_params.animation || "",
            type: "css",
            options: select_animations,
            input: {
                label: "general.form.animation.title",
                type: "select",
                selectUp: true
            }
        })
    }



    return (
        <form onChange={(event) => formChanged(event)}
            // Prevent submit on enter key
              onKeyPress={(event) => preventEnterKeySubmit(event)} >

            <table className="width-full">

                <tbody>

                {Object.entries(rowInputInfo).map(([key, properties]) => {

                    if (typeof properties.separator !== "undefined") {
                        return <tr key={key} className="table-separator text-primary">
                            <td><b><FormattedMessage id={properties.separator} /></b></td>
                            <td></td>
                        </tr>
                    }

                    return <tr key={key} className={(properties.hidden || 0) ? "hidden" : ""}>
                        <td><FormattedMessage id={properties.input.label} /></td>
                        <td>
                            {renderField(properties,formChanged)}
                        </td>
                    </tr>
                })}

                </tbody>

            </table>

        </form>
    )
}

GeneralForm.propTypes = {
    clip: PropTypes.shape(ClipTypes)
}

export default reduxForm({
    form: 'generalForm'
})(GeneralForm)
