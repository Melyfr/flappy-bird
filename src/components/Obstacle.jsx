import React from 'react'

import '../css/Obstacle.css'

export default function Obstacle(props) {
  return (
    <div className='obstacle' style={{top: `${props.top}px`, left: `${props.left}px`, width: `${props.width}px`, height: `${props.height}px`}}></div>
  )
}
