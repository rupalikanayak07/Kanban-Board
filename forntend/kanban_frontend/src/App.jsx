import React from 'react'
import "./index.css"
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import BoardHome from './pages/BoardHome'
const App = () => {
  return (
    <div>

      <BoardHome />
      <ToastContainer />
    </div>
  )
}

export default App