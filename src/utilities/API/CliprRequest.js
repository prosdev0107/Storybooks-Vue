
import axios from 'axios'
import config from '../../config'


const setCliprClient = (clientInfo) => {

    let oldClient = JSON.parse(localStorage.getItem('client'))

    localStorage.setItem('client',JSON.stringify({
        access_token: clientInfo.access_token || oldClient.access_token || "",
        client_id: clientInfo.client_id || oldClient.client_id || "",
        client_secret: clientInfo.client_secret || oldClient.client_secret || "",
        refresh_token: clientInfo.refresh_token || oldClient.refresh_token || ""
    }))
}

const cliprClient = () => {
    let client = JSON.parse(localStorage.getItem('client'))
    return client
}

/**
 *  Pre-build request to Clipr API  by adding an Authorization header
 *
 * @param token
 * @returns {defaultOptions}
 * @constructor
 */
const CliprRequest = (clientInfo) => {

    // Save client information if provided
    if (typeof clientInfo !== "undefined" && clientInfo != null) {
        setCliprClient(clientInfo)
    }

    const defaultOptions = {
        baseURL: config.api_clipr.API_BASE_URL,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // Create instance
    let instance = axios.create(defaultOptions)

    // Get token from session
    const access_token = cliprClient().access_token

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        config.headers.Authorization =  access_token ? `Bearer ${access_token}` : ''
        return config
    })

    // Last step : handle request error general case
    instance.interceptors.response.use(response => {
        // Success, everything goes well, just transfer response data
        return response
    }, error => {
        // Error
        const { config, response: { status } } = error
        if (status === 401) {
            // Unauthorized request : maybe access token has expired !
            return refreshAccessToken(config)
        } else {
            return Promise.reject(error)
        }
    })

    return instance
}


// Manage token refreshment

// Global variables so we can avoid conflicts between several instances
var isRefreshing = false
var refreshSubscribers = []

// On 401 error, try to refresh access token
const refreshAccessToken = (originalConfig) => {

    let new_request = originalConfig

    if (!isRefreshing) {
        isRefreshing = true

        // Call API to refresh token
        let clientInfo = cliprClient()
        clientInfo.grant_type = "refresh_token"
        axios.post(config.api_clipr.TOKEN_ENDPOINT, clientInfo)
            .then(response => {

                isRefreshing = false

                // Save new access and refresh tokens
                setCliprClient({
                    'access_token' : response.data.access_token,
                    'refresh_token' : response.data.refresh_token
                })

                // Try requests put in waiting mode
                onAccessTokenRefreshed(response.data.access_token)
            })
            .catch(function (error) {
            })
    }

    const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh(access_token => {
            // replace the expired token and retry
            new_request.headers['Authorization'] = `Bearer ${access_token}`
            resolve(axios(new_request))
        })
    })
    return retryOrigReq
}

// Put request in waiting mode
const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb)
}

// Execute all requests in waiting mode after access token is refreshed
const onAccessTokenRefreshed = (token) => {
    refreshSubscribers.map(cb => cb(token))
}

export default CliprRequest
