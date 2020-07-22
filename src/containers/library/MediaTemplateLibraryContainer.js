
import { connect } from 'react-redux'
import MediaTemplateLibrary from "../../components/MediaTemplateLibrary"

const mapStateToProps = state => ({
    template_types: state.params.templates.types || {},
    template_selected: state.import_media.template_selector.template
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaTemplateLibrary)
