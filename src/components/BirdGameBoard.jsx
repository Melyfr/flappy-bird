import React from 'react'
import { useState, useEffect } from 'react';
import '../css/BirdGameBoard.css';
import Bird from './Bird';
import Obstacle from './Obstacle';

export default function BirdGameBoard(props) {
  const maxGameBoardWidth = Math.floor(window.screen.availWidth - 50);
  const gameBoardWidth = maxGameBoardWidth > 750 ? 750 : maxGameBoardWidth;
  const gameBoardHeight = gameBoardWidth;
  const birdSize = Math.floor(gameBoardWidth/30);
  const gravity = Math.floor(gameBoardWidth/250);
  const jumpHeight = Math.floor(gameBoardWidth/10);
  const obstacleWidth = Math.floor(gameBoardWidth/11);
  const gapHeight = birdSize * 6;
  const gameSpeed = Math.floor((-2/75) * (gameBoardWidth - 375) + 20);

  const [gameIsStart, setGameIsStart] = useState(false);
  const [gameIsLoss, setGameIsLoss] = useState(false);
  const [obstacleHeigth, setObstacleHeight] = useState(Math.floor((gameBoardHeight - gapHeight)/2));
  const [bottomObstacleHeight, setBottomObstacleHeight] = useState(gameBoardHeight - gapHeight - obstacleHeigth);
  const [birdPosition, setBirdPosition] = useState(Math.floor(gameBoardHeight/2));
  const [obstaclePosition, setObstaclePosition] = useState(gameBoardWidth - obstacleWidth);

  useEffect(() => {
    let intervalID;

    if (birdPosition < gameBoardHeight - birdSize && gameIsStart && !gameIsLoss ) {
      intervalID = setInterval(() => {
        setBirdPosition(birdPosition + gravity);
      }, 15);
    }
    return() => {
      clearInterval(intervalID);
    } 
  }, [birdPosition, gameIsStart, gameIsLoss]);

  useEffect(() => {
    let obstacleID;

    if (obstaclePosition > -obstacleWidth && gameIsStart && !gameIsLoss) {
      obstacleID = setInterval(() => {
        setObstaclePosition(obstaclePosition-5);
      }, gameSpeed);
      return() => {
        clearInterval(obstacleID);
      };

    } else {
      if (!gameIsLoss) {
        setObstaclePosition(gameBoardWidth - obstacleWidth);
        setObstacleHeight(Math.floor(Math.random() * (gameBoardHeight - gapHeight)));
        if (gameIsStart) {
          props.setScore(props.score + 1);
        }
      } 
      
    }
  }, [obstaclePosition, gameIsStart, gameIsLoss]);

  useEffect(() => {
    setBottomObstacleHeight(gameBoardHeight - gapHeight - obstacleHeigth);
  }, [obstacleHeigth]);

  useEffect(() => {
    const collideTopObstacle = birdPosition >= 0 && birdPosition < obstacleHeigth; 
    const collideBottomObstacle = birdPosition <= gameBoardHeight && birdPosition >= gameBoardHeight - bottomObstacleHeight - birdSize; 
    
    if (gameIsStart && !gameIsLoss && obstaclePosition <= 100 + birdSize && obstaclePosition > 100 - obstacleWidth && (collideTopObstacle || collideBottomObstacle)) {
      setGameIsLoss(true);
    }
  }, [birdPosition, obstacleHeigth, bottomObstacleHeight, obstaclePosition]);

  const handleClick = () => {
    if (gameIsLoss) {
      props.setScore(0);
      setGameIsLoss(false);
      setGameIsStart(false);
      setBirdPosition(Math.floor(gameBoardHeight/2));
    } else {
      if (!gameIsStart) {
        setGameIsStart(true);
      } else {
        if (birdPosition > jumpHeight) {
          setBirdPosition(birdPosition - jumpHeight);
        } else {
          setBirdPosition(0);
        }
      }
    }
  };

  return (
    <div className='gameboard' tabIndex="0" onClick={handleClick}>
      <div className="gameboard__container" style={{width: `${gameBoardWidth}px`, height: `${gameBoardHeight}px`}}>
        <Obstacle top={0} left={obstaclePosition} width={obstacleWidth} height={obstacleHeigth}/>
        <Obstacle top={gameBoardHeight - (obstacleHeigth + bottomObstacleHeight)} left={obstaclePosition} width={obstacleWidth} height={bottomObstacleHeight}/>
        <Bird birdPosition = {birdPosition} birdSize = {birdSize}/>
      </div>
    </div>
  )
}
