import { getGuessStatuses } from './statuses'
import { solutionIndex1 } from './words'
import { isWinningWordLeft } from './words'
import { isWinningWordRight } from './words'
import { GAME_TITLE } from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'
import { getStoredIsHighContrastMode } from './localStorage'


export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean
) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} #${solutionIndex1} ${lost ? 'X' : guesses.length}/${MAX_CHALLENGES}${
      isHardMode ? '*' : ''
    }\n\n` + generateEmojiGrid(guesses)
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  var isLeftReady: boolean = false
  var isRightReady: boolean = false


  return guesses
    .map((guess) => {
      const status1 = getGuessStatuses(guess,1)
      const status2 = getGuessStatuses(guess,2)
      const isHighContrast = getStoredIsHighContrastMode()

      console.log(isLeftReady,isRightReady,guess)

      const leftPrint = guess
      .split('')
      .map((_, i) => {
        if (!isLeftReady){
          switch (status1[i]) {
            case 'correct':
              if (isHighContrast) {
                return '🟧'
              }
              return '🟩'
            case 'present':
              if (isHighContrast) {
                return '🟦'
              }
              return '🟨'
            default:
              if (localStorage.getItem('theme') === 'dark') {
                return '⬛'
              }
              return '⬜'
          }
        } 
        else {
          if (localStorage.getItem('theme') === 'dark') {
            return '⬛'
          }
          return '⬜'
        }
    })
    .join('')

    const rightPrint = guess
    .split('')
    .map((_, i) => {
    if (!isRightReady){
      switch (status2[i]) {
        case 'correct':
          if (isHighContrast) {
            return '🟧'
          }
          return '🟩'
        case 'present':
          if (isHighContrast) {
            return '🟦'
          }
          return '🟨'
        default:
          if (localStorage.getItem('theme') === 'dark') {
            return '⬛'
          }
          return '⬜'
        }
      } 
      else {
        if (localStorage.getItem('theme') === 'dark') {
          return '⬛'
        }
        return '⬜'
      }
    })      
    .join('')

    const totalPrint: string = leftPrint + ' ' + rightPrint 
    
    if (!isLeftReady){
      isLeftReady = isWinningWordLeft(guess)
    }
    if (!isRightReady){
      isRightReady = isWinningWordRight(guess)
    }

    return totalPrint
        
    })
    .join('\n')
}


