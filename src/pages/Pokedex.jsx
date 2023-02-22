import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PokeHeader } from '../components/Home/PokeHeader'
import { PokeCard } from '../components/Pokedex/PokeCard'
import { SelectTypes } from '../components/Pokedex/SelectTypes'

export const Pokedex = () => {
  
    const { nameTrainer } = useSelector(state => state)

    const [pokemons, setPokemons] = useState()
    const [selectValue, setSelectValue] = useState('allpokemons')

    useEffect(() => {

        if(selectValue === 'allpokemons'){
            const url = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`
            axios.get(url)
            .then(res => setPokemons(res.data))
            .catch(err => console.log(err))
        }
        else {
            axios.get(selectValue)
            .then(res => {
                const results = res.data.pokemon.map(e => e.pokemon)
                setPokemons({results})
            })
            .catch(err => console.log(err))
        }
    }, [selectValue])

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const inputValue = e.target.pokemon.value.trim().toLowerCase()
        navigate(`/pokedex/${inputValue}`)
        e.target.pokemon.value = ''
    }

    return (
        <div className='pokedex__container'>
            <PokeHeader />
            <div className='pokedex__bannerPresent'>
                <h1><span>Hi {nameTrainer}</span>, here find your favorite pokemon</h1>
                <div className='pokedex__SearchFields'>
                    <form onSubmit={handleSubmit} className='pokedex__searchForm'>
                        <input id='pokemon' type='text' placeholder='Ex: Pikachu' autoComplete='off' />
                        <button></button>
                    </form>     
                    <SelectTypes setSelectValue={setSelectValue} />
                </div>
            </div>
            <div className='pokedex__pokemon'>
                {
                    pokemons?.results.map(pokemon => (
                        <PokeCard
                            key={pokemon.url}
                            pokemon={pokemon}
                        />
                    ))
                }
            </div>
        </div>
    )
}
