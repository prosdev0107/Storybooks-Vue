
import { connect } from 'react-redux'
import ImportMediaResizer from '../../components/ImportMediaResizer'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    url_only_native: state.clip.url_only_native,
    file: state.import_media.media_picker.preselected,
    zoom: state.import_media.resizer.zoom
})

const mapDispatchToProps = (dispatch) => ({
    updateCroppedZone: (data) => dispatch(sendToReducersAction("IMPORT_MEDIA_RESIZER_UPDATE_CROPPED_ZONE",data)),
    formChanged: (event) => dispatch(sendToReducersAction("IMPORT_MEDIA_RESIZER_CHANGE_PROPERTY",event))
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaResizer)
