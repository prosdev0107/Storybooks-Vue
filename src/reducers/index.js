
import { combineReducers } from 'redux'
import csItemIndexEditingReducer from './csItemIndexEditingReducer'
import clipReducer from './clipReducer'
import csItemsReducer from './csItemsReducer'
import pageActionsReducer from './pageActionsReducer'
import paramsReducer from './paramsReducer'
import libraryDynamicReducer from './libraryDynamicReducer'
import importMediaReducer from './importMediaReducer'
import historyReducer from './historyReducer'

export default combineReducers({
    cs_item_index_editing: csItemIndexEditingReducer,
    cs_items: csItemsReducer,
    clip: clipReducer,
    params: paramsReducer,
    import_media: importMediaReducer,
    page_actions: pageActionsReducer,
    library_dynamic: libraryDynamicReducer,
    history: historyReducer
})
