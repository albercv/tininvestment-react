import React, { useState, useEffect, useRef } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { connect } from 'react-redux';
import { apiCreateNewPicture, apiEditPicture } from '../service/ApiConnection.js'
import { setDraftPicture } from '../action/actions.js';

const Creator = ({ draftPictureState, setPicturesState, setDraftPicture }) => {

    const componentTitle = "Picture"
    const formRef = useRef(null);
    const [erroSaving, setErrorSaving] = useState({});

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            id: draftPictureState ? draftPictureState.id : "",
            title: draftPictureState ? draftPictureState.title : "",
            reference: draftPictureState ? draftPictureState.reference : "",
            price: draftPictureState ? draftPictureState.price : "",
            quantity: draftPictureState ? draftPictureState.quantity : "",
            description: draftPictureState ? draftPictureState.description : "",
            images: draftPictureState ? draftPictureState.images : [{ imageUrl: '' }]
        }
    });
    const { append } = useFieldArray({
        control,
        name: 'images',
    });

    useEffect(() => {
        formRef.current.reset();
        reset({
            id: draftPictureState ? draftPictureState.id : "",
            title: draftPictureState ? draftPictureState.title : "",
            reference: draftPictureState ? draftPictureState.reference : "",
            price: draftPictureState ? draftPictureState.price : "",
            description: draftPictureState ? draftPictureState.description : "",
            quantity: draftPictureState ? draftPictureState.quantity : "",
        })

    }, [draftPictureState, reset]);

    const processPicture = (values) => {

        const editPicture = {
            id: values.id,
            title: values.title,
            reference: values.reference,
            images: values.images
                .filter(imageField => imageField?.imageUrl)
                .map(imageField => imageField.imageUrl),
            price: values.price,
            quantity: values.quantity,
            description: values.description
        }

        if (editPicture.id === "") {
            createNewPicture(editPicture);
        } else {
            editOldPicture(editPicture);
        }
    }

    const createNewPicture = async (editPicture) => {
        const response = await apiCreateNewPicture(editPicture);
        if (response && response.hasOwnProperty('Error')) {
            console.table(`RESPONSE: ${JSON.stringify(response)}`);
            return setErrorSaving({"Title": "No se ha podido guardar en Base de datos"});
        }
        setDraftPicture({})
        setPicturesState(prevPicturesState => [...prevPicturesState, ...response.data.data]);
    }

    const editOldPicture = async (editPicture) => {
        const response = await apiEditPicture(editPicture);
        if (response && response.hasOwnProperty('Error')) {
            console.table(`RESPONSE: ${JSON.stringify(response)}`);
            return setErrorSaving({"Title": "No se ha podido guardar en Base de datos"});
        }
        setPicturesState(prevPicturesState => [...prevPicturesState, ...response.data.data]);
        setDraftPicture({})
    }

    const validateURL = (value) => {
        var urlPattern = /^(http|https):\/\//i;
        return urlPattern.test(value) || 'Please enter a valid URL';
    };

    return (
        <div className="add">
            <h3 className="title">{componentTitle}</h3>
            {erroSaving && erroSaving["Title"] && <p className="error">{erroSaving["Title"]}</p>}
            <form ref={formRef} onSubmit={handleSubmit(processPicture)}>
                <input
                    type="hidden"
                    id="id"
                    name="id"
                    defaultValue={draftPictureState ? draftPictureState.id : ""}
                    placeholder="ID" />
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={draftPictureState ? draftPictureState.title : ""}
                    {...register('title', {
                        required: true,
                        minLength: 3
                    })}
                    placeholder="Titulo" />
                <input
                    type="text"
                    id="reference"
                    name="reference"
                    defaultValue={draftPictureState ? draftPictureState.reference : ""}
                    {...register('reference', {
                        required: true
                    })}
                    placeholder="Referencia" />
                {
                    (draftPictureState && draftPictureState.images && draftPictureState.images.length > 0)
                        ? draftPictureState.images.map((image, index) => (
                            <input
                                key={index}
                                type="text"
                                id={`images[${index}]`}
                                name={`images[${index++}].imageUrl`}
                                defaultValue={image.imageUrl || ''}
                                {...register(`images[${index}].imageUrl`, {
                                    required: true,
                                    pattern: validateURL
                                })}
                                placeholder="Foto" />
                        ))
                        : (
                            <input
                                type="text"
                                id={`images[0]`}
                                name={`images[0].imageUrl`}
                                defaultValue={""}
                                {...register('images[0].imageUrl', {
                                    required: true,
                                    pattern: validateURL
                                })}
                                placeholder="Foto" />
                        )
                }
                <button type="button" onClick={() => append({ imageUrl: '' })}>Agregar</button>
                <input
                    type="number"
                    id="price"
                    name="price"
                    defaultValue={draftPictureState ? draftPictureState.price : ""}
                    {...register('price', {
                        required: true
                    })}
                    placeholder="Precio" />
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    defaultValue={draftPictureState ? draftPictureState.quantity : ""}
                    {...register('quantity', {
                        required: true
                    })}
                    placeholder="Cantidad" />
                <textarea
                    id="description"
                    name="description"
                    defaultValue={draftPictureState ? draftPictureState.description : ""}
                    {...register('description', {
                        required: true
                    })}
                    placeholder="Descripción"
                ></textarea>
                {errors && Object.keys(errors).map(key => (
                    <p key={key}>{
                        `Error en: ${key}. ${errors[key]?.type}`
                    }</p>
                ))}
                <input
                    className="edit"
                    type="submit"
                    id="save"
                    value="Guardar" />
                <button type="button" className='delete' onClick={() => { setDraftPicture({}); reset(); }}>Reset</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    draftPictureState: state.draftPictureState,
});

const mapDispatchToProps = {
    setDraftPicture,
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
