import React from 'react'

const InputNumber = ({
                         input, label, defaultValue, step, min, max, forceValue,
                         meta: { touched, error },
                     }) => (
    <div className="form-group form-material material-bordered">
        {(label || "").length > 0 ? <label htmlFor={input.name}>{label}</label> : "" }
        <input
            {...input}
            className="form-control"
            type="number"
            step={step || 1}
            min={min}
            max={max}
            defaultValue={defaultValue}
            value={forceValue || 0}
        />
        { touched && error && <span className="error">{error}</span>}
    </div>
)

export default InputNumber