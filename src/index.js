import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import CliprRouter from './CliprRouter'
import { Provider } from 'react-redux'
import store from './store'
import { unregister } from './registerServiceWorker'

import ConnectedIntlProvider from './containers/ConnectedIntlProvider';

// Disable index.html cache
unregister()

/**
 * Example of use :
 * <FormattedMessage
    id="app.greeting_message"
    values={{ name: <b>kunnix</b> }} />
    (supposing {name} in the json value for this key
 */
ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <CliprRouter />
        </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
