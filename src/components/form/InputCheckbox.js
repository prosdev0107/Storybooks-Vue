import React from 'react'

const InputCheckbox = ({
                         input, label, is_checked,
                         meta: { touched, error },
                     }) => (
    <div className="checkbox checkbox-custom checkbox-primary">
        <input
            {...input}
            id={input.name}
            className="height-20"
            type="checkbox"
            value={input.name}
            checked={is_checked ? "checked" : 0}
        />
        {/* Need to display label even if empty to make the box appear */}
        <label htmlFor={input.name}>{label}</label>
        { touched && error && <span className="error">{error}</span>}
    </div>
)

export default InputCheckbox