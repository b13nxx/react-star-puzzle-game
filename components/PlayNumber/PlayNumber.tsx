import { NumberStatus } from '../NumbersDisplay/NumbersDisplayState'
import styles from './PlayNumber.module.css'

export interface PlayNumberProps {
  value: number
  numStatus: NumberStatus
  onClick: (num: number, numStatus: NumberStatus) => void
}

export default function PlayNumber ({
  value,
  numStatus,
  onClick
}: PlayNumberProps): JSX.Element {
  return (
    <button
      className={ `${styles.number} ${styles[numStatus]}` }
      onClick={ (): void => onClick(value, numStatus) }>
      {value}
    </button>
  )
}
