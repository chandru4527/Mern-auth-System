import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthstore } from '../store/user.authstore';


export const Protectadminrouter = ({ children }) => {

        const user = useAuthstore((state) => state.user)

        if (!user) {
            return <Navigate TO='/login' replace/>
        }

        if(user.role !== 'admin'){
         return <Navigate to='/' replace/>
        }
    
    return (
        children
    )
}
