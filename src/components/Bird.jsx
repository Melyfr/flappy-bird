import React from 'react'
import '../css/Bird.css'

export default function Bird(props) {
  return (
    <div className='bird' style={{top: `${props.birdPosition}px`, width: `${props.birdSize}px`, height: `${props.birdSize}px`}}></div>
  )
}
