
import PropTypes from 'prop-types'

export let StickerTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['svg','img','text_svg']).isRequired,
    ratio: PropTypes.number,
    keepRatio: PropTypes.number,        // Force to preserve aspect ratio when editing
    source: PropTypes.shape({
        src: PropTypes.string,          // Case image : link to image
        svg: PropTypes.string,          // Case svg : link to svg content
        css: PropTypes.string,          // Case svg : link to CSS classes if html stylized
    }).isRequired,                      // Case image : link to image
    customize: PropTypes.objectOf(PropTypes.shape({      // Case svg : customizable content
        id: PropTypes.string,
        selector: PropTypes.string,                     // How to reach the element inside the svg
        property: PropTypes.string,                     // The property we want to make customizable
        value: PropTypes.string,                        // Default value of this property
        input: PropTypes.shape({                                        // Configuration of the editable input
            type: PropTypes.string,
            label: PropTypes.string
        })
    }))
}

export let StickerDefaults = {
    ratio: 1,
    keepRatio: 1
}