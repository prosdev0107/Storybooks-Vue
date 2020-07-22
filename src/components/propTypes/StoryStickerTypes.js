
import PropTypes from 'prop-types'
import {StickerTypes,StickerDefaults} from './StickerTypes'
import {ItemPositionTypes,ItemPositionDefaults} from './ItemPositionTypes'

export let StoryStickerTypes = {
    id: PropTypes.string.isRequired,
    sticker: PropTypes.shape(StickerTypes).isRequired,
    position: PropTypes.shape(ItemPositionTypes).isRequired,
    edit_info: PropTypes.shape({
        selected: PropTypes.bool,
        translated: PropTypes.bool,
        rotated: PropTypes.bool,
        resized: PropTypes.bool
    })
}

export let StoryStickerDefaults = {
    sticker: StickerDefaults,
    position: ItemPositionDefaults,
    edit_info: {
        selected: false,
        translated: false,
        rotated: false,
        resized: false
    }
}