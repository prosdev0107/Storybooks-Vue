import React from 'react'

const MediaTemplate = ({template, selected, sendToReducers}) => {


    const onTemplateClick = (template) => {
        sendToReducers('IMPORT_MEDIA_SELECT_TEMPLATE', template)
    }

    /**
     * TODO :
     * A la fast story, faut faire une preview avec fakes images (ex images d'actu si type article) et textes par dessus
     * Pas besoin de titre, l'image suffit si on voit les textes animés
     */
    return (
        <button
            className={"btn media-template "+(selected ? " btn-primary " : " btn-default ")}
            onClick={() => onTemplateClick(template)}
        >

            <p>Id : { template.id }</p>

        </button>
    )
}

export default MediaTemplate
