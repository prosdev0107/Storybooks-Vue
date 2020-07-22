import { connect } from 'react-redux'
import { IntlProvider,addLocaleData } from 'react-intl'
import config from '../config'

import intlEN from 'react-intl/locale-data/en';
import intlFR from 'react-intl/locale-data/fr';

addLocaleData([...intlEN, ...intlFR]);

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
function mapStateToProps(state) {

    let locale = state.params.user_locale

    if (config.locale.supported.indexOf(locale) === -1) {
        // This language is not supported -> back to default language
        locale = config.locale.default
    }

    const messages = require('../translations/'+locale+'.json')

    return {
        locale: locale,
        key: locale,
        messages
    }
}

export default connect(mapStateToProps)(IntlProvider);