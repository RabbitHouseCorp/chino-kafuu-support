import { ChinoClient } from '../ChinoClient'
import { Logger } from '../structures'

export default {
  name: 'ready',
  run: (client: ChinoClient) => {
    Logger.log('I\'m online now.')
  }
}