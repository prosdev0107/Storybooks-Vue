import React from 'react'
import MediaTemplateContainer from "../containers/library/MediaTemplateContainer"
import {Row, Col} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import api_client from "../utilities/API/CliprRequest";
import data_providers from "../api_endpoints";

class MediaTemplateLibrary extends React.Component {

    state = {
        is_loading: false,
        selected_type: "article",
        templates: [],
        length: 0,
        no_more_data: false // If true, don't need to call API for new content unless user changes of category
    }

    // Load a slice of templates
    loadMoreTemplates = (selected_type, reload) => {

        // If true, reinit search content before querying for more content
        reload = reload || false

        if (!this.state.is_loading && (reload || !this.state.no_more_data)) {

            let offset = this.state.length

            // Show loader while loading more templates
            this.setState({
                is_loading: true,
                selected_type: selected_type
            })

            // Reset searched content
            if (reload) {
                this.setState({
                    templates: [],
                    length: 0,
                    no_more_data: false
                })
                offset = 0;
            }

            // Query templates
            let request = api_client()
            request
                .get(data_providers.template.list(selected_type, offset, 24))
                .then(response => {

                    var newTemplates = response.data || []

                    // Append to data already retrieved
                    this.setState({
                        templates: [
                            ...this.state.templates,
                            ...newTemplates
                        ],
                        length: offset + newTemplates.length,
                        no_more_data: newTemplates.length === 0,
                        is_loading: false
                    })
                })
                .catch(error => {
                    this.setState({
                        is_loading: false,
                        no_more_data: true
                    })
                })
        }

    }


    /**
     * TODO
     * Selecteur avec les valeurs prises sur this.props.template_types
     * Et quand on change, ca passe ca appelle loadMoreTemplates
     * AVEC RELOAD = TRUE
     */

    // Load more templates when scrolling down
    handleScroll = (event) => {

        let scrollTop = event.target.scrollTop
        let libraryHeight = event.target.offsetHeight
        let scrollHeight = event.target.scrollHeight

        let scrolledToBottom = Math.ceil(scrollTop + libraryHeight + 50) >= scrollHeight

        if (scrolledToBottom) {
            // User reached the bottom so try to get more content
            this.loadMoreTemplates(this.state.selected_type)
        }
    }

    componentDidMount() {
        // Init content
        if (this.state.templates.length === 0) {
            this.loadMoreTemplates(this.state.selected_type)
        }
    }

    render () {

        let currentSelectedTemplateId = (this.props.template_selected || {}).id || null

        return (
            <div
                className="media-template-library width-full height-full padding-20"
                onScroll={(event) => this.handleScroll(event)}
            >
                <Row>
                    {this.state.templates.map((template,index) =>
                        <Col
                            key={index}
                            lg={3}
                            sm={6}
                            className={"padding-5 col-xlg-2"}
                        >
                            <MediaTemplateContainer
                                template={template}
                                selected={(currentSelectedTemplateId && currentSelectedTemplateId === template.id)}/>

                        </Col>
                    )}
                </Row>

                <p className="text-center margin-30">
                    { this.state.is_loading ? <FormattedMessage id="common.loading" /> : "" }
                </p>

            </div>
        )
    }
}

export default MediaTemplateLibrary
