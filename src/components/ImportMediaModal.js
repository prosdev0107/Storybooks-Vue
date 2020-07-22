import React from 'react'
//import {Modal, ProgressBar} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import ImportMediaValidateContainer from "../containers/import/ImportMediaValidateContainer"
import ImportMediaLibraryContainer from "../containers/import/ImportMediaLibraryContainer"
import ImportMediaResizerContainer from "../containers/import/ImportMediaResizerContainer"
import MediaTemplateLibraryContainer from "../containers/library/MediaTemplateLibraryContainer"
import ImportMediaVideoCropperContainer from "../containers/import/ImportMediaVideoCropperContainer"
import { FormattedMessage } from 'react-intl'
import ImportMediaOverlay from "./ImportMediaOverlay";

const ImportMediaModal = ({modal_show, preselected_media, creating_final_item, display_template_selector, display_media_picker, display_resizer, display_videocrop, closeModal, loadMoreMedias}) => {

    if (modal_show) {
        setTimeout(function() {

            // TODO We have some problems with react bootstrap modal
            // Or maybe conflict with css files ?
            // We need to fire show event by ourselves
            document.querySelectorAll(".modal-open div.fade.in").forEach((elmt) => {
                elmt.classList.add("show")
            })
        },50)
    }

    const renderOverlay = () => {

        return creating_final_item ? <ImportMediaOverlay /> : <div />
    }

    const handleScroll = (event) => {

        // Load more media if we reached the bottom of modal content

        let scrollTop = event.target.scrollTop
        let libraryHeight = event.target.offsetHeight
        let scrollHeight = event.target.scrollHeight

        let scrolledToBottom = Math.ceil(scrollTop + libraryHeight + 50) >= scrollHeight

        if (scrolledToBottom) {

            // What is the current tab ?
            let currentTab = document.querySelector('.import-media-modal .nav-tabs > li.active > a')

            if (currentTab != null) {

                if (currentTab.id.indexOf("-tab-2") !== -1) {

                    // Load more image
                    loadMoreMedias({
                        api_source: "clipr",
                        type: "all"
                    })

                } else if (currentTab.id.indexOf("-tab-3") !== -1) {

                    // Load more image
                    loadMoreMedias({
                        api_source: "pixabay",
                        type: "image"
                    })

                } else if (currentTab.id.indexOf("-tab-4") !== -1) {

                    // Load more videos
                    loadMoreMedias({
                        api_source: "pixabay",
                        type: "video"
                    })
                }
            }

        }
    }

    const renderModalContent = () => {

        if (display_template_selector) {

            return <div className="height-full">
                {/* Step 1 : Choose a template */}
                <MediaTemplateLibraryContainer />
            </div>

        } else if (display_media_picker) {

            return <div className="height-full">
                {/* Step 2 : Pick image from API or personal media */}
                <ImportMediaLibraryContainer />
            </div>

        } else if (display_videocrop) {

            return <div className={"crop-preview-container absolute absolute-center width-full padding-left-20 padding-right-20"}>
                {/* Step 3 : Crop selected video */}
                <ImportMediaVideoCropperContainer />
            </div>

        } else if (display_resizer) {

            return <div className={"crop-preview-container absolute absolute-center width-full padding-left-20 padding-right-20"}>
                {/* Step 4 : Crop/Move/Zoom on selected media */}
                <ImportMediaResizerContainer />
            </div>
        }
        return <div />
    }

    let modalTitle =
        display_template_selector ? "import.template.title" :
            (display_videocrop ? "import.videocrop.title" :
                (display_resizer ? "import.resizer.title" : "import.media.title" ))

   /* let progress = 33
    if (display_media_picker) {
        progress = 66
    } else if (display_videocrop) {
        progress = 85
    } else if (display_resizer) {
        progress = 100
    }*/


    return <div className={"import-media-modal"}>
        <Modal
            show={modal_show}
            onHide={(e) => { /* Do nothing, there is bug if click inside modal then release outside */}}
            bsSize={"lg"}
            className={"import-media-modal"}
            onScroll={(event) => handleScroll(event)}
        >
            <Modal.Header>

                {/* <ProgressBar active now={progress} /> */}

                <Modal.Title>
                    <FormattedMessage id={modalTitle} />
                </Modal.Title>

                <button type="button" className="close" onClick={() => closeModal()}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>

            </Modal.Header>

            <Modal.Body>

                {renderModalContent()}

            </Modal.Body>

            {/* Footer : confirm/cancel step */}
            <Modal.Footer>
                <ImportMediaValidateContainer />
            </Modal.Footer>

            { renderOverlay() }

        </Modal>
    </div>

}

export default ImportMediaModal
