import { useState } from 'react'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Edit from './pages/Edit'


function App(args) {



  return (


    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/edit' element={<Edit />} />
      </Routes>
    </BrowserRouter>




  )
}

export default App
