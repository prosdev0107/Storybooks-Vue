
import { connect } from 'react-redux'
import GeneralForm from '../../components/GeneralForm'
import {propertiesFormChangedAction, sendToReducersAction} from '../../actions'
import currentCsItemEdited from "../../utilities/csItemFromList"

const mapStateToProps = state => ({
    cs_item_general: currentCsItemEdited(state).template.general,
    cs_item_index_editing: state.cs_item_index_editing,
    cs_items_length: state.cs_items.length,
    clip: state.clip,
    params: state.params
})

const mapDispatchToProps = (dispatch) => ({
    formChanged: (event) => dispatch(propertiesFormChangedAction(event)),
    preventEnterKeySubmit: (event) => dispatch(sendToReducersAction("FORM_PREVENT_ENTER_KEY_SUBMIT", event))
})

export default connect(mapStateToProps,mapDispatchToProps)(GeneralForm)
