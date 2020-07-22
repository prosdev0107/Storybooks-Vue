import React from 'react'
import { injectIntl, intlShape } from 'react-intl';

const Input = ({
                   input, type, label, defaultValue, placeholder,       // common
                   meta: { touched, error },                            // status
                   forceValue, nonMaterial,                             // specific to some types
                   intl
               }) => {

    const renderPlaceholder = (placeholder) => {
        return placeholder ? intl.formatMessage({id: placeholder}): undefined
    }

    return <div className={"form-group "+(nonMaterial || false ? "" : "form-material material-bordered")}>
        {(label || "").length > 0 ? <label htmlFor={input.name}>{label}</label> : "" }
        <input
            {...input}
            type={type}
            defaultValue={defaultValue}
            value={forceValue || undefined}
            placeholder={renderPlaceholder(placeholder)}
            // { ( (forceValue || "").length > 0 ?  {value: forceValue} : {} ) }
            className="form-control"
        />
        { touched && error && <span className="error">{error}</span>}
    </div>


}

Input.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(Input)