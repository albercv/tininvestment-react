import React, { useEffect, useMemo, useState } from 'react'
import EditStamp from './EditStamp';
import { fetchItems } from '../service/ApiConnection.js'


const List = ({ stampsState, setStampsState }) => {

  const [editState, setEditState] = useState(0);

  useEffect(() => {
    getStampList();
    console.table(`STATE: ${stampsState}`);
  }, []);

  useEffect(() => {
    console.table(`STATE: ${stampsState}`);
  }, [stampsState]);

  const getStampList = async () => {

    const fetched = await fetchItems();

    console.log(fetched);
    let localStoragedData = null;
  
    localStoragedData !== null ? setStampsState([]) : setStampsState(fetched)

    return fetched;
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
          return (<article key={stamp.id} className="stamp-item">
            {console.log(`ID: ${stamp.id}`)}
            <h3 className="title">{stamp.title}</h3>
            <p className="description">evolve2digital.com</p>
            <div>
              <img alt={stamp.title} src={stamp.images[0].imageUrl} height="100" width="100" />
            </div>

            <button className="edit" onClick={() => { setEditState(stamp.id) }}>Editar</button>
            <button onClick={e => deleteStamp(e, stamp)} className="delete">Borrar</button>
            {editState === stamp.id && (
              <EditStamp stamp={stamp} getStampList={getStampList} setEditState={setEditState} setStampsState={setStampsState} />
            )}
          </article>)
        }) : "No hay sellos disponibles"}

    </>
  )
}

export default List
