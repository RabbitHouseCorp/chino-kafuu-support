import { Logger } from '../../Logger'
import { ChinoClient } from '../ChinoClient.platform'
const logger = new Logger('RevoltPlatform.events.ErrorListener')

export default {
  name: 'error',
  run: (client: ChinoClient, error: Error) => {
    logger.error(`An unexpected error had happened ${error.message}`)
  }
}
