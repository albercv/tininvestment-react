import React, { useEffect, useState } from 'react'
import EditStamp from './EditStamp';


const List = ({stampsState, setStampsState}) => {

  const [editState, setEditState] = useState(0);

  useEffect(() => {
    getStampList();
  }, []);


  const getStampList = () => {
    let localStoragedData = JSON.parse(localStorage.getItem("stamps"))

    localStoragedData === null ? setStampsState([]) : setStampsState(localStoragedData)
    console.log(localStoragedData);

    return localStoragedData;
  }

  const deleteStamp = (e, stamp) => {
    console.log(stamp.id)
    let localStoragedData = getStampList();
    let filteredData = localStoragedData.filter(stampItem => stampItem.id !== parseInt(stamp.id));

    setStampsState(filteredData);

    localStorage.setItem("stamps", JSON.stringify(filteredData))
    
  }

  return (
    <>
    {stampsState.length !== 0 ?
      stampsState.map(stamp => {
        return (<article key={stamp.id} className="peli-item">
          <h3 className="title">{stamp.title}</h3>
          <p className="description">evolve2digital.com</p>

          <button className="edit" onClick={() => {setEditState(stamp.id)}}>Editar</button>
          <button onClick={e => deleteStamp(e, stamp)} className="delete">Borrar</button>
          {editState === stamp.id && (
            <EditStamp stamp={stamp} getStampList={getStampList} setEditState={setEditState} setStampsState={setStampsState}/>
          )}
        </article>)
      }) : "No hay sellos disponibles"}

    </>
  )
}

export default List
