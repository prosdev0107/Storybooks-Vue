import React from 'react'
import { FormattedMessage } from 'react-intl'

const ImportMediaOverlay = () => {

    return <div className={"overlay"}>

        <div className={"loader-container absolute-center"}>

            <div className="page-loader absolute-center-horizontal">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <p>
                    <span className={"infoProgress"}>
                    <FormattedMessage id="import.media.creation" /></span>
            </p>

        </div>

    </div>
}

export default ImportMediaOverlay
