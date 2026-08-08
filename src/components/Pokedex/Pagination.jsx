import React from 'react'

const Chevron = ({ direction }) => (
    <svg viewBox='0 0 24 24' width='1em' height='1em' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <polyline points={direction === 'left' ? '15 4 7 12 15 20' : '9 4 17 12 9 20'} />
    </svg>
)

export const Pagination = ({ pokePerPage, totalPokes, paginate, currentPage, setCurrentPage, setPokePerPage }) => {

    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPokes / pokePerPage); i++) {
        pageNumbers.push(i)
    }

    const handlePaginate = e => {
        setPokePerPage(Number(e.target.value))
        setCurrentPage(1)
    }

    return (
        <nav>
            <ul className='pagination'>
                <li>
                    <button className='page-link' onClick={() => paginate(currentPage - 1)} aria-label='Previous page'>
                        <Chevron direction='left' />
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
                    <button className='page-link' onClick={() => paginate(currentPage + 1)} aria-label='Next page'>
                        <Chevron direction='right' />
                    </button>
                </li>
                <li>
                    <select className='page-link-select' onChange={handlePaginate} defaultValue={pokePerPage} aria-label='Pokemon per page'>
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
