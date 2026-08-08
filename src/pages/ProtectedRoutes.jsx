import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {

    const nameTrainer = useSelector(state => state.nameTrainer)

    if(nameTrainer){
        return <Outlet />
    }
    else {
        return <Navigate to='/' />
    }

}
