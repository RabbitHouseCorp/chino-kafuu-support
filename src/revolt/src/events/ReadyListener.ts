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
    const status = [
      'Trying to give you support.',
      'Moderating my support server!',
      'If you need support or have a question, please, go to the #support channel.',
      'Miracle Girls Festival',
      'Chimame Chronicle',
    ]

    /* setInterval(() => {
      const game = status[Math.round(Math.random() * status.length)]
      client.user.update({ status: { text: game, presence: 'Busy' } })
    }, 15000) */
    
    Logger.log('I\'m online now.')
  }
}
