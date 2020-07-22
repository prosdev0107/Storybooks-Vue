
import { connect } from 'react-redux'
import ImportMediaContent from '../../components/ImportMediaContent'

const mapStateToProps = (state,ownProps) => {

    let mediasStateKey = ownProps.source+"_"+ownProps.type
    let mediasSearch = state.library_dynamic.search[mediasStateKey] || {}

    // If not defined in state, it means we never tried to load content from API
    // So default value shoud be true
    let is_loading = typeof mediasSearch.is_loading === "undefined" ? true : mediasSearch.is_loading

    return {
        medias: mediasSearch.medias || [],
        is_loading: is_loading,
        source: ownProps.source
    }
}
export default connect(mapStateToProps)(ImportMediaContent)
