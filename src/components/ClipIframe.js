import React from 'react'
import {resizeIframe} from "../utilities/simulatorSize"

const CliprIframe = ({url_iFrame, is_preview, randomized}) => {

    // Transform iframe content to keep only the buttons
    const transformIframe = (event) => {

        let iframe = event.target

        // Scale iframe to keep iphone look alike ratio
        refreshIframe()

        // Show iframe (with short timeout to let new CSS added to be executed)
        setTimeout(function() {
            iframe.style.opacity=1.0
        },1000)
    }

    const refreshIframe = () => {

        var iframe = document.getElementById('Clip_Iframe') || null
        var container = document.querySelector(".media-panel-layer-buttons")
        if (iframe) {
            resizeIframe(iframe, container.offsetWidth, container.offsetHeight)
        }
    }

    // Resize iframe dynamically to keep same appearance
    window.addEventListener("resize", refreshIframe)

    // Force src reload
    let url_randomized = url_iFrame+"&rand="+randomized

    return is_preview ?

        <iframe
        id="Clip_Iframe_Preview"
        src={url_randomized}
        title="Simulator"
        />

        :

        <iframe
            id="Clip_Iframe"
            src={url_randomized}
            title="Clip buttons only preview"
            allowtransparency="true"
            onLoad={(event) => transformIframe(event)}/>
}

export default CliprIframe
