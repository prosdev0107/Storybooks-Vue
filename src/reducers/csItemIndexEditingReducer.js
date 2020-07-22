
const csItemIndexEditingReducer = (state = [], action) => {

    switch (action.type) {

        case 'MEDIA_SWITCHER_CHANGE_INDEX':

            if (typeof action.data !== "undefined") {

                let newSelectedIndex = action.data.new_index

                return newSelectedIndex
            }

            return state

        case 'MEDIA_SWITCHER_DELETE_MEDIA':

            if (typeof action.data !== "undefined" && typeof action.data.index !== "undefined") {

                // Index that will be removed
                let indexToRemove = action.data.index

                // current index
                let currentIndex = state

                // Whatever the media to remove is,
                // if its index is greater than or equal to current index being edited
                // We substract current index by one
                // So we ensure staying on current media being edited
                return Math.max(0, currentIndex >= indexToRemove ? currentIndex-1 : currentIndex);
            }

            return state

        default:
            return state
    }
}

export default csItemIndexEditingReducer