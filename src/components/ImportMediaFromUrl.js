import React from 'react'
import {sendFileToLibrary} from '../utilities/API/CSItemMedia'
import {renderField} from "./form/renderField";
import { FormattedMessage } from 'react-intl'
import {reduxForm} from "redux-form";
import ImportMediaOverlay from "./ImportMediaOverlay";

const ImportMediaFromUrl = ({uploading_file}) => {

    const urlSubmit = (event) => {

        let form = event.target
        let url = form.url.value

        if (url.length > 0) {
            // Upload file to user personal library
            sendFileToLibrary(url)
        }

        event.preventDefault()
    }

    const renderOverlay = () => {

        return uploading_file ? <div
            className={"absolute width-full height-full"}
            style={overlayStyles}>
            <ImportMediaOverlay />
        </div> : <div />
    }

    const overlayStyles = {
        top: "-15px",
        left: "-15px"
    }

    return <div>

        { renderOverlay() }

        <div className="api-library padding-20">

            <form onSubmit={(event) => urlSubmit(event)}>

                { renderField({
                    nonMaterial: true,
                    placeholder: "import.media.url.input.placeholder",
                    value: "",
                    input: {
                        type: "text",
                        name: "url",
                        value: ""
                    }
                }) }

                <button
                    className={"btn btn-info btn-round width-full"}
                    type={"submit"}><FormattedMessage id="import.media.url.input.submit" /></button>

                <p className={"grey-600 margin-top-20"}><FormattedMessage id="import.media.url.instructions.line1" /> :
                    <br/>- <FormattedMessage id="import.media.url.instructions.line2" />
                    <br/>- <FormattedMessage id="import.media.url.instructions.line3" />
                </p>

            </form>
        </div>

    </div>
}

export default reduxForm({
    form: 'importFromUrlForm'
})(ImportMediaFromUrl)