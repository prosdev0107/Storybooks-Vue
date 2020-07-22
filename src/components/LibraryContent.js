import React from 'react'
import SimpleStickerContainer from "../containers/SimpleStickerContainer"
import {Row, Col} from 'react-bootstrap'
import {TAB_TEXT} from "../constants/constants"
import { FormattedMessage } from 'react-intl'

const LibraryContent = ({tab,stickers, is_loading}) => {

    if (stickers.length === 0) {

        // Empty
        return <div>
            <p className="text-center margin-top-50">
                { is_loading ?
                    <FormattedMessage id="common.loading"/> :
                    <FormattedMessage id="common.no_content"/> }
                </p>
        </div>
    }

    return <div className="stickers-library-shelf height-full padding-20">
        <Row>
            {stickers.map((sticker,index) =>
                <Col
                    key={index}
                    lg={tab === TAB_TEXT ? 12 : 4}
                    sm={tab === TAB_TEXT ? 12 : 6}
                    className={"padding-5 "+(tab === TAB_TEXT ? "col-xlg-12" : "col-xlg-3")}
                >
                    <div className="library-sticker-container width-full relative">
                        <div className={"width-full relative"} style={ {paddingTop: (Math.min(100,Math.round(1000/sticker.ratio)/10))+"%" } }>
                            <SimpleStickerContainer sticker={sticker} />
                        </div>
                    </div>

                </Col>
            )}
        </Row>

        <p className="text-center margin-30">
            { is_loading ? <FormattedMessage id="common.loading" /> : "" }
        </p>

    </div>
}

export default LibraryContent
