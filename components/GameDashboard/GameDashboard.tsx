import { useState } from 'react'
import Game from '../Game/Game'

export default function GameDashboard (): JSX.Element {
  const [gameId, setGameId] = useState<number>(1)

  return (
    <Game
      { ...{
        startNewGame: (): void => setGameId(gameId + 1)
      } }
      key={ gameId } />
  )
}
