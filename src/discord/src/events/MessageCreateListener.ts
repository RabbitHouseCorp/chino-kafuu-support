import { Message } from 'eris'
import { ChinoClient } from '../ChinoClient'
import { AntiInviteUtils, AntiScamUtils, BoosterUtils, CommandRunner } from '../structures'
import { Config } from '../config'

export default {
  name: 'messageCreate',
  run: async (client: ChinoClient, message: Message) => {
    if (message.channel.type === 1) return
    if (message.author.bot) return
    AntiInviteUtils.inChannel(client, message)
    await AntiScamUtils(client, message, Config.guild_support)
    BoosterUtils.start(client, message.guild, message.member)
    CommandRunner.start(client, message)
  }
}
