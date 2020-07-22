
import { connect } from 'react-redux'
import MediaSwitchBox from "../../components/MediaSwitchBox"
import {sendToReducersAction} from "../../actions"

const mapStateToProps = (state, ownProps) => ({
    index: ownProps.index,
    selected: ownProps.selected,
    type: ownProps.type,
    cs_item: ownProps.cs_item,
    cs_items_length: state.cs_items.length
})

const mapDispatchToProps = (dispatch) => ({
    mediasSwitchBoxAction: (type, cs_item) => dispatch(sendToReducersAction(type, cs_item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MediaSwitchBox)
