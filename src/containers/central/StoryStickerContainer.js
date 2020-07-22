

import { connect } from 'react-redux'
import StorySticker from '../../components/StorySticker'
import currentCsItemEdited from "../../utilities/csItemFromList"

const mapStateToProps = (state, ownProps) => (
    currentCsItemEdited(state).template.story_stickers.filter((e) => e.id === ownProps.id)[0]
)

export default connect(
    mapStateToProps
)(StorySticker)