

import { connect } from 'react-redux'
import Sticker from '../components/Sticker'

// A simple sticker container, the only goal here is to PREVENT RE-RENDERING when parent component state changed
const mapStateToProps = (state, ownProps) => ({
    sticker: ownProps.sticker,
    RENDERING_BASE_WIDTH: state.params.RENDERING_BASE_WIDTH
})

export default connect(
    mapStateToProps
)(Sticker)