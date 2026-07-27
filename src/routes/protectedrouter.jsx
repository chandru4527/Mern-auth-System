import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthstore } from '../store/user.authstore';

export const Protectedroute = ({ children }) => {

    // const loading = useAuthstore((state) => state.loading)
    const isAuthenticated = useAuthstore((state) => state.isAuthenticated);
    const checkingAuth = useAuthstore((state) => state.checkingAuth)

    if(checkingAuth){
        return  <h1>loading</h1>
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }


    return (
        children
    )
}
