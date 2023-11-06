import React, { useState } from 'react'

const Search = ({ picturesState, setPicturesState }) => {

    const [searching, setSearching] = useState('');
    const [notFound, setNotFound] = useState(false);

    const searchValues = (e) => {
        console.log("Search: " + e.target.value);
        setSearching(e.target.value);

        let filteredPictures = picturesState.filter(picture => {
            return (
                picture.title.toLowerCase().includes(searching.toLowerCase()) ||
                (isNaN(Number(searching)) === false && picture.price <= searching)
            );
        });
        
        if (searching.length <= 1 || filteredPictures.length <= 0) {
            filteredPictures = JSON.parse(localStorage.getItem("pictures"));
            setNotFound(true);
        } else {
            setNotFound(false);
        }
        setPicturesState(filteredPictures)

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
