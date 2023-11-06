import React, { useEffect, useState } from 'react'
import { useApi } from '../service/ApiConnection.js'
import { SaveInStorageArray, SaveTimeStampInStorage } from '../service/SaveInStorage';
import { connect } from 'react-redux';
import { setDraftPicture } from '../action/actions.js';
import { useCookies } from '../provider/CookieProvider.js';


const List = ({ picturesState, setPicturesState, setDraftPicture }) => {

  const [erroSaving, setErrorSaving] = useState({});
  const {fetchItems, apiDeletePicture} = useApi();
  const {isAuthenticated} = useCookies();


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

  const deletePicture = async (e, picture) => {
    console.log(picture.id)

    const response = await apiDeletePicture(picture.id);
    if (response && response.hasOwnProperty('Error')) {
      return setErrorSaving({[`${picture.id}`]: "No se ha podido borrar en Base de datos"});
    }
    let localStoragedData = JSON.parse(localStorage.getItem("pictures"));
    let filteredData = localStoragedData.filter(pictureItem => pictureItem.id !== parseInt(picture.id));    

    setPicturesState(filteredData);

    localStorage.setItem("pictures", JSON.stringify(filteredData));

  }

  return (
    <>
      {picturesState?.length > 0 ?
        picturesState.map(picture => {
          return (<article key={picture.id} className="picture-item">
            <h3 className="title">{picture.title}</h3>
            <p className="price">{picture.price}</p>
            <p className="description">{picture.description}</p>
            <div>
              <img alt={picture.title} src={picture.images[0].imageUrl} height="100" width="100" />
              {erroSaving && erroSaving[picture.id] && <p className="error">{erroSaving[picture.id]}</p>}
            </div>

            {isAuthenticated ? 
            <button className="edit" onClick={() => { setDraftPicture(picture) }}>Editar</button> : 
            <button className="buy" >Comprar</button>
            }
            <button onClick={e => deletePicture(e, picture)} className="delete">Borrar</button>
          </article>)
        }) : "No hay sellos disponibles"}

    </>
  )
}

export default connect(null, { setDraftPicture })(List);
