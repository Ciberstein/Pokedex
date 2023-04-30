import React from 'react'

export const PokeFooter = () => {
  return (
    <footer className='app__footer'>
      <div className='app__footer__social'>
        <a href='https://github.com/Ciberstein' target='_blank'>
          <img src='./github.png' className='app__social__icon' />
        </a>
        <a href='https://www.linkedin.com/in/cyberstein/' target='_blank'>
          <img src='./linkedin.png' className='app__social__icon' />
        </a>        
      </div>
    </footer>
  )
}
