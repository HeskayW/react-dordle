import {
  InformationCircleIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGES,
} from './constants/strings'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  ALERT_TIME_MS,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWordLeft,
  isWinningWordRight,
  solution1,
  solution2,
  findFirstUnusedReveal,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
} from './lib/localStorage'

import './App.css'

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)

  const [isLeftWon, setIsLeftWon] = useState(false)
  const [isRightWon, setIsRightWon] = useState(false)
  const [isLimitReached, setIsLimitReached] = useState(false)

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isHardModeAlertOpen, setIsHardModeAlertOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  //-------------------------------------------------------------------
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution1 !== solution1) {
      return []
    }
    const leftWasWon = loaded.guesses.includes(solution1)
    const rightWasWon = loaded.guesses.includes(solution2)
    if (leftWasWon){
      setIsLeftWon(true)
    }
    if (rightWasWon){
      setIsRightWon(true)
    }
    if (leftWasWon && rightWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && (!leftWasWon || !rightWasWon)) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })
  //-------------------------------------------------------------------
  const [printOnLeft, setPrintOnLeft] = useState<boolean[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution1 !== solution1) {
      return [true]
    }
    return loaded.printOnLeft
    })

  const [printOnRight, setPrintOnRight] = useState<boolean[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution1 !== solution1) {
      return [true]
    }
    return loaded.printOnRight
  })

  //-------------------------------------------------------------------

  const [stats, setStats] = useState(() => loadStats())

  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )

  const [isMissingPreviousLetters, setIsMissingPreviousLetters] =
    useState(false)
  const [missingLetterMessage, setIsMissingLetterMessage] = useState('')

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard)
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
    } else {
      setIsHardModeAlertOpen(true)
      return setTimeout(() => {
        setIsHardModeAlertOpen(false)
      }, ALERT_TIME_MS)
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution1: solution1 , solution2: solution2 , printOnLeft: printOnLeft, printOnRight: printOnRight})
  }, [guesses,printOnLeft,printOnRight])

  useEffect(() => {
    if(isLeftWon && isRightWon){
      setStats(addStatsForCompletedGame(stats, guesses.length - 1))
      setIsGameWon(true)      
    }
  }, [isLeftWon, isRightWon]);

  useEffect(() => {
    if(isLimitReached && !isGameWon){      
      setStats(addStatsForCompletedGame(stats, guesses.length))
      setIsGameLost(true)      
    }
  }, [isLimitReached]);
  
  useEffect(() => {
    if (isGameWon) {
      setTimeout(() => {
        setSuccessAlert(
          WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
        )

        setTimeout(() => {
          setSuccessAlert('')
          setIsStatsModalOpen(true)
        }, ALERT_TIME_MS)
      }, REVEAL_TIME_MS * MAX_WORD_LENGTH)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, GAME_LOST_INFO_DELAY)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (
      currentGuess.length < MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === MAX_WORD_LENGTH)) {
      setIsNotEnoughLetters(true)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
      if (firstMissingReveal) {
        setIsMissingLetterMessage(firstMissingReveal)
        setIsMissingPreviousLetters(true)
        setCurrentRowClass('jiggle')
        return setTimeout(() => {
          setIsMissingPreviousLetters(false)
          setCurrentRowClass('')
        }, ALERT_TIME_MS)
      }
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH)




    if (
      currentGuess.length === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      //------------------------------------------------------------   

      if (!isLeftWon && isWinningWordLeft(currentGuess)){
        setIsLeftWon(true)
        setPrintOnLeft([...printOnLeft,false])
      } else if (isLeftWon){
        setPrintOnLeft([...printOnLeft,false])
      } else {
        setPrintOnLeft([...printOnLeft,true])
      }

      if (!isRightWon && isWinningWordRight(currentGuess)){
        setIsRightWon(true)
        setPrintOnRight([...printOnRight,false])
      }else if (isRightWon){
        setPrintOnRight([...printOnRight,false])
      }else{
        setPrintOnRight([...printOnRight,true])
      }


      if (guesses.length === MAX_CHALLENGES - 1 && !isGameWon) {
        setIsLimitReached(true)

      }
    }
  }

  return (
    <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 mt-20">
        <h1 className="text-xl ml-2.5 grow font-bold dark:text-white">
          {GAME_TITLE}
        </h1>
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <CogIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsSettingsModalOpen(true)}
        />
      </div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
        currentRowClassName={currentRowClass}
        printOnLeft={printOnLeft}
        printOnRight={printOnRight}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        isRevealing={isRevealing}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
        isHardMode={isHardMode}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        isHardMode={isHardMode}
        handleHardMode={handleHardMode}
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        isHardModeErrorModalOpen={isHardModeAlertOpen}
        isHighContrastMode={isHighContrastMode}
        handleHighContrastMode={handleHighContrastMode}
      />

      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={missingLetterMessage} isOpen={isMissingPreviousLetters} />
      <Alert
        message={CORRECT_WORD_MESSAGES(solution1,solution2)}
        isOpen={isGameLost && !isRevealing}
      />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
        topMost={true}
      />
    </div>
  )
}

export default App
