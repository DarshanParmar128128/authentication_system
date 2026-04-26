import { useState } from 'react'
import './App.css'
import Dashboard from './assets/Dashboard'
import Login from './assets/Login'
import SingUp from './assets/SingUp'
import  "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
   <>
   {/* router is the base on then vertual */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SingUp />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App
