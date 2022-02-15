import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'


type Props = {
  guess: string
  className: string
  isLeftWon: boolean
  isRightWon: boolean
}

export const CurrentRow = ({ guess, className, isLeftWon, isRightWon }: Props) => {
  const splitGuess = guess.split('')
  const classes = `flex justify-center mb-1 ${className}`
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))
  const emptyRow = Array.from(Array(MAX_WORD_LENGTH))

  if(isLeftWon){
    return (
      <div className={classes}>
        {emptyRow.map((_, i) => (
        <Cell key={i} />
        ))}
        &nbsp;
        {splitGuess.map((letter, i) => (
          <Cell key={i} value={letter}/>
        ))}
        {emptyCells.map((_, i) => (
          <Cell key={i} />
        ))}
      </div>
    )
  }
  if(isRightWon){
    return (
      <div className={classes}>
        {splitGuess.map((letter, i) => (
          <Cell key={i} value={letter}/>
        ))}
        {emptyCells.map((_, i) => (
          <Cell key={i} />
        ))}
        &nbsp;
        {emptyRow.map((_, i) => (
        <Cell key={i} />
        ))}
      </div>
    )
  }


  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter}/>
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
      &nbsp;
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter}/>
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
