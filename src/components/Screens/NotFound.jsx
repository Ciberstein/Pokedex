import React from 'react'

export const NotFound = ({ id }) => {
  return (
    <div className='notFound__containter'>
        <img src="https://66.media.tumblr.com/f4918498af34c8764de970a2ca76795b/tumblr_mvzj2elEQA1rfjowdo1_500.gif" />
        <h2>Pokemon "{id}" not found</h2>
    </div>
  )
}
