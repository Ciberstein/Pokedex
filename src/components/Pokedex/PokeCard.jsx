import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const PokeCard = ({ pokemon }) => {

    const [poke, setPoke] = useState()

    useEffect(()=> {
        axios.get(pokemon.url)
            .then(res => setPoke(res.data))
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/pokedex/${poke?.id}`)
    }

    return (
        <article className='pokecard__container' onClick={handleClick}>
            <header className='pokecard__header'>
                <div>
                    <h6>POKÉDEX BY</h6>
                    <h6>CYBERSTEIN</h6>                    
                </div>
                <div className='pokecard__icon'>
                    <img src='/pokeball.png' />
                </div>
            </header>
            <div className='pokecard__img'>
                <div className='pokecar__imgBorder'>
                    <img className={poke?.types[0].type.name} src={poke?.sprites.other['official-artwork'].front_default} alt={poke?.name} />
                </div>
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
                <div className='pokecard__stats'>
                    <ul className='pokecard__statList'>
                        {
                            poke?.stats.map( stat => (
                                <li key={stat.stat.url}>{`${stat.stat.name}: ${stat.base_stat}`}</li>
                            ))
                        }
                    </ul>
                    <div className='pokecard__arrows'></div>
                </div>
            </div>
        </article>
    )
}
