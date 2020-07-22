import React from 'react'
import ImportMediaAPIMediaContainer from "../containers/import/ImportMediaAPIMediaContainer"
import {Row} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const ImportMediaContent = ({medias, is_loading, source}) => {

    if (medias.length === 0) {

        // Empty
        // If source is Clipr, display nothing, dropzone is already taken all the place
        if (source === "clipr") {
            return <div />
        }
        return <div>
            <p className="text-center margin-top-50">
                { is_loading ?
                <FormattedMessage id="common.loading"/> :
                <FormattedMessage id="common.no_content"/> }
            </p>
        </div>
    }

    return <div className="api-library padding-20">
        <Row>
            {medias.map((media,index) =>
                typeof media === "undefined" || typeof media.source === "undefined" ? null :
                <div
                    key={index}
                    className={"api-library-media-container"}
                >
                    <ImportMediaAPIMediaContainer media={media}/>

                </div>
            )}
        </Row>

        <p className="text-center margin-30">
            { is_loading ? <FormattedMessage id="common.loading"/> : "" }
        </p>

    </div>
}

export default ImportMediaContent
