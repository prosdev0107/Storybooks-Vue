
## Table of Contents

- [Best Practises](#best-practises)
  - [DOM](#dom)
  - [Components](#components)
  - [Reducers](#reducers)
  - [CSS](#css)
- [Wording](#wording)


## Best Practises


### DOM 

- Events : Avoid useless events listening by creating/removing them right in time. 
Ex : "start listening "dragover" when "dragstart" fired on elmt"

### Components

- Form : Make various type like NumberType, SingleSelectType... to make code easiest to understand
- Use PropTypes & PropDefaults for everyclass
- Centralize recurrent PropTypes into components/propTypes

### Reducers

- Action type name: Should look like : {action_origin}_{action_name}. Ex : STICKER_LIST_MOUSE-DOWN // SIMULATOR_DRAG-END
With action_origin as the element where the event has been fired

### CSS 

- NEVER use CSS classes for retrieving elements inside actions and reducers logic
- Use "data-xxxx" instead
- If need to use element with specific ID, define this ID inside constants params

## Wording

- GeneralForm : Render form to custom general aspect of current media
- Library : Left sidebar where items can enrich the story
- LibraryContent : items to display on left sidebar depending of chosen tab
- MediaPanel : The central window where clip medias can be designed by adding and styling stickers. Contains 4 layers : media layer, overlay layer, story stickers layer and finally buttons layer
- PropertiesForm : Render form to custom aspect of selected story sticker
- Sticker : A component (text, svg, image...) that can be used in Library or MediaPanel
- StickersLayer : Layer from MediaPanel containing all story stickers added by the user to the media
- StorySticker : A sticker container inside the story stickers layer of MediaPanel


