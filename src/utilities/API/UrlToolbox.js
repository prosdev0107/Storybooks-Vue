
/**
 * Get the value of a specific GET parameter inside a URL
 *
 * @param name
 * @param url
 * @returns {*}
 */
export function getParameterByName(name, url) {

    // Reformat name
    name = name.replace(/[[\]]/g, "\\$&")

    // Find param name in query
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url)
    if (!results)
        return null
    if (!results[2])
        return ''

    // Extract value
    return decodeURIComponent(results[2].replace(/\+/g, " "))
}

