import React, { useState } from 'react'
import { SaveInStorage } from '../service/SaveInStorage'

const Creator = ({ setStampsState }) => {

    const componentTitle = "Add New Stamp"
    const [stampState, setStampState] = useState({})

    const getFormData = e => {
        e.preventDefault();
        console.log("Formulario enviado");
        let target = e.target;
        let title = target.title.value;
        let ref = target.ref.value;
        let image = target.image.value;
        let price = target.price.value;
        let quantity = target.quantity.value;
        let description = target.description.value;

        let stamp = {
            id: new Date().getTime(),
            title,
            ref,
            image,
            price,
            quantity,
            description
        };

        //Saving state
        setStampState(stamp);

        //Saving in shared state
        setStampsState(stampsState => {
            return [...stampsState, stamp];
        });

        //Saving in localstorage
        SaveInStorage("stamps", stamp);

    }

    return (
        <div className="add">
            <h3 className="title">{componentTitle}</h3>
            <h3>
                {stampState.title && stampState.ref && <strong> El sello {stampState.title} ha sido creado con el id {stampState.id} </strong>}
            </h3>
            <form onSubmit={getFormData}>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Titulo" />
                <input
                    type="text"
                    id="ref"
                    name="ref"
                    placeholder="Referencia" />
                <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Foto" />

                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Precio" />
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Cantidad" />
                <textarea
                    id="description"
                    name="description"
                    defaulValue="Text here..."
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
