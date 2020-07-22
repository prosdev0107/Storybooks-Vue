import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

// Doc : https://github.com/JedWatson/react-select
// Examples : https://jedwatson.github.io/react-select/

const Select2 = ({
                   input, options, selectedOption, label, optionRenderer, selectUp,     // common
                   meta: { touched, error } ,                                           // status
               }) => {

    const onChange = (option, name) => {
        // Transform to event-like
        input.onChange({
            target: {
                name: name,
                value: option.value
            }
        })
    }

    // Customize option appearance
    optionRenderer = optionRenderer || function (option) {
        return option.label
    }

    return (
        <div className={ (selectUp ? "select-up" : "")}>
            {(label || "").length > 0 ? <label htmlFor={input.name}>{label}</label> : "" }
            <Select
                {...input}
                value={selectedOption}
                options={options}
                optionRenderer={(option) => optionRenderer(option)}
                clearable={false}
                onChange={(option) => onChange(option,input.name)}
                onBlur={() => input.onBlur(input.value)}
            />
            {touched && error && <span className="error">{error}</span>}
        </div>
    )
}

export default Select2
