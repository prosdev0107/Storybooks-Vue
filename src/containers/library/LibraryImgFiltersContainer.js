
import { connect } from 'react-redux'
import LibraryImgFilters from "../../components/LibraryImgFilters"
import {sendToReducersAction} from "../../actions"
import currentCsItemEdited from "../../utilities/csItemFromList"

const mapStateToProps = state => {

    let cs_item_edited = currentCsItemEdited(state)

    return {
        img_filters: state.params.img_filters,
        current_filter_class: cs_item_edited.template.general.img_filter_class,
        media_thumbnail: cs_item_edited.media.thumbnail
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeFilter: (filter_className) => dispatch(sendToReducersAction("LIBRARY_CHANGE_FILTER_CLASS",filter_className))
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryImgFilters)
