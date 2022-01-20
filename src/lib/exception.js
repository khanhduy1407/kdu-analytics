import query from 'lib/query'
import config from '../config'

const exception = (error, fatal = false) => {
  query('send', 'exception', {
    exDescription: error,
    exFatal: fatal
  })
}

export const autotracking = Kdu => {
  if (!config.autoTracking.exception) {
    return
  }

  // Handler errors outside Kdu components
  window.addEventListener('error', error => {
    exception(error.message)
  })

  // Save the Kdu.config.errorHandler if one already registered
  const oldErrorHandler = Kdu.config.errorHandler

  // Handles errors inside component life
  Kdu.config.errorHandler = (error, vm, info) => {
    exception(error.message)

    if (config.autoTracking.exceptionLogs) {
      console.error(`[kdu-analytics] Error in ${info}: ${error.message}`)
      console.error(error)
    }

    if (typeof oldErrorHandler === 'function') {
      oldErrorHandler.call(this, error, vm, info)
    }
  }
}

export default exception
