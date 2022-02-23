export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!

export const WIN_MESSAGES = ['¡Buen Trabajo!', 'Increible', '¡Bien hecho!']
export const GAME_COPIED_MESSAGE = 'Copiado al portapapeles'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'No hay suficientes letras'
export const WORD_NOT_FOUND_MESSAGE = 'Palabra no encontrada'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const CORRECT_WORD_MESSAGES = (solutionLeft: string, solutionRight: string) =>
  `Las palabras eran ${solutionLeft} y ${solutionRight}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const ENTER_TEXT = 'Enviar'
export const DELETE_TEXT = 'Borrar'
export const STATISTICS_TITLE = 'Estadísticas'
export const GUESS_DISTRIBUTION_TEXT = 'Distribución'
export const NEW_WORD_TEXT = 'Nuevo puzzle en'
export const SHARE_TEXT = 'Compartir'
export const TOTAL_TRIES_TEXT = 'Jugadas'
export const SUCCESS_RATE_TEXT = 'Tasa de éxito'
export const CURRENT_STREAK_TEXT = 'Racha actual'
export const BEST_STREAK_TEXT = 'Mejor racha'
