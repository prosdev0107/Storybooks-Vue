
import { connect } from 'react-redux'
import SearchAPIBar from '../../components/SearchAPIBar'
import {sendToReducersAction} from "../../actions"

const mapStateToProps = (state, ownProps) => {

    // Retrieve state fi-ir this specific search bar
    let searchInfo = state.library_dynamic.search[ownProps.source+"_"+ownProps.type] || {}

    return {
        api_source: ownProps.source,                    // API Provider : Giphy, Pixabay
        type: ownProps.type,                            // Media type : sticker, image, video
        searchText: searchInfo.text || "",              // Search text that filters API result
        searchResultsLength: searchInfo.length || 0,    // Offset needed when querying next pages
        is_loading: searchInfo.is_loading || false
    }
}

const mapDispatchToProps = (dispatch) => ({
    formChanged: (data) => dispatch(sendToReducersAction("LIBRARY_API_SEARCH_BAR_CHANGED", data)),
    stickersLoaded: (medias,api_source,type,pagination, reinitialize) => dispatch(sendToReducersAction("LIBRARY_EXTERNAL_CONTENT_LOADED", {
        medias,
        api_source,
        type,
        pagination,
        reinitialize
    })),
    preventEnterKeySubmit: (event) => dispatch(sendToReducersAction("FORM_PREVENT_ENTER_KEY_SUBMIT", event))
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchAPIBar)
