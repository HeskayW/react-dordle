import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
    
      Guess two 5-letter words in 7 tries. After each guess, the color of the tiles will
      change to show how close your guess was to each word. The five tiles on the left correspond to the first word,
      while the five on the right correspond to the second word. You have to guess both in order to win.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="W" status="correct" />
        <Cell value="E" />
        <Cell value="A" />
        <Cell value="R" />
        <Cell value="Y" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter W is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="P" />
        <Cell value="I" />
        <Cell value="L" status="present" />
        <Cell value="O" />
        <Cell value="T" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter L is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="V" />
        <Cell value="A" />
        <Cell value="G" />
        <Cell value="U" status="absent" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter U is not in the word in any spot.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is a clone of {' '}
        <a
          href="https://zaratustra.itch.io/dordle"
          className="underline font-bold"
        >
          Dordle
        </a>{' '} by {' '}
        <a
          href="https://zaratustra.itch.io/"
          className="underline font-bold"
        >
          Guilherme S. Töws. 
        </a>{' '}  
        Built as a fork of an open source version of the popular word guessing game - {' '}
        <a
          href="https://github.com/HeskayW/react-wordle-V"
          className="underline font-bold"
        >
          check out the fork here
        </a>{' '}
        and {' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          check out the original code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
