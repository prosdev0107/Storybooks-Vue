
import { connect } from 'react-redux'
import StickersLayer from '../../components/StickersLayer'
import {sendToReducersAction, transformStoryStickerAction} from "../../actions"
import currentCsItemEdited from "../../utilities/csItemFromList"


const mapStateToProps = state => ({
    story_stickers: currentCsItemEdited(state).template.story_stickers,
    listen_drag_events: state.page_actions.listen_drag_events
})

const mapDispatchToProps = (dispatch) => ({
    transformStorySticker: (type, event) => dispatch(transformStoryStickerAction(type, event)),
    sendToReducers: (type, data) => dispatch(sendToReducersAction(type, data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(StickersLayer)