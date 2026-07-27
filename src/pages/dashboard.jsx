import React from 'react'
import { Link } from 'react-router-dom'

export const Dashboard = () => {

  return (
    <div className='min-h-screen w-full relative flex flex-col justify-center items-center'>

      <h1 className='font-bold text-xl block'>dashboard</h1>

      <Link className='bg-blue-600 px-2 py-1 text-white font-semibold text-xl mt-5 rounded'
        to='/profile'>
        go to profile
      </Link>
    </div>
  )
}
