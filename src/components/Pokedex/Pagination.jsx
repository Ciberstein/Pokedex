import React from 'react'

export const Pagination = ({ pokePerPage, totalPokes, paginate, currentPage, setPokePerPage }) => {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPokes / pokePerPage); i++) {
        pageNumbers.push(i)
    }

    const handlePaginate = e => {
        setPokePerPage(e.target.value)
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
                <li>
                    <select className='page-link-select' onChange={handlePaginate}>
                        <option value='4'>4</option>
                        <option value='8'>8</option>
                        <option value='12'>12</option>
                        <option value='16'>16</option>
                        <option value='20'>20</option>
                    </select>
                </li>
            </ul>
        </nav>
    )
 }
