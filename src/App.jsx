import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Bgvideo } from './components/bgvideo'
import { Homepage } from './pages/home'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Profile } from './pages/profile'
import { Dashboard } from './pages/dashboard'

import { useAuthstore } from './store/user.authstore'

// toast 
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Protectedroute } from './routes/protectedrouter'
import { Protectadminrouter } from './routes/protectadminrouter'
import LoadingPage from './components/LoadingPage'


export const App = () => {

  const checkAuth = useAuthstore((state) => state.checkAuth);
  const checkingAuth = useAuthstore((state) => state.checkAuth)


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!checkingAuth) {

        return  <LoadingPage/>

    }

  return (

    <div className='relative min-h-screen w-full'>

      <Bgvideo />

      {/* navbar */}
      <Navbar />

      {/* main content */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* protect pages */}
        <Route path='/profile' element={
          <Protectedroute>
            <Profile />
          </Protectedroute>
        } />

        {/* admin pages */}
        <Route path='/dashboard' element={
          <Protectadminrouter>
            <Dashboard />
          </Protectadminrouter>
        } />

        {/* not path */}

        <Route path='*' element={<LoadingPage/>} />
      </Routes>

      {/* footer */}
      <Footer />

      <ToastContainer />
    </div>

  )
}
