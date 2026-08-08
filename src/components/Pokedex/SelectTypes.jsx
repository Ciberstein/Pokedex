import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const SelectTypes = ({ setSelectValue, setCurrentPage }) => {

    const [pokeTypes, setPokeTypes] = useState()

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/type`
        axios.get(url)
            .then(res => setPokeTypes(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleChange = e => {
        setSelectValue(e.target.value)
        setCurrentPage(1)
    }

    return (
        <select onChange={handleChange} className='SelectTypes' aria-label='Filter by type'>
            <option value='allpokemons'>All Pokemons</option>
            {
                pokeTypes?.results.map(pokeType =>(
                    <option key={pokeType.url} value={pokeType.url}>{pokeType.name}</option>
                ))
            }
        </select>
    )
}
