import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registration from "./containers/Registration.jsx";
import HomePage from "./containers/HomePage.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
      </Routes> 
    </BrowserRouter>
  )
}