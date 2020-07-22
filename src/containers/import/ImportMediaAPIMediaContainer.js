
import { connect } from 'react-redux'
import ImportMediaAPIMedia from '../../components/ImportMediaAPIMedia'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = (state,ownProps) => {

    // Before defining state, let's determinate if this media is the one currently pre-selected by user
    let media = ownProps.media
    let mediaUrl = media.source.src
    let preselected_media = state.import_media.media_picker.preselected
    let isCurrentlyPreselected = typeof preselected_media.source !== "undefined" && mediaUrl === preselected_media.source.src

    return {
        media: ownProps.media,
        isCurrentlyPreselected: isCurrentlyPreselected
    }
}

const mapDispatchToProps = (dispatch) => ({
    preselectMedia: (file) => dispatch(sendToReducersAction("IMPORT_MEDIA_SELECT_MEDIA", file)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaAPIMedia)