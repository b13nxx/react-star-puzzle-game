import React, {
  useEffect, useState
} from 'react'
import utils from '../utils'
import NumbersDisplay from '../NumbersDisplay/NumbersDisplay'
import PlayAgain from '../PlayAgain/PlayAgain'
import StarsDisplay from '../StarsDisplay/StarsDisplay'
import styles from './Game.module.css'

export interface GameProps {
  startNewGame: () => void
}

export type GameStatus = 'start' | 'active' | 'won' | 'lost'

export default function Game ({ startNewGame }: GameProps): JSX.Element {
  const maxStars: number = 9
  const [stars, setStars] = useState<number>(utils.random(1, maxStars))
  const [secondsLeft, setSecondsLeft] = useState<number>(10)
  const [gameStatus, setGameStatus] = useState<GameStatus>('active')

  useEffect(() => {
    if (gameStatus !== 'active') {
      return
    }

    if (secondsLeft === 0) {
      return setGameStatus('lost')
    }

    const timerId = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1)
    }, 1000)

    return (): void => clearTimeout(timerId)
  })

  return (
    <div
      className={ styles.game }>
      <div
        className={ styles.help }>
        Pick 1 or more numbers that sum to the number of stars
      </div>

      <div
        className={ styles.body }>
        <div
          className={ styles.left }>
          {
            gameStatus === 'won' || gameStatus === 'lost'
              ? (
                <PlayAgain
                  { ...{
                    gameStatus,
                    startNewGame
                  } } />
              )
              : (
                <StarsDisplay
                  { ...{ stars } } />
              )
          }
        </div>

        <div
          className={ styles.right }>
          <NumbersDisplay
            { ...{
              maxStars,
              stars,
              setStars,
              gameStatus,
              setGameStatus
            } } />
        </div>
      </div>

      <div
        className={ styles.timer }>
        Time Remaining: &nbsp;
        {secondsLeft}
      </div>
    </div>
  )
}
