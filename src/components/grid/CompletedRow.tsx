import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'



type Props = {
  guess: string
  isRevealing?: boolean
  
  printOnLeft: boolean
  printOnRight: boolean
}

export const CompletedRow = ({ guess, isRevealing, printOnLeft, printOnRight}: Props) => {
  const statuses1 = getGuessStatuses(guess, 1)
  const statuses2 = getGuessStatuses(guess, 2)
  const emptyCells = Array.from(Array(guess.length))

  if (printOnLeft && printOnRight){
    return (
      <div className="flex justify-center mb-1">
        {guess.split('').map((letter, i) => (
          <Cell
            key={i}
            value={letter}
            status={statuses1[i]}
            position={i}
            isRevealing={isRevealing}
            isCompleted
          />
        ))}
        &nbsp;
        {guess.split('').map((letter, i) => (
          <Cell
            key={i}
            value={letter}
            status={statuses2[i]}
            position={i}
            isRevealing={isRevealing}
            isCompleted
          />
        ))}
        
      </div>
    )
  }

  if (printOnLeft && !printOnRight){
    return (
      <div className="flex justify-center mb-1">
        {guess.split('').map((letter, i) => (
          <Cell
            key={i}
            value={letter}
            status={statuses1[i]}
            position={i}
            isRevealing={isRevealing}
            isCompleted
          />
        ))}
        &nbsp;
        {emptyCells.map((_, i) => (
        <Cell key={i} />
        ))}
        
      </div>
    )
  }

  if (!printOnLeft && printOnRight){
    return (
      <div className="flex justify-center mb-1">
        {emptyCells.map((_, i) => (
        <Cell key={i} />
        ))}
        &nbsp;
        {guess.split('').map((letter, i) => (
          <Cell
            key={i}
            value={letter}
            status={statuses2[i]}
            position={i}
            isRevealing={isRevealing}
            isCompleted
          />
        ))}
        
      </div>
    )
  }

  console.log('ganaste? en completedRow')
  return(
    <div className={"flex justify-center mb-1"}>
      {emptyCells.map((_, i) => (
      <Cell key={i} />
      ))}
    &nbsp;
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
