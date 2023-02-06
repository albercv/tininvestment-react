import React, { useState } from 'react'

const Search = ({ stampsState, setStampsState }) => {

    const [searching, setSearching] = useState('');
    const [notFound, setNotFound] = useState(false);

    const searchValues = (e) => {
        console.log("Search: " + e.target.value);
        setSearching(e.target.value);

        let filteredStamps = stampsState.filter(stamp => {
            return stamp.title.toLowerCase().includes(searching.toLowerCase());
        })

        if (searching.length <= 1 || filteredStamps.length <= 0) {
            filteredStamps = JSON.parse(localStorage.getItem("stamps"));
            setNotFound(true);
        } else {
            setNotFound(false);
        }
        setStampsState(filteredStamps)

    }

    return (
        <div className="">
            <h3 className="">Buscador: {searching}</h3>
            {(notFound && searching.length > 2) && (<h3 className='notFoundError'>Sin resultados</h3>)}
            <form>
                <input type="text"
                    id="search_field"
                    name="mySearch"
                    autoComplete='off'
                    defaultValue={searching}
                    onKeyUp={searchValues}
                    placeholder="Título" />
                <button id="search">Buscar</button>
            </form>
        </div>
    )
}

export default Search
