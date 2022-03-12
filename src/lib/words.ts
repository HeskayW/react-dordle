import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALID_GUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWordLeft= (word: string) => {
  return solution1 === word
}
export const isWinningWordRight = (word: string) => {
  return solution2 === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess,1)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return WRONG_SPOT_MESSAGE(guess[i], i + 1)
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return NOT_CONTAINED_MESSAGE(letter)
    }
  }
  return false
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs1 = new Date('January 1, 2022 00:00:00').valueOf()
  const epochMs2 = new Date('June 1, 2020 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index1 = Math.floor((now - epochMs1) / msInDay)
  const index2 = Math.floor((now - epochMs2) / msInDay)
  const nextday = (index1 + 1) * msInDay + epochMs1

  return {
    solution1: WORDS[index1 % WORDS.length].toUpperCase(),
    solution2: WORDS[index2 % WORDS.length].toUpperCase(),
    solutionIndex1: index1,
    solutionIndex2: index2,
    tomorrow: nextday,
  }
}

export const { solution1: solution1, solutionIndex1: solutionIndex1, solution2: solution2, solutionIndex2: solutionIndex2, tomorrow } = getWordOfDay()
