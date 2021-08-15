import { GameStatus } from '../Game/Game'
import styles from './PlayAgain.module.css'

export interface PlayAgainProps {
  gameStatus: GameStatus
  startNewGame: () => void
}

export default function PlayAgain ({
  gameStatus,
  startNewGame
}: PlayAgainProps): JSX.Element {
  return (
    <div
      className={ styles['game-done'] }>
      <div
        className={ `${styles.message} ${styles[gameStatus]}` }>
        {gameStatus === 'lost' ? 'Game Over' : 'You won'}
      </div>
      <button
        className={ styles['restart-button'] }
        onClick={ startNewGame }>
        Play Again
      </button>
    </div>
  )
}
