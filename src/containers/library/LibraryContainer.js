
import { connect } from 'react-redux'
import Library from '../../components/Library'
import {selectFromLibraryAction,sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    stickers_menu_tab: state.library_dynamic.stickers_menu_tab,
    listen_drag_events: state.page_actions.listen_drag_events,
})

const mapDispatchToProps = (dispatch) => ({
    selectFromLibrary: (type, event) => dispatch(selectFromLibraryAction(type, event)),
    loadMoreStickers: (data) => dispatch(sendToReducersAction("LIBRARY_SCROLL_LOAD_MORE",data)),
})


export default connect(mapStateToProps,mapDispatchToProps)(Library)
