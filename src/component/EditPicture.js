import React from 'react'


const EditPicture = ({picture, getpictureList, setEditState, setpicturesState}) => {
    const editObject = (e, id) => {

        e.preventDefault();
        
        let target = e.target;

        console.log(target);

        const storagedpictures  = getpictureList();
        const editIndex = storagedpictures.findIndex(picture => picture.id === id);
        
        let editpicture = {
            id,
            title : target.title.value,
            ref : target.ref.value,
            image : target.image.value,
            price : target.price.value,
            quantity : target.quantity.value,
            description : target.description.value
        }

        storagedpictures[editIndex] = editpicture;

        localStorage.setItem("pictures", JSON.stringify(storagedpictures));
        setpicturesState(storagedpictures);
        setEditState(0);

    }

    return (
    <div className='edit_form'>
      <h3 className='title'>Edit form</h3>
      <input type="submit" onSubmit={e => editObject(e, picture.id)} className="edit" value="Actualizar" />
    </div>
  )
}

export default EditPicture
