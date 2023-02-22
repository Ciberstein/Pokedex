import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PokeFooter } from '../components/Home/PokeFooter'
import { setNameTrainer } from '../store/slices/trainerName.slice'

export const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.trainerName.value.trim()));
        e.target.trainerName.value = ''
        navigate('/pokedex')
    }

    return (
        <div className='app__container'>
            <video className="background-video" loop muted autoPlay>
                <source src="/bg_animated.mp4" type="video/mp4" />
            </video>
            <div className='app__main'>
                <img src='/pokedex.png' className='pokedex__banner' />
                <div className='app__presentation'>
                    <h1>Hi trainer!</h1> 
                    <p>Give me your name to start</p>            
                </div>
                <form onSubmit={handleSubmit}>
                    <input type='text' id='trainerName' autoComplete='off' placeholder='Your name...' />
                    <button></button>
                </form>
            </div>
        </div>
    )
}
