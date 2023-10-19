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
      <input type="submit" onSubmit={e => editObject(e, stamp.id)} className="edit" value="Actualizar" />
    </div>
  )
}

export default EditStamp
