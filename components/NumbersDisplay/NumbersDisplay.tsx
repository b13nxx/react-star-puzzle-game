import utils from '../../utils/utils'
import PlayNumber from '../PlayNumber/PlayNumber'
import useNumbersDisplayState, {
  NumbersDisplayStateProps,
  getNumberStatus,
  onNumberClick
} from './NumbersDisplayState'

export interface NumbersDisplayProps extends NumbersDisplayStateProps {
  maxStars: number
}

export default function NumbersDisplay ({
  maxStars,
  ...props
}: NumbersDisplayProps): JSX.Element {
  useNumbersDisplayState(props)

  return (
    <>
      {
        utils.range(1, maxStars).map((value: number) => (
          <PlayNumber
            { ...{
              value,
              numStatus: getNumberStatus(value),
              onClick: onNumberClick
            } }
            key={ value } />
        ))
      }
    </>
  )
}
