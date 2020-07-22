import React from 'react'
import {StickerDefaults,StickerTypes} from "./propTypes/StickerTypes"
import axios from "axios/index"
import PropTypes from 'prop-types'

const Sticker = ({sticker, RENDERING_BASE_WIDTH}) => {

    let {id, type, ratio, source, customize} = sticker


    // WARNING : The real clip uses exactly the same script in main.js. Be careful about any modification.
    // WARNING BIS : this one is no containing the CSS insertion script, they are already all included
    const customizeStickerOnPage = (svgId, svgPath, ratio, customize) => {

        function isSVGSecured (html) {

            var htmlLower = html.toLowerCase()
            var forbiddenTags = ['script', 'onload','onerror']
            for (var i=0; i<forbiddenTags.length; i++) {
                if (htmlLower.indexOf(forbiddenTags[i]) !== -1) {
                    console.log("Sticker is invalid", html)
                    return false
                }
            }

            return true
        }
        
        // Is file existing ?
        if (typeof svgPath !== "undefined" && svgPath !== null && svgPath.length > 5) {
            
            // Load document content
            axios.get(svgPath).then((response) => {

                let fileContent = response.data

                if (fileContent.length > 0 && isSVGSecured(fileContent)) {

                    if (type === "svg" || type === "text_svg") {

                        // Get sticker location
                        let sticker = document.getElementById(svgId)
                        let svgType = "sticker"; // gif, img...

                        if (typeof sticker !== "undefined" && sticker != null) {

                            // Add content
                            sticker.innerHTML = fileContent


                            if (typeof customize !== "undefined" && customize != null) {

                                // Some properties in this svg need to be updated
                                Object.keys(customize).forEach(function (key) {

                                    var customField = customize[key]

                                    // Find the elements concerned about this custom field
                                    let nodes = sticker.querySelectorAll(customField.selector)

                                    Array.prototype.forEach.call(nodes, (node) => {

                                        switch (customField.type) {

                                            case "css":

                                                if (customField.property !== "undefined") {
                                                    node.style[customField.property] = customField.value
                                                }
                                                break

                                            case "attribute":

                                                if (customField.property !== "undefined") {
                                                    node.setAttribute(customField.property, customField.value)
                                                }
                                                break

                                            case "text":

                                                // text svg have a viewbox always defined with 350w 175h
                                                svgType = "text";

                                                // Several properties to edit about text
                                                let attributes = customField.attributes
                                                if (typeof attributes !== "undefined" && attributes != null) {

                                                    node.innerHTML = attributes.content
                                                    if (typeof attributes.family !== "undefined" && attributes.family.length > 0) {
                                                        node.style.fontFamily = attributes.family
                                                    }
                                                    if (typeof attributes.color !== "undefined" && attributes.color.length > 0) {
                                                        node.style.color = attributes.color
                                                        node.style.fill = attributes.color
                                                        node.setAttribute("fill", attributes.color)
                                                    }
                                                    if (typeof attributes.size !== "undefined" && attributes.size.length > 0) {
                                                        node.style.fontSize = attributes.size + "px"
                                                        node.setAttribute("font-size", attributes.size)
                                                    }
                                                }

                                                break

                                            default:
                                                break
                                        }
                                    })

                                    return 0
                                })
                            }

                            // Set viewBox of svg node so that texts will scale depending on screen width
                            let svgElmt = sticker.querySelector("svg")

                            // The width reference for sizing is 350 (RENDERING_BASE_WIDTH)
                            // We ensure scale is rendering the same on every screen by setting view box width to 350
                            // Then adapt height
                            let viewBoxHeight = svgType === "text" ?
                                RENDERING_BASE_WIDTH / 2 :
                                RENDERING_BASE_WIDTH / ratio

                            svgElmt.setAttribute("viewBox","0 0 "+RENDERING_BASE_WIDTH+" "+viewBoxHeight)
                            svgElmt.setAttribute("preserveAspectRatio","xMidYMid slice")

                            // Also need to set full height and width in PX of foreign object tag if existing
                            // Else content will not be centered properly
                            var fObject = svgElmt.querySelector("foreignObject.table-container");
                            if (fObject) {
                                fObject.style.width = RENDERING_BASE_WIDTH+"px";
                                fObject.style.height = viewBoxHeight+"px";
                            }
                        }
                    }
                }
            })
        }
    }

    const renderSticker = (id, type, ratio, source, customize)  => {

        switch (type) {

            case 'img':

                return <img src={source.src} alt="sticker"/>

            case 'text_svg':
            case 'svg':

                /**
                 * The way we render and customize here is the same than for the real clip
                 * In the real clip, we want to use CDN lo load both css and
                 *
                 * @type {string}
                 */
                // Generate random id
                let randomNb = id + "-" + Math.floor(Math.random() * Math.floor(1000))

                return <div id={randomNb} onLoad={ customizeStickerOnPage(randomNb, source.svg, ratio, customize) }>
                    </div>

            default:
                return <div/>
        }
    }



    return (
        <div draggable={true}
             className="sticker"
             data-component="sticker"
             data-sticker-id={id}
        >

            {renderSticker(id, type, ratio, source, customize)}

        </div>
    )
}

Sticker.propTypes = {
    sticker: PropTypes.shape(StickerTypes)
}

Sticker.defaultProps = {
    sticker: StickerDefaults
}


export default Sticker
