import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth' 
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import { MovieProvider } from './components/Contexts/Moviecontext'
import 'react-toastify/dist/ReactToastify.css';
import Movies from './pages/Movies/Movies'
import Tv_Shows from './pages/Tv_Shows/Tv_Shows'
import New_Popular from './pages/New&Popular/New&Popular'
import Favorites from './pages/Favorites/Favorites'

const App = () => {

  const navigate = useNavigate();
  

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        console.log('You Logged In')
        navigate('/')
      }else{
        console.log('User not avvailable, Please Login Again')
        navigate('/login')
      }
    })
  },[])


  return (
    <MovieProvider>
      <ToastContainer theme='dark'/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/:genre/player/:id' element={<Player />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tv-shows' element={<Tv_Shows />} />
        <Route path='/new&popular' element={<New_Popular />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </MovieProvider>
  )
}

export default App