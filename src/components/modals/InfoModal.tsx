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
    
      Adivina dos palabras de 5 letras en 7 intentos.<br/><br/>
      Después de cada intento, el color de las letras 
      cambia para mostrar qué tan cerca estás de acertar cada palabra.<br/><br/>
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="G" status="correct" />
        <Cell value="A" />
        <Cell value="T" />
        <Cell value="O" />
        <Cell value="S" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La letra G está en la palabra y en la posición correcta.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="V" />
        <Cell value="O" />
        <Cell value="C" status="present" />
        <Cell value="A" />
        <Cell value="L" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        La letra C está en la palabra pero en la posición incorrecta.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="C" />
        <Cell value="A" />
        <Cell value="N" />
        <Cell value="T" status="absent" />
        <Cell value="O" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        la letra T no está en la palabra.<br/><br/>
      Las 5 letras de la izquierda corresponden a la primera palabra, 
      mientras que las 5 de la derecha corresponden a la segunda palabra.<br/><br/>
      Tienes que adivinar ambas para ganar.<br/><br/>
      Una palabra puede tener letras repetidas.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        Este juego es un clon de {' '}
        <a
          href="https://zaratustra.itch.io/dordle"
          className="underline font-bold"
        >
          Dordle
        </a>{' '} por {' '}
        <a
          href="https://zaratustra.itch.io/"
          className="underline font-bold"
        >
          Guilherme S. Töws.<br/><br/> 
        </a>{' '}  
        Construido a partir de una versión open source del popular juego de palabras - {' '}
        <a
          href="https://github.com/HeskayW/react-dordle"
          className="underline font-bold"
        >
          revisa este proyecto aquí
        </a>{' '}
        y {' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          revisa el código original aquí
        </a>{' '}
      </p>
    </BaseModal>
  )
}
