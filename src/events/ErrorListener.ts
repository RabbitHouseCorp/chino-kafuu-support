import { Shard } from 'eris'
import { ChinoClient } from '../ChinoClient'

module.exports = {
  name: 'error',
  run: (client: ChinoClient, error: Error, shard: Shard) => {
    console.log(`A error on shard ${shard.id}: ${error.message}`)
  }
}