import { ReactNode } from 'react'
import classnames from 'classnames'
import { CharStatus } from '../../lib/statuses'
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  children?: ReactNode
  value: string
  width?: number
  status?: CharStatus
  onClick: (value: string) => void
  isRevealing?: boolean
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  isRevealing,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-lg font-bold cursor-pointer select-none dark:text-white border-transparent',
    {
      'transition ease-in-out': isRevealing,
      'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400':
        !status,
      'bg-slate-400 dark:bg-slate-800 text-white': 
        status === 'aa',
      'bg-slate-400 dark:bg-slate-800 border-r-green-500 hover:border-r-green-600 active:border-r-green-700 text-white':
        status === 'ac' && !isHighContrast,
      'bg-slate-400 dark:bg-slate-800 border-r-yellow-500 hover:border-r-yellow-600 active:border-r-yellow-700 text-white':
        status === 'ap' && !isHighContrast,
      'border-l-green-500 hover:border-l-green-600 active:border-l-green-700 bg-slate-400 dark:bg-slate-800 text-white':
        status === 'ca' && !isHighContrast,
      'border-l-green-500 hover:border-l-green-600 active:border-l-green-700 border-r-yellow-500 hover:border-r-yellow-600 active:border-r-yellow-700 text-white':
        status === 'cp' && !isHighContrast,
      'border-l-green-500 hover:border-l-green-600 active:border-l-green-700 border-r-green-500 hover:border-r-green-600 active:border-r-green-700 text-white':
        status === 'cc' && !isHighContrast,
      'border-l-yellow-500 hover:border-l-yellow-600 active:border-l-yellow-700 bg-slate-400 dark:bg-slate-800 text-white':
        status === 'pa' && !isHighContrast,
      'border-l-yellow-500 hover:border-l-yellow-600 active:border-l-yellow-700 border-r-yellow-500 hover:border-r-yellow-600 active:border-r-yellow-700 text-white':
        status === 'pp' && !isHighContrast,
      'border-l-yellow-500 hover:border-l-yellow-600 active:border-l-yellow-700 border-r-green-500 hover:border-r-green-600 active:border-r-green-700 text-white':
        status === 'pc' && !isHighContrast,
        
      'bg-slate-400 dark:bg-slate-800 border-r-orange-500 hover:border-r-orange-600 active:border-r-orange-700 text-white':
        status === 'ac' && isHighContrast,
      'bg-slate-400 dark:bg-slate-800 border-r-cyan-500 hover:border-r-cyan-600 active:border-r-cyan-700 text-white':
        status === 'ap' && isHighContrast,
      'border-l-orange-500 hover:border-l-orange-600 active:border-l-orange-700 bg-slate-400 dark:bg-slate-800 text-white':
        status === 'ca' && isHighContrast,
      'border-l-orange-500 hover:border-l-orange-600 active:border-l-orange-700 border-r-cyan-500 hover:border-r-cyan-600 active:border-r-cyan-700 text-white':
        status === 'cp' && isHighContrast,
      'border-l-orange-500 hover:border-l-orange-600 active:border-l-orange-700 border-r-orange-500 hover:border-r-orange-600 active:border-r-orange-700 text-white':
        status === 'cc' && isHighContrast,
      'border-l-cyan-500 hover:border-l-cyan-600 active:border-l-cyan-700 bg-slate-400 dark:bg-slate-800 text-white':
        status === 'pa' && isHighContrast,
      'border-l-cyan-500 hover:border-l-cyan-600 active:border-l-cyan-700 border-r-cyan-500 hover:border-r-cyan-600 active:border-r-cyan-700 text-white':
        status === 'pp' && isHighContrast,
      'border-l-cyan-500 hover:border-l-cyan-600 active:border-l-cyan-700 border-r-orange-500 hover:border-r-orange-600 active:border-r-orange-700 text-white':
        status === 'pc' && isHighContrast,
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
    height: '58px',
    borderLeftWidth: `${width*0.5}px`,
    borderRightWidth: `${width*0.5}px`,
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button style={styles} className={classes} onClick={handleClick}>
      {children || value}
    </button>
  )
}
