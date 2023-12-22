import { Shard } from 'eris'
import { Logger } from '../../Logger'
import { ChinoClient } from '../ChinoClient.platform'
const logger = new Logger('DiscordPlatform.events.ErrorListener')
export default {
  name: 'error',
  run: (client: ChinoClient, error: Error, shard: Shard) => {
    const uselessErrors = [
      'WebSocket was closed before the connection was established',
      'Connection reset by peer'
    ]
    if (!uselessErrors.includes(error.message)) {
      console.error(`A error on shard ${shard}: `, error)
    }
  }
}