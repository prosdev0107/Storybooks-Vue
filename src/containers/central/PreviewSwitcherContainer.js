
import { connect } from 'react-redux'
import PreviewSwitcher from "../../components/PreviewSwitcher"
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    is_preview_mode: state.page_actions.is_preview_mode
})

const mapDispatchToProps = (dispatch) => ({
    switchPreviewMode: (data) => dispatch(sendToReducersAction("PREVIEW_SWITCHER_CHANGE_PREVIEW_MODE", data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PreviewSwitcher)
