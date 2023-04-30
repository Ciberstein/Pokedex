import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PokeHeader } from '../components/Home/PokeHeader'
import { Loading } from '../components/Screens/Loading'
import { NotFound } from '../components/Screens/NotFound'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '../store/slices/isLoading.slice'
import { PokeFooter } from '../components/Home/PokeFooter'

export const PokeInfo = () => {

    const { loadScreen } = useSelector(state => state)    
    const [hasError, setHasError] = useState(false)
    const { id } = useParams()
    const [poke, setPoke] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsLoading(true))
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        axios.get(url)
            .then(res => {
                setPoke(res.data)
                setHasError(false)
            })
            .catch(err => {
                setHasError(true)
                console.log(err)
            })
            .finally(() => {
                dispatch(setIsLoading(false))
            })
    }, [])

    console.log(poke)

    return (
        <div className='pokeInfo__container'>
            <PokeHeader />
            {
                loadScreen ?
                        <Loading />
                    :
                    hasError ? 
                        <NotFound id={id} />
                    :
                        <div className='pokeInfo__body'>
                            <div className='pokeInfo__left'>
                                <div className='pokeInfo__leftContainer'>
                                    <header className='pokeInfo__leftHeader'>
                                        <div className={`pokeInfo__leftHeaderEsfera ${poke?.types[0].type.name}`}></div>
                                        <div className='pokeInfo__leftHeaderEsferas'>
                                            <div className='esfera esfera__red'></div>
                                            <div className='esfera esfera__yellow'></div>
                                            <div className='esfera esfera__green'></div>
                                        </div>
                                    </header>
                                    <div className='pokeInfo__leftBody'>
                                        <div className='pokeInfo__img'>
                                            <img className={poke?.types[0].type.name} src={poke?.sprites.other['official-artwork'].front_default} />
                                        </div>
                                        <div className='pokecard__desc'>
                                            <h1>{poke?.name}</h1>
                                            <ul className='pokecard__typeList'>
                                                {
                                                    poke?.types.map(type => (
                                                        <li className={type.type.name} key={type.type.name}>{type.type.name}</li>
                                                    ))
                                                }
                                            </ul>
                                            <div className='pokeInfo__controls'>
                                                <div className='pokeInfo__buttons'>
                                                    <div className='pokeInfo__buttonsTop'>
                                                        <button className='pokeInfo__buttonsTop1'></button>
                                                        <button className='pokeInfo__buttonsTop2'></button>
                                                        <button className='pokeInfo__buttonsTop3'></button>
                                                    </div>
                                                    <div className='pokeInfo__buttonsBot'>
                                                        <button className='pokeInfo__buttonsBot1'></button>
                                                    </div>
                                                </div>
                                                <div className='pokecard__arrows'></div>
                                            </div>
                                        </div>
                                    </div>                        
                                </div>
                            </div>
                            <div className='pokeInfo__pilar'></div>
                            <div className='pokeInfo__right'>
                                <header className='pokeInfo__rightHeader'></header>
                                <div className='pokeInfo__rightBody'>
                                    <div className='pokeInfo__rightHW'>
                                        <span>Height: {poke?.height}</span>
                                        <span>Weight: {poke?.weight}</span>
                                    </div>
                                    <div className='pokeInfo__righStats'>
                                        <ul className='pokeInfo__righStatsList'>
                                            {
                                                poke?.stats.map( stat => (
                                                    <li className={`GlobalStatChart li-${Math.floor(stat.base_stat / 10)}`} key={stat.stat.url}>
                                                        <ul className='StatChartList'>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <li><div></div></li>
                                                            <span>{`${stat.stat.name}`}</span>
                                                        </ul>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className='pokeInfo__Abilities'>
                                        <h3>Abilities</h3>
                                        <div className='pokeInfo__AbilitiesContainer'>
                                        {
                                            poke?.abilities.map(ability => (
                                                <span className='pokeInfo__abilitySpan' key={ability.ability.name}>{ability.ability.name}</span>
                                            ))
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>                    
                        </div>
            }
            <PokeFooter />
        </div>
    )
}
