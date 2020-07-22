
import { connect } from 'react-redux'
import PropertiesForm from '../../components/PropertiesForm'
import {propertiesFormChangedAction, sendToReducersAction} from '../../actions'

const mapStateToProps = (state,ownProps) => ({
    ...ownProps,
    fonts: state.params.sticker_fonts
})

const mapDispatchToProps = (dispatch) => ({
    formChanged: (event) => dispatch(propertiesFormChangedAction(event)),
    preventEnterKeySubmit: (event) => dispatch(sendToReducersAction("FORM_PREVENT_ENTER_KEY_SUBMIT", event))
})

export default connect(mapStateToProps,mapDispatchToProps)(PropertiesForm)
