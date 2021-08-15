import {
  Dispatch, SetStateAction, useState
} from 'react'
import { GameStatus } from '../Game/Game'
import utils from '../utils'

let candidateNums: number[],
  setCandidateNums: Dispatch<SetStateAction<number[]>>,
  availableNums: number[],
  setAvailableNums: Dispatch<SetStateAction<number[]>>,
  props: NumbersDisplayStateProps

export interface NumbersDisplayStateProps {
  stars: number
  setStars: Dispatch<SetStateAction<number>>
  gameStatus: GameStatus
  setGameStatus: Dispatch<SetStateAction<GameStatus>>
}

export default function useNumbersDisplayState ({
  stars,
  setStars,
  gameStatus,
  setGameStatus
}: NumbersDisplayStateProps): void {
  ;[candidateNums, setCandidateNums] = useState<number[]>([])
  ;[availableNums, setAvailableNums] = useState<number[]>(utils.range(1, 9))

  props = {
    stars,
    setStars,
    gameStatus,
    setGameStatus
  }
}

export type NumberStatus = 'available' | 'wrong' | 'candidate' | 'used'

export function getNumberStatus (num: number): NumberStatus {
  if (!availableNums.includes(num)) {
    return 'used'
  } else if (candidateNums.includes(num)) {
    return utils.sum(candidateNums) > props.stars ? 'wrong' : 'candidate'
  }

  return 'available'
}

export function onNumberClick (num: number, numStatus: NumberStatus): void {
  if (
    props.gameStatus === 'won' ||
    props.gameStatus === 'lost' ||
    numStatus === 'used' ||
    numStatus === 'wrong'
  ) {
    return
  }

  const newCandidateNums: number[] =
    numStatus === 'available'
      ? [...candidateNums, num]
      : candidateNums.filter(cn => cn !== num)

  utils.sum(newCandidateNums) === props.stars
    ? goToNextRound(newCandidateNums)
    : setCandidateNums(newCandidateNums)

  if (utils.sum(newCandidateNums) > props.stars) {
    setTimeout((): void => setCandidateNums([]), 500)
  }
}

function goToNextRound (newCandidateNums: number[]): void {
  const newAvailableNums: number[] = utils.diff(availableNums, newCandidateNums)

  props.setStars(utils.randomSumIn(newAvailableNums, 9))
  setAvailableNums(newAvailableNums)
  setCandidateNums([])

  if (newAvailableNums.length === 0) {
    props.setGameStatus('won')
  }
}
