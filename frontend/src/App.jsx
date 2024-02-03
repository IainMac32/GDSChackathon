import { useState } from 'react'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'



function App(args) { 



  return (


    <BrowserRouter>
      <Routes>
        
        <Route path = '/' element = {<Home/>}/>
        
      </Routes>
</BrowserRouter>
    



  )
}

export default App
