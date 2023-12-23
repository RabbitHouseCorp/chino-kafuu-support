import { Logger } from '../../Logger'
import { ChinoClient } from '../ChinoClient.platform'



const logger = new Logger('DiscordPlatform.events.DebugListener')

export default {
  name: 'debug',
  run: async (_: ChinoClient, message: any, id: any) => {
    let data
    try {
      data = JSON.parse(message)
    } catch {
      data = message
    }
    logger.debug('', undefined, data, id ? `(id: ${id})` : '')
  }
}
