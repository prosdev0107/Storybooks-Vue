import React from 'react'
import { reduxForm } from 'redux-form'
import { STICKER_FONT_SIZE_MIN, STICKER_FONT_SIZE_MAX } from '../constants/constants'
import {renderField} from "./form/renderField"
import { FormattedMessage } from 'react-intl'

const PropertiesForm = ({story_sticker,fonts,formChanged, preventEnterKeySubmit}) => {

    let sticker = story_sticker.sticker

    let fontFamilies = fonts.map( (font) => {
        return { value: font.name, label: font.name, fontFamily: font.name }
    })


    // Transform radian to degree
    let rotationDeg = story_sticker.position.rotation*180/Math.PI

    // Get a positive value
    while (rotationDeg < 0) {
        rotationDeg += 360
    }

    // Finally we need to build the row data to be displayed
    let rowInputInfo = [{
            'separator': 'properties.form.separator.general'
        }]

    // Add the common field
    rowInputInfo.push({
        id: "ssbox_position_rotation",
        value: Math.round(rotationDeg) || 0,
        type: "attribute",
        input: {
            label: "properties.form.general.rotation",
            type: "number_slider",
            step: 1,
            min: 0,
            max: 360
        }
    })

    // Add the custom fields
    if (typeof sticker.customize  !== "undefined" && Object.keys(sticker.customize).length > 0) {

        for (let identifier in sticker.customize ) {

            let customField = sticker.customize[identifier]

            if (customField.type === "text") {

                // Need to render several input to customize text
                rowInputInfo.push({
                    separator: "properties.form.separator.text"
                }, {
                    id: "custom_text_content_" + customField.id,
                    value: customField.attributes.content || "",
                    type: "attribute",
                    input: {
                        label: "properties.form.text.content",
                        type: "text"
                    }
                })
                if (typeof customField.attributes.family !== "undefined" && customField.attributes.family.length > 0) {
                    rowInputInfo.push({
                        id: "custom_text_family_"+customField.id,
                        value: customField.attributes.family,
                        type: "css",
                        options: fontFamilies,
                        input: {
                            label: "properties.form.text.font",
                            type: "font"
                        }
                    })
                }
                if (typeof customField.attributes.size !== "undefined" && customField.attributes.size >= 0) {
                    rowInputInfo.push({
                        id: "custom_text_size_"+customField.id,
                        value: Math.max(STICKER_FONT_SIZE_MIN,customField.attributes.size || 0),
                        type: "css",
                        input: {
                            label: "properties.form.text.size",
                            type: "number_slider",
                            min: STICKER_FONT_SIZE_MIN,
                            max: STICKER_FONT_SIZE_MAX
                        }
                    })
                }
                if (typeof customField.attributes.color !== "undefined" && customField.attributes.color.length > 0) {
                    rowInputInfo.push({
                        id: "custom_text_color_"+customField.id,
                        value: customField.attributes.color,
                        type: "css",
                        input: {
                            label: "properties.form.text.color",
                            type: "color"
                        }
                    })
                }

            } else {

                // Render as is
                rowInputInfo.push(customField)
            }
        }
    }

    rowInputInfo.push({
        separator: "properties.form.separator.actions"
    })

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

                    return <tr key={key}>
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

export default reduxForm({
    form: 'propertiesForm'
})(PropertiesForm)
