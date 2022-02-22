import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'



type Props = {
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean 
  currentRowClassName: string

  printOnLeft: boolean[]
  printOnRight: boolean[]
  
}

export const Grid = ({
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
  printOnLeft,
  printOnRight,

}: Props) => {


  var currentPrintOnLeft = printOnLeft[printOnLeft.length-1]
  var currentPrintOnRight= printOnRight[printOnRight.length-1]


  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
          printOnLeft={printOnLeft[i]}
          printOnRight={printOnRight[i]}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow 
        guess={currentGuess} 
        className={currentRowClassName} 
        printOnLeft={currentPrintOnLeft} printOnRight={currentPrintOnRight}
        />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
