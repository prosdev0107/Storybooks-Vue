
import { connect } from 'react-redux'
import ApplicationWrapper from '../components/ApplicationWrapper'
import {sendToReducersAction} from "../actions"

const mapStateToProps = state => ({
    page_is_loading: state.page_actions.page_is_loading,
    data_saving_status: state.page_actions.data_saving_status,
    stickers_fonts: state.params.sticker_fonts,
    theme_fonts: state.params.themes.fonts,
    is_preview_mode: state.page_actions.is_preview_mode,
    has_items: state.cs_items.length > 0
})

const mapDispatchToProps = (dispatch) => ({
    clickAppContainer: (event) => dispatch(sendToReducersAction("APP_CONTAINER_CLICK",event)),
})

export default connect(mapStateToProps,mapDispatchToProps)(ApplicationWrapper)
