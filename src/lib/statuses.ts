import { solution1 } from './words'
import { solution2 } from './words'


//a=absent p=present c=correct / first char = left, second char=right
export type CharStatus = 'aa' | 'ap' | 'ac' | 'pa' | 'pp' | 'pc' | 'ca' | 'cp' | 'cc' | 'correct' | 'absent' | 'present'

//KEYBOARD
export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  guesses.forEach((word) => {
    word.split('').forEach((letter, i) => {

      // left side absent

      if (!solution1.includes(letter) && !solution2.includes(letter)) {
        return (charObj[letter] = 'aa')
      }
      if (!solution1.includes(letter) && letter === solution2[i]) {
        return (charObj[letter] = 'ac')
      }
      if (!solution1.includes(letter) && charObj[letter] !== 'ac') {
        return (charObj[letter] = 'ap')
      }

      //left side correct
      if (letter === solution1[i] && !solution2.includes(letter)) {
        return (charObj[letter] = 'ca')
      }
      if (letter === solution1[i] && letter === solution2[i]) {
        return (charObj[letter] = 'cc')
      }
      if (letter === solution1[i] && charObj[letter] !== 'cc') {
        return (charObj[letter] = 'cp')
      }

      //left side present
      if (!solution2.includes(letter)) {
        return (charObj[letter] = 'pa')
      }
      if (letter === solution2[1]){
        return (charObj[letter] = 'pc')
      }
      if (charObj[letter] !== 'pc'){
        return (charObj[letter] = 'pp')
      }
    })
  })
  console.log(charObj)
  return charObj
}

//ROWS
export const getGuessStatuses = (guess: string, solution: number): CharStatus[] => {
  
  const splitSolution = (() => {
    if (solution == 1) {
      return solution1.split('');
    } else {
      return solution2.split('');
    }
  })();


  //const splitSolution = solution1.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
