
import PropTypes from 'prop-types'
import {CsItemTemplateDefaults, CsItemTemplateTypes} from "./CsItemTemplateTypes"

export let CsItemTypes = {
    id: PropTypes.isRequired,
    media: PropTypes.shape({
        src: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        ext: PropTypes.string.isRequired,
        isVideo: PropTypes.bool
    }),
    template: PropTypes.shape(CsItemTemplateTypes)
}

export let CsItemDefaults = {
    media: {
        isVideo: 0
    },
    template: CsItemTemplateDefaults
}