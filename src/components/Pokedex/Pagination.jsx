import React from 'react'

export const Pagination = ({ pokePerPage, totalPokes, paginate, currentPage, setCurrentPage, setPokePerPage }) => {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPokes / pokePerPage); i++) {
        pageNumbers.push(i)
    }

    const handlePaginate = e => {
        setPokePerPage(e.target.value)
        setCurrentPage(1)
    }

    return (
        <nav>
            <ul className='pagination'>
                <li>
                    <button className='page-link' onClick={() => paginate(currentPage - 1)}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </li>
                {
                    pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <button className={`page-link ${ currentPage === number ? 'page-link-active' : '' }`} onClick={() => paginate(number)} >
                                {number}
                            </button>
                        </li>
                    ))
                }
                <li>
                    <button className='page-link' onClick={() => paginate(currentPage + 1)}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </li>
                <li>
                    <select className='page-link-select' onChange={handlePaginate}>
                        <option value='4'>4</option>
                        <option value='8' selected>8</option>
                        <option value='12'>12</option>
                        <option value='16'>16</option>
                        <option value='20'>20</option>
                    </select>
                </li>
            </ul>
        </nav>
    )
 }
