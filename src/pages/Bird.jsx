import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import BirdGameBoard from '../components/BirdGameBoard';
import '../css/Game.css';

export default function Bird() {

  const [score, setScore] = useState(0);

  return (
    <div className='game'>
      <p className='game__score'>Your score: <span className='game__score__number'>{score}</span> </p>
      <BirdGameBoard score={score} setScore={setScore}/>
      <Link to='/' className='link game__link'>Return</Link>
    </div>
  )
}
