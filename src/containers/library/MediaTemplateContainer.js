
import { connect } from 'react-redux'
import MediaTemplate from "../../components/MediaTemplate";
import {sendToReducersAction} from "../../actions";

const mapStateToProps = (state,ownProps) => {

    return {
        template: ownProps.template,
        selected: ownProps.selected
    }
}

const mapDispatchToProps = (dispatch) => ({
    sendToReducers: (type, data) => dispatch(sendToReducersAction(type, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaTemplate)
