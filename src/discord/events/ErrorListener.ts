import { Shard } from 'eris'
import { Logger } from '../../Logger'
import { ChinoClient } from '../ChinoClient.platform'
const logger = new Logger('DiscordPlatform.events.ErrorListener')
export default {
  name: 'error',
  run: (client: ChinoClient, error: Error, shard: Shard) => {
    console.error(`A error on shard ${shard}: `, error)
  }
}