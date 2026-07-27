import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaUser } from 'react-icons/fa'
import { useAuthstore } from '../store/user.authstore'

export const Navbar = () => {
  const isAuthenticated  = useAuthstore((state) => state.isAuthenticated);
  const user = useAuthstore((state) => state.user)

// console.log(user.name)
  const navigate = useNavigate();

  const handleClick = () => {

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    else if (user.role === 'admin') {
      navigate('/dashboard');
    }
    else {
      navigate('/profile');
    }
  };



  return (
    <div className='w-full backdrop-blur-[2px] py-5 text-white shadow'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className='flex items-center justify-between'>

          <Link to='/' className='text-2xl font-bold'>
            logo
          </Link>

          <div className='flex gap-5 text-2xl'>
            <FaBars />

            <FaUser onClick={handleClick}
              className='cursor-pointer'
            />
          </div>

        </div>

      </div>
    </div>
  )
}