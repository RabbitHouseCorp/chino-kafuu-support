import { ChinoClient } from '../ChinoClient'
import { Logger } from '../structures'

export default {
  name: 'ready',
  run: async (client: ChinoClient) => {
    const me = await client.servers.get(process.env.REVOLT_MAIN_SERVER)?.fetchMember(client.user._id)
    if (!me.nickname) {
      me.edit({
        nickname: 'Chino Kafuu (Support)'
      })
    }
    
    Logger.log('I\'m online now.')
  }
}