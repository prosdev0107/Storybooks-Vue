
import { connect } from 'react-redux'
import LeftMenu from '../../components/LeftMenu'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = state => ({
    stickers_menu_tab: state.library_dynamic.stickers_menu_tab,
})

const mapDispatchToProps = (dispatch) => ({
    changeTab: (tab) => dispatch(sendToReducersAction("LIBRARY_TAB_SELECTED",tab)),
})

export default connect(mapStateToProps,mapDispatchToProps)(LeftMenu)
