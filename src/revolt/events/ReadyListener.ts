import {Logger} from '../../Logger'
import {ChinoClient} from '../ChinoClient.platform'
import { Status } from 'revolt.io'

const logger = new Logger('RevoltPlatform.events.ReadyListener')

export default {
  name: 'ready',
  run: async (client: ChinoClient) => {
    const status = [
      'Trying to give you support.',
      'Moderating my support server!',
      'If you need support or have a question, please, go to the #support channel.',
      'Miracle Girls Festival',
      'Chimame Chronicle',
    ]

//    setInterval(() => {
//      const game = status[Math.round(Math.random() * status.length)]
//      client.user.setStatus(game, Status.Busy)
//    }, 15 * 1000)
    
    logger.log('I\'m online now.')
  }
}
