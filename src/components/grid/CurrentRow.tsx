import { setDefaultResultOrder } from 'dns/promises'
import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'


type Props = {
  guess: string
  className: string
  printOnLeft: boolean
  printOnRight: boolean
}

export const CurrentRow = ({ guess, className, printOnLeft, printOnRight}: Props) => {
  const splitGuess = guess.split('')
  const classes = `flex justify-center mb-1 ${className}`
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))
  const emptyRow = Array.from(Array(MAX_WORD_LENGTH))


  if(printOnLeft && printOnRight)
  {
    console.log('1 en current row')
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

  if(printOnLeft && !printOnRight)
  {
    console.log('2 en current row')
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
  
  if(!printOnLeft && printOnRight)
  {
    console.log('3 en current row')
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

  console.log('ganaste? en currentRow')
  return(
    <div className={classes}>
      {emptyRow.map((_, i) => (
      <Cell key={i} />
      ))}
    &nbsp;
      {emptyRow.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
