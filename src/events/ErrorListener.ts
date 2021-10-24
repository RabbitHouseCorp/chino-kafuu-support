import { Shard } from 'eris'
import { ChinoClient } from '../ChinoClient'

export default {
  name: 'error',
  run: (client: ChinoClient, error: Error, shard: Shard) => {
    console.log(`A error on shard ${shard}: ${error.message}`)
  }
}