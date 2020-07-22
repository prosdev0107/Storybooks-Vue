import React from 'react'
import PropertiesFormContainer from "../containers/properties/PropertiesFormContainer"
import GeneralFormContainer from "../containers/properties/GeneralFormContainer"
import {Button,Row,Col} from 'react-bootstrap'
import {TAB_GENERAL} from "../constants/constants"

const Properties = ({story_sticker, stickers_menu_tab, propertiesButtonAction}) => {

    const renderPropertiesContent = () => {

        if (typeof story_sticker !== "undefined") {

            // Settings about a specific sticker
            let directions = ['SEND_FULL_BACK','SEND_BACK','SEND_FRONT','SEND_FULL_FRONT']
            let directions_translations = {
                'SEND_FULL_BACK' : "icon-custom icon-send-full-back",
                'SEND_BACK' : "icon-custom icon-send-back",
                'SEND_FRONT' : "icon-custom icon-send-front",
                'SEND_FULL_FRONT' : "icon-custom icon-send-full-front"
            }

            return <div>

                {/* Edit story stickers attributes */}
                <PropertiesFormContainer story_sticker={story_sticker}/>

                <div className="padding-left-15 padding-right-15 padding-bottom-30">

                    {/* Send at different position relative to other stickers */}
                    <p className="margin-0 margin-bottom-5 padding-top-15">Positionnement</p>
                    <Row>
                        { directions.map((direction, i) => {
                            return <Col key={i} className="text-center" sm={3}>
                                <Button
                                    bsStyle="default"
                                    data-story-sticker-id={story_sticker.id}
                                    className="inline-block padding-5"
                                    onClick={(event) => propertiesButtonAction('PROPERTIES_BUTTON_'+direction+'_SELECTED',event)}
                                >
                                    <i className={ directions_translations[direction] } />
                                </Button>
                            </Col>
                        }) }
                    </Row>

                    {/* Remove story sticker from stickers layer */}
                    <p className="margin-0 margin-bottom-5 padding-top-15">Autre</p>
                    <Row>

                        <Col sm={12} className="text-center">
                            <Button
                                bsStyle="danger"
                                className="btn-round center-block"
                                data-story-sticker-id={story_sticker.id}
                                onClick={(event) => propertiesButtonAction('PROPERTIES_BUTTON_REMOVE_SELECTED',event)}
                            >
                                Supprimer
                            </Button>
                        </Col>

                    </Row>

                </div>



            </div>
        } else if (stickers_menu_tab === TAB_GENERAL)  {

            // Settings for general tab
            return <GeneralFormContainer />
        }
         return <div/>
    }

    // Hide column if nothing to show
    let hide_column = stickers_menu_tab !== TAB_GENERAL && typeof story_sticker === "undefined" ? "animate-hide-right" : ""
    return <div className={"properties-sidebar-container"}>
        <div className={"properties-sidebar padding-top-20 padding-bottom-20 absolute-center-vertical animate-left "+hide_column} >
            {renderPropertiesContent()}
        </div>
    </div>
}

export default Properties
