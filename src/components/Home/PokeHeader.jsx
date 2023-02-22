import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PokeHeader = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/pokedex')
  }

  return (
    <header className='main__header' onClick={handleClick}>
        <img src='/pokedex.png' />
    </header>
  )
}
