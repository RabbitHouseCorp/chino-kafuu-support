import { Shard } from 'eris'
import { ChinoClient } from '../ChinoClient'
import { Logger } from '../utils/Logger'

export default {
  name: 'error',
  run: (client: ChinoClient, error: Error, shard: Shard) => {
    Logger.error(`A error on shard ${shard}: ${error.message}`)
  }
}