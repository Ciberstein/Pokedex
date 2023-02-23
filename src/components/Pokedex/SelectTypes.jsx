import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const SelectTypes = ({ setSelectValue }) => {

    const [pokeTypes, setPokeTypes] = useState()

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/type`
        axios.get(url)
            .then(res => setPokeTypes(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleChange = e => {
        setSelectValue(e.target.value)

        console.log(pokeTypes)
    }

    return (
        <select onChange={handleChange} className='SelectTypes'>
            <option value='allpokemons'>All Pokemons</option>
            {
                pokeTypes?.results.map(pokeType =>(
                    <option key={pokeType.url} value={pokeType.url}>{pokeType.name}</option>
                ))
            }
        </select>
    )
}
