
import PropTypes from 'prop-types'
import {StoryStickerTypes} from "./StoryStickerTypes"
import {OverlayTypes} from "./OverlayTypes"

export let CsItemTemplateTypes = {
    story_stickers: PropTypes.arrayOf(PropTypes.shape(StoryStickerTypes)),
    general: PropTypes.shape({
        overlay: PropTypes.shape(OverlayTypes),
        theme: PropTypes.object,
        img_filter_class: PropTypes.string,
        media: PropTypes.object
    })
}

export let CsItemTemplateDefaults = {
    story_stickers: [],
    general: {
        overlay: {},
        theme: {},
        img_filter_class: "",
        media: {}
    }
}