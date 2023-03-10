import { ChinoClient } from '../ChinoClient'
import { Logger } from '../structures'

export default {
  name: 'error',
  run: (client: ChinoClient, error: Error) => {
    Logger.error(`An unexpected error had happened ${error.message}`)
  }
}
