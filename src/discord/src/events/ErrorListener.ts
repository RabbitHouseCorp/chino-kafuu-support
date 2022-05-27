import { Shard } from 'eris'
import { ChinoClient } from '../ChinoClient'
import { Logger } from '../structures/utils/Logger'

export default {
  name: 'error',
  run: (client: ChinoClient, error: Error, shard: Shard) => {
    const uselessErrors = [
      'WebSocket was closed before the connection was established',
      'Connection reset by peer'
    ]
    if (!uselessErrors.includes(error.message)) {
      Logger.error(`A error on shard ${shard}: ${error.message}`)
    }
  }
}