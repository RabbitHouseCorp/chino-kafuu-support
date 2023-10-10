import { Logger } from '../../Logger'
import { ChinoClient } from '../ChinoClient.platform'



const logger = new Logger('DiscordPlatform.events.DebugListener')

export default {
  name: 'debug',
  run: async (client: ChinoClient, message: any) => {
    logger.debug(message)
  }
}
