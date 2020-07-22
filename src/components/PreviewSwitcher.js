import React from 'react'
import { FormattedMessage } from 'react-intl'

const PreviewSwitcher = ({is_preview_mode, switchPreviewMode}) => {

    const togglePreviewMode = () => switchPreviewMode(!is_preview_mode)

    let btnIcon = is_preview_mode ? "fa-paint-brush" : "fa-eye"
    let btnText = is_preview_mode ?
        <FormattedMessage id="panel.preview.mode_edition" /> :
        <FormattedMessage id="panel.preview.mode_preview" />

    return <div className="preview-switcher absolute-center-horizontal">

        <button
            className={"btn btn-info btn-lg"}
            onClick={() => togglePreviewMode()} >
            <i className={"margin-right-5 fa "+btnIcon}></i>
            { btnText }
        </button>

    </div>
}

export default PreviewSwitcher
