
import { connect } from 'react-redux'
import ImportMediaDropZone from "../../components/ImportMediaDropZone"

const mapStateToProps = (state) => {

    // If there is no media in user personal library, make the dropzone bigger
    let mediasSearch = state.library_dynamic.search.clipr_all || {}
    let medias = mediasSearch.medias || []

    return {
        uploading_file: state.import_media.uploading_file,
        uploading_file_progress: state.import_media.uploading_file_progress,
        bigDropZone: medias.length === 0
    }
}


export default connect(mapStateToProps)(ImportMediaDropZone)
