
import { connect } from 'react-redux'
import ImportMediaFromUrl from '../../components/ImportMediaFromUrl'

const mapStateToProps = state => ({
    uploading_file: state.import_media.uploading_file,
})
export default connect(mapStateToProps)(ImportMediaFromUrl)
