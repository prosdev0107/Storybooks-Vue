
import { connect } from 'react-redux'
import Properties from '../../components/Properties'
import {sendToReducersAction} from "../../actions"
import currentCsItemEdited from "../../utilities/csItemFromList"

const mapStateToProps = state => ({
    // Find the selected story sticker
    stickers_menu_tab: state.library_dynamic.stickers_menu_tab,
    story_sticker: currentCsItemEdited(state).template.story_stickers.find((obj) => {
        return typeof obj.edit_info !== "undefined" && obj.edit_info.selected === true
    })
})

const mapDispatchToProps = (dispatch) => ({
    propertiesButtonAction: (event) => dispatch(sendToReducersAction(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Properties)
