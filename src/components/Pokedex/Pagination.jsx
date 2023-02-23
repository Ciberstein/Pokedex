import React from 'react'

export const Pagination = ({ pokePerPage, totalPokes, paginate, currentPage }) => {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPokes / pokePerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button className={`page-link ${ currentPage === number ? 'page-link-active' : '' }`} onClick={() => paginate(number)} >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
 }