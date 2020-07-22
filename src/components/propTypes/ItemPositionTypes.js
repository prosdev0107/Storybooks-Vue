
import PropTypes from 'prop-types'

export let ItemPositionTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number,
    ratio: PropTypes.number,            // height/width
    rotation: PropTypes.number,         // radian !!!
    maxWidth: PropTypes.string          // px
}

export let ItemPositionDefaults = {
    width: 0.2,
    ratio: 1,
    rotation: 0
}