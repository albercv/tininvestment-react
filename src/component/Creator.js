import React from 'react'

const Creator = () => {

    const title = "Add New Stamp"
    return (
        <div className="add">
            <h3 className="title">{title}</h3>
            <form>
                <input 
                type="text" 
                id="title" 
                placeholder="Titulo" />
                <textarea 
                id="description" 
                placeholder="Descripción"> </textarea>
                <input 
                type="submit" 
                id="save" 
                value="Guardar" />
            </form>
        </div>
    )
}

export default Creator
