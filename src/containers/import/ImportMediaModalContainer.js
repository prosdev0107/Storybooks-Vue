
import { connect } from 'react-redux'
import ImportMediaModal from '../../components/ImportMediaModal'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    modal_show: state.import_media.show_modal,
    preselected_media: state.import_media.media_picker.preselected,
    creating_final_item: state.import_media.creating_final_item,
    display_template_selector: state.import_media.template_selector.display,
    display_media_picker: state.import_media.media_picker.display,
    display_resizer: state.import_media.resizer.display,
    display_videocrop: state.import_media.videocrop.display
})

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(sendToReducersAction("IMPORT_MEDIA_MODAL_HIDE")),
    loadMoreMedias: (data) => dispatch(sendToReducersAction("LIBRARY_SCROLL_LOAD_MORE",data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ImportMediaModal)
