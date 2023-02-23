import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PokeHeader } from '../components/Home/PokeHeader'
import { PokeCard } from '../components/Pokedex/PokeCard'
import { SelectTypes } from '../components/Pokedex/SelectTypes'
import { Pagination } from '../components/Pokedex/Pagination'
import { setIsLoading } from '../store/slices/isLoading.slice'
import { Loading } from '../components/Screens/Loading'

export const Pokedex = () => {
  
    const { nameTrainer } = useSelector(state => state)
    const { loadScreen } = useSelector(state => state)    
    const [pokemons, setPokemons] = useState()
    const [selectValue, setSelectValue] = useState('allpokemons')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokePerPage, setPokePerPage] = useState(8)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsLoading(true))
        if(selectValue === 'allpokemons'){
            const url = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`
            axios.get(url)
            .then(res => {
                setPokemons(res.data)
            })
            .catch(err => console.log(err))
            .finally(() =>  dispatch(setIsLoading(false)))
        }
        else {
            axios.get(selectValue)
            .then(res => {
                const results = res.data.pokemon.map(e => e.pokemon)
                setPokemons({results})
            })
            .catch(err => console.log(err))
            .finally(() =>  dispatch(setIsLoading(false)))
        }
    }, [selectValue])

    const navigate = useNavigate()
    const handleSubmit = e => {
        e.preventDefault()
        const inputValue = e.target.pokemon.value.trim().toLowerCase()
        navigate(`/pokedex/${inputValue}`)
        e.target.pokemon.value = ''
    }

    const indexOfLastPost = currentPage * pokePerPage
    const indexOfFirstPost = indexOfLastPost - pokePerPage
    const currentPokes = pokemons?.results.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = pageNumber => {

        const totalPages = Math.ceil(pokemons?.results.length / pokePerPage)

        if(pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber)
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
                <Pagination 
                    pokePerPage={pokePerPage} 
                    totalPokes={pokemons?.results.length} 
                    paginate={paginate}   
                    currentPage={currentPage}
                    setPokePerPage={setPokePerPage}
                />
            </div>
            {
                loadScreen ? 
                    <Loading />
                :
                <div className='pokedex__pokemon'>
                    {
                        currentPokes?.map(pokemon => (
                            <PokeCard
                                key={pokemon.url}
                                pokemon={pokemon}
                            />
                        ))
                    }
                </div>
            }
        </div>
    )
}
