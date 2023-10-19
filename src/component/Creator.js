import React, { useState } from 'react'
import { SaveInStorage } from '../service/SaveInStorage'
import { useForm } from 'react-hook-form';
import axios from 'axios'

const Creator = ({ setStampsState }) => {

    const componentTitle = "Picture"
    const [setStampState] = useState({})
    const [newPicture, setNewPicture] = useState({})
    const { register } = useForm();

    const username = 'Alber';
    const password = '1234';

    const token = btoa(`${username}:${password}`);
    console.log(token);

    const getPicture = () => {
        console.log("Get Pictures");
        axios.get("http://localhost:8080/api/picture/1", {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then(res => {
                succesfulResponse(res.data);
            })
            .catch(err => {
                errorResponse(err);
            })
            .finally(() => {
                console.log("Clean Up");
            })
    }

    const succesfulResponse = (response) => {
        setStampState(response)
        console.log(response);
    }

    const errorResponse = (error) => {
        console.log(error);
    }

    const createNewPicture = (e) => {
        e.preventDefault();
        
        let target = e.target;
        let editStamp = {
            id: target.id.value,
            title : target.title.value,
            reference : target.ref.value,
            images : [target.image.value, target.image2.value],
            price : target.price.value,
            quantity : target.quantity.value,
            description : target.description.value
        }

        axios.post("http://localhost:8080/api/picture/create", JSON.stringify(editStamp),{
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                succesfulResponse(res.data);
            })
            .catch(err => {
                errorResponse(err);
            })
            .finally(() => {
                console.log("Clean Up");
            })
    }

    return (
        <div className="add">
            <h3 className="title">{componentTitle}</h3>
            <h3>
                {/* {stampState.title && stampState.ref && <strong> El sello {stampState.title} ha sido creado con el id {stampState.id} </strong>} */}
            </h3>
            <form onSubmit={(e) => createNewPicture(e)}>
                <input
                    type="text"
                    id="id"
                    name="id"
                    {...register('id', {
                        required: true
                    })}
                    placeholder="ID" />
                <input
                    type="text"
                    id="title"
                    name="title"
                    {...register('title', {
                        required: true
                    })}
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
                    {...register('image', {
                        required: true
                    })}
                    placeholder="Foto" />
                <input
                    type="text"
                    id="image2"
                    name="image2"
                    {...register('image2', {
                        required: true
                    })}
                    placeholder="Foto2" />

                <input
                    type="number"
                    id="price"
                    name="price"
                    {...register('price', {
                        required: true
                    })}
                    placeholder="Precio" />
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    {...register('quantity', {
                        required: true
                    })}
                    placeholder="Cantidad" />
                <textarea
                    id="description"
                    name="description"
                    defaulValue="Text here..."
                    {...register('description', {
                        required: true
                    })}
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
