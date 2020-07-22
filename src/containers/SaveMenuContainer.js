
import { connect } from 'react-redux'
import SaveMenu from "../components/SaveMenu"
import {sendToReducersAction} from "../actions"

const mapStateToProps = state => ({
    data_saving_status: state.page_actions.data_saving_status,
    canUndo: (state.history.past || []).length > 0,
    canRedo: (state.history.future || []).length > 0
})

const mapDispatchToProps = (dispatch) => ({
    sendToReducers: (type, data) => dispatch(sendToReducersAction(type, data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SaveMenu)
