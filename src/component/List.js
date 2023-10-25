import React, { useEffect, useState } from 'react'
import EditPicture from './EditPicture';
import Creator from './Creator';
import { fetchItems } from '../service/ApiConnection.js'
import { SaveInStorageArray, SaveTimeStampInStorage } from '../service/SaveInStorage';
import { connect } from 'react-redux';
import { setDraftPicture } from '../action/actions.js';


const List = ({ picturesState, setPicturesState, setDraftPicture }) => {

  const [editState, setEditState] = useState(0);

  useEffect(() => {
    getPictureList();
  }, []);


  const getPictureList = async () => {
    let storagedData = [{}];
    storagedData = dataStoredTime()
      ? JSON.parse(localStorage.getItem("pictures")) : await fetchFreshData();

    setPicturesState(storagedData?.data ?? storagedData);
  }

  const dataStoredTime = () => {
    const storedTimepicture = Number(localStorage.getItem("timeStamp")) || Date.now();
    const oneHourLaterTimepicture = Date.now();
    return (oneHourLaterTimepicture - storedTimepicture > 360)
  }

  const fetchFreshData = async () => {
    const freshData = await fetchItems();

    if (freshData && freshData.hasOwnProperty('Error')) {
      return JSON.parse(localStorage.getItem("pictures"))
    }
    SaveInStorageArray("pictures", freshData.data);
    SaveTimeStampInStorage("timeStamp", freshData.timeStamp);

    return freshData;
  }

  const deletePicture = (e, picture) => {
    console.log(picture.id)
    let localStoragedData = getPictureList();
    let filteredData = localStoragedData.filter(pictureItem => pictureItem.id !== parseInt(picture.id));

    setPicturesState(filteredData);

    localStorage.setItem("pictures", JSON.stringify(filteredData))

  }

  return (
    <>
      {picturesState?.length > 0 ?
        picturesState.map(picture => {
          return (<article key={picture.id} className="picture-item">
            <h3 className="title">{picture.title}</h3>
            <p className="description">evolve2digital.com</p>
            <div>
              <img alt={picture.title} src={picture.images[0].imageUrl} height="100" width="100" />
            </div>

            <button className="edit" onClick={() => { setDraftPicture(picture) }}>Editar</button>
            <button onClick={e => deletePicture(e, picture)} className="delete">Borrar</button>
          </article>)
        }) : "No hay sellos disponibles"}

    </>
  )
}

export default connect(null, { setDraftPicture })(List);
