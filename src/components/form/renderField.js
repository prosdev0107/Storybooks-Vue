import React from 'react'
import { Field } from 'redux-form'
import Input from "./Input"
import Select2 from "./Select2"
import InputNumber from "./InputNumber"
import InputRadio from "./InputRadio"
import InputCheckbox from "./InputCheckbox"
import InputColor from "./InputColor"
import InputNumberSlider from "./InputNumberSlider"


export const renderField = (properties, action) => {

    const optionFontFamilyRenderer = (option) => {
        if (typeof option === "undefined") {
            return null
        }
        let styles = {
            fontFamily: option.fontFamily
        }
        return <span style={styles}>{option.label}</span>
    }

    let common = {
        name: properties.input.name || properties.id,
        nonMaterial: properties.nonMaterial,
        placeholder: properties.placeholder,
        hideValue: properties.hideValue || false, // Ex : slider number : display slider but not the number
        type: properties.input.type,
    }
    switch (properties.input.type || "text") {

        case "font":

            // On change attribute needed on select tag !
            return <Field {...common}
                          selectedOption={properties.value}
                          component={Select2}
                          selectUp={properties.input.selectUp || false}
                          options={(properties.options || {})}
                          optionRenderer={optionFontFamilyRenderer}
                          onChange={(event) => typeof action === "function" ? action(event) : null} />

        case "select":

            // On change attribute needed on select tag !
            return <Field {...common}
                          selectedOption={properties.value}
                          component={Select2}
                          selectUp={properties.input.selectUp || false}
                          options={(properties.options || {})}
                          onChange={(event) => typeof action === "function" ? action(event) : null} />

        case "radio":

            // On change attribute needed on select tag !
            return <Field {...common}
                          selectedOption={properties.value}
                          component={InputRadio}
                          options={(properties.options || {})}
                          onChange={(event) => typeof action === "function" ? action(event) : null} />

        case "number":

            return <Field {...common}
                          component={InputNumber}
                          step={(properties.input.step || 1)}
                          min={properties.input.min}
                          max={properties.input.max}
                          forceValue={properties.value} />

        case "number_slider":

            return <Field {...common}
                          component={InputNumberSlider}
                          step={(properties.input.step || 1)}
                          min={properties.input.min}
                          max={properties.input.max}
                          forceValue={properties.value}
                          onChange={(event) => typeof action === "function" ? action(event) : null} />

        case "color":

            return <Field {...common}
                          component={InputColor}
                          forceValue={properties.value}
                          onChange={(event) => typeof action === "function" ? action(event) : null} />

        case "checkbox":

            return <Field {...common}
                          component={InputCheckbox}
                          is_checked={properties.value} />

        default:

            return <Field {...common}
                          component={Input}
                          forceValue={properties.value} />

    }
}