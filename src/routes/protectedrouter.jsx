import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthstore } from '../store/user.authstore';
import LoadingPage from '../components/LoadingPage';

export const Protectedroute = ({ children }) => {

    // const loading = useAuthstore((state) => state.loading)
    const isAuthenticated = useAuthstore((state) => state.isAuthenticated);
    const checkingAuth = useAuthstore((state) => state.checkingAuth)

    if(checkingAuth){
        return  <LoadingPage/>
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }


    return (
        children
    )
}
