import React from 'react'
import MediaSwitchBoxContainer from '../containers/central/MediaSwitchBoxContainer'
import DragSortableList from 'react-drag-sortable'

class MediasSwitcher extends React.Component {

    // We cannot use local state here to manage delete button state
    // As changing state will break the drag movement at rendering
    // TODO : utiliser un container pour les bouton add/delete

    state = {
        // Force sortable zone to re-render when dragging element outside window
        render: 0
    }

    // Is element 1 dragged over element 2 ?
    // Yes if middle of box 1 is inside box 2
    areBoxesOverlapped(elmt1, elmt2) {

        let box1 = elmt1.getBoundingClientRect()
        let box2 = elmt2.getBoundingClientRect()

        let box1MiddleX = box1.left + box1.width/2
        let box1MiddleY = box1.top + box1.height/2

        return box1MiddleX > box2.left && box1MiddleX < ( box2.left + box2.width )
        && box1MiddleY > box2.top && box1MiddleY < ( box2.top + box2.height )
    }

    onMediaDragStarts() {

        // Allow trash button to appear if media dragged
        let mediaSwitcher =  document.querySelector(".medias-switcher")
        mediaSwitcher.classList.add('media-dragstart')
    }

    onMediaDragged(event) {

        // Get element dragged
        let mediaDragged = event.target

        let mediaSwitcher =  document.querySelector(".medias-switcher")

        if (!mediaSwitcher.classList.contains('media-dragged') && mediaSwitcher.classList.contains('media-dragstart')) {
            mediaSwitcher.classList.add('media-dragged')
        }

        // Is user dragging media above hidden trash button ?
        let trashButton =  document.getElementById("DELETE_MEDIA_BUTTON")
        if (this.areBoxesOverlapped(mediaDragged,trashButton)) {
            // We don't use locale state here, as rendering breaks drag movement
            mediaSwitcher.classList.add('media-hovers-button')
            mediaSwitcher.classList.add('btn-active')
        } else {
            mediaSwitcher.classList.remove('media-hovers-button')
            mediaSwitcher.classList.remove('btn-active')
        }
    }

    onMediaDragEnds() {

        // Make trash button disappeared
        let mediaSwitcher =  document.querySelector(".medias-switcher")
        mediaSwitcher.classList.remove('media-dragstart')
        mediaSwitcher.classList.remove('media-dragged')
        mediaSwitcher.classList.remove('media-hovers-button')

    }

    // When user drops media
    onSort(sortedList, dropEvent) {

        let mediaSwitcher =  document.querySelector(".medias-switcher")

        let mediaDragged = dropEvent.target

        // Is user dragging media above hidden trash button ?
        // We use classList instead of using again areBoxesOverlapped function,
        // Because dropEvent target may DIFFER from the real dragged element
        if (mediaSwitcher.classList.contains('media-hovers-button')) {

            // Yes, means user asks to remove media

            // Index of media to removed ?
            let indexToRemove = parseInt(mediaDragged.querySelector('.media-switchbox-container').getAttribute("data-index"),0)

            // Remove media
            this.props.sendToReducers("MEDIA_SWITCHER_DELETE_MEDIA",{
                index: indexToRemove,
                items_length: sortedList.length
            })

        } else {

            // No, simply change media order

            // Get new ordered cs items data
            let new_cs_items = []
            let new_cs_item_index_editing = this.props.cs_item_index_editing;
            sortedList.forEach((elmt,index) => {
                new_cs_items.push(elmt.data)
                if (elmt.currently_selected) {
                    // If the media currently edited seen its position changed in the sortable list,
                    // We must update cs_item_index_editing state so user will still see the same edited media
                    new_cs_item_index_editing = index
                }
            })

            // Send to reducers
            this.props.sendToReducers("API_UPDATE_CS_ITEMS",new_cs_items)
            if (this.props.cs_item_index_editing !== new_cs_item_index_editing) {
                this.props.sendToReducers("MEDIA_SWITCHER_CHANGE_INDEX",{
                    new_index: new_cs_item_index_editing
                })
            }
        }

        this.onMediaDragEnds() // Not fired automatically if element was dragged

    }

    render() {

        let placeholder = <div
            className={"media-switchbox-container"}
        >
            <MediaSwitchBoxContainer
                cs_item={null}
                selected={-1}
            />
        </div>

        // Cancel dragging when leaving the screen
        /*
        Pb ca bloque le sort quand on re-render -> changer plugin ?
        document.addEventListener("mouseout", (event) => {
            if (event.target.tagName === "HTML") {
                this.setState({
                    render: this.state.render + 1
                })
            }
        })*/

        let medias_sortable_list = this.props.cs_items.map((cs_item,index) => {

            return {
                content: <div
                    key={index} className={"media-switchbox-container"}
                    onMouseDown={(event) => this.onMediaDragStarts(event)}
                    onMouseMove={(event) => this.onMediaDragged(event)}
                    onMouseUp={(event) => this.onMediaDragEnds(event)}
                    data-index={index}
                >
                    <MediaSwitchBoxContainer
                        index={index}
                        type={"item"}
                        cs_item={cs_item}
                        selected={index === this.props.cs_item_index_editing}
                    />
                </div>,
                position: index,
                data: cs_item,
                currently_selected: index === this.props.cs_item_index_editing
            }
        })

        // First render as many buttons as number of medias
        // Then add "add new media" button
        return <div
            className="medias-switcher absolute-center-horizontal"
        >

            {/* The sortable list of media buttons */}
            <DragSortableList
                items={medias_sortable_list}
                placeholder={placeholder}
                onSort={(sortedList, dropEvent) => this.onSort(sortedList, dropEvent)}
                dropBackTransitionDuration={0.3}
                type="horizontal"/>

            {/* Add media button */}
            <div id="ADD_MEDIA_BUTTON" className={"media-switchbox-container media-switchbox-add"}>

                <MediaSwitchBoxContainer
                    type={"add"}
                    cs_item={null}
                    selected={0}
                />

            </div>

            {/* Remove media button */}
            <div id="DELETE_MEDIA_BUTTON" className={"media-switchbox-container media-switchbox-delete"}>

                <MediaSwitchBoxContainer
                    type={"delete"}
                    cs_item={null}
                    selected={0}
                />

            </div>


        </div>
    }


}

export default MediasSwitcher
