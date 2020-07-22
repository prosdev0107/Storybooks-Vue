
import { connect } from 'react-redux'
import ImportMediaValidate from '../../components/ImportMediaValidate'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    preselected_media: state.import_media.media_picker.preselected,
    cropped_zone: state.import_media.resizer.crop_zone,
    cropped_time: {
        start: state.import_media.videocrop.start,
        end: state.import_media.videocrop.end,
    },
    is_first_step: state.import_media.media_picker.display,
    is_last_step: state.import_media.resizer.display,
    allow_submit: (
        (state.import_media.template_selector.display && (state.import_media.template_selector.template.id || "").length > 0)
        || (state.import_media.media_picker.display && (state.import_media.media_picker.preselected.id || "").length > 0)
        || state.import_media.videocrop.display
        || state.import_media.resizer.display
    )
})

const mapDispatchToProps = (dispatch) => ({
    sendToReducers: (type,event) => dispatch(sendToReducersAction(type,event))
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaValidate)
