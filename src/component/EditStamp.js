import React from 'react'


const EditStamp = ({stamp, getStampList, setEditState, setStampsState}) => {
    const editObject = (e, id) => {

        e.preventDefault();
        
        let target = e.target;

        console.log(target);

        const storagedStamps  = getStampList();
        const editIndex = storagedStamps.findIndex(stamp => stamp.id === id);
        
        let editStamp = {
            id,
            title : target.title.value,
            ref : target.ref.value,
            image : target.image.value,
            price : target.price.value,
            quantity : target.quantity.value,
            description : target.description.value
        }

        storagedStamps[editIndex] = editStamp;

        localStorage.setItem("stamps", JSON.stringify(storagedStamps));
        setStampsState(storagedStamps);
        setEditState(0);

    }

    return (
    <div className='edit_form'>
      <h3 className='title'>Edit form</h3>
      <form onSubmit={e => editObject(e, stamp.id)} >
      <input type="text"
      name="title"
      className="editedTitle"
      defaultValue={stamp.title}
      />
      <input type="text"
      name="ref"
      className="editedRef"
      defaultValue={stamp.ref}
      />
      <input type="text"
      name="image"
      className="editedImage"
      defaultValue={stamp.image}
      />
      <input type="number"
      name="price"
      className="editedPrice"
      defaultValue={stamp.price}
      />
      <input type="number"
      name="quantity"
      className="editedQuantity"
      defaultValue={stamp.quantity}
      />
      <textarea
      name="description"
      className='editedDescription'
      defaultValue={stamp.description} />
      <input type="submit" className="edit" value="Actualizar" />
      </form>
    </div>
  )
}

export default EditStamp
