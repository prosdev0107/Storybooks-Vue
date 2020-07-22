import React, { Component } from 'react'
import * as UrlTools from "./utilities/API/UrlToolbox"
import api_client from './utilities/API/CliprRequest'
import {sendToReducersAction} from "./actions"
import store from './store'
import data_providers from './api_endpoints'

// Theme css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import './styles/bootstrapXL.min.css'
import './styles/theme/bootstrap-extend.min.css'
import './styles/theme/site.min.css'
import './styles/theme/animate/animate.min.css'
import './styles/main.min.css'
import './styles/library.min.css'
import './styles/mediaPanel.min.css'
import './styles/mediasSwitcher.min.css'
import './styles/previewSwitcher.min.css'
import './styles/sticker.min.css'
import './styles/properties.min.css'
import './styles/clip.min.css'
import './styles/fake-interactions.css'
import './styles/mediaImportModal.css'
import './styles/simulator.css'
import './styles/templatesLibrary.min.css'

import ApplicationContainer from "./containers/ApplicationContainer"

class App extends Component {

    componentDidMount() {

        // Get Symfony access token from url
        const query = this.props.location.search
        const access_token = UrlTools.getParameterByName('access_token',query)
        if (access_token != null && access_token.length > 0) {

            // Initialize request instance with client information
            let request = api_client({
                access_token: access_token,
                client_secret: UrlTools.getParameterByName('secret',query),
                refresh_token: UrlTools.getParameterByName('refresh_token',query),
                client_id: UrlTools.getParameterByName('client_id',query)
            })

            // Host url if any ?
            let url_host = UrlTools.getParameterByName('url_host',query)
            if (url_host != null) {
                store.dispatch(sendToReducersAction("API_UPDATE_URL_HOST",url_host))
            }


            // Now let's get information about media panel
            let cnv_short_code = UrlTools.getParameterByName('cnv', query)
            if (cnv_short_code != null) {

                // Call media information
                // Get clip basic info
                request
                    .get(data_providers.clip.read(cnv_short_code))
                    // Get response data and save in store
                    .then(response => { store.dispatch(sendToReducersAction("API_UPDATE_CLIP",response.data)) })
                    .catch(error => console.log(error))
                // Get linked cs_items
                request
                    .get(data_providers.cs_item.list(cnv_short_code))
                    // Get response data and save in store
                    .then(response => {
                        store.dispatch(sendToReducersAction("API_UPDATE_CS_ITEMS",response.data))
                        if (response.data.length === 0) {
                            // There is no items to display -> show upload media modal
                            store.dispatch(sendToReducersAction("SHOW_IMPORT_MEDIA_MODAL",response.data))
                        }
                    })
                    .catch(error => console.log(error))
            }

            // And finally let's fill library with some content
            request
                .get(data_providers.sticker.list)
                // Get response data and save in store
                .then(response => {
                    // Data is also containing user locale
                    store.dispatch(sendToReducersAction("API_UPDATE_LIBRARY",response.data))
                    // Declare page has loaded after a few seconds, so save button won't appear immediately
                    setTimeout(() => {store.dispatch(sendToReducersAction("API_LOADING_ENDED",response.data))},4000);
                })
                .catch(error => console.log(error))
        }
    }

    render() {

        return (

            <div className="App">

                <ApplicationContainer />

            </div>
        )
    }
}

export default App
