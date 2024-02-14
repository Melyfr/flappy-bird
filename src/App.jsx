import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import Bird from './pages/Bird';

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bird' element={<Bird />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  );
}