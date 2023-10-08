import { Message } from 'revolt.io'
import { Logger } from '../../Logger'
import { ChinoClient } from '../ChinoClient.platform'
const logger = new Logger('RevoltPlatform.events.MessageListener')

export default {
  name: 'message',
  run: (client: ChinoClient, message: Message) => {
    // @todo(message = "Not Yet Implement")
  }
}
