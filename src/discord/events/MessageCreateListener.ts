import { Message } from 'eris'
import { ChinoClient } from '../ChinoClient.platform'
import { Config } from '../config'
import { AntiInviteUtils, AntiScamUtils, BoosterUtils, CommandRunner } from '../structures'
import { Logger } from '../../Logger'


const logger = new Logger('DiscordPlatform.events.MessageCreateListener')

export default {
  name: 'messageCreate',
  run: async (client: ChinoClient, message: Message) => {
    if (message.channel.type === 1) return
    if (message.author.bot) return


    Promise.all([
      AntiInviteUtils.inChannel(client, message),
      AntiScamUtils(client, message, Config.guild_support),
      BoosterUtils.start(client, message.guild, message.member),
      CommandRunner.start(client, message)
    ]).catch((error) => logger.error(error))
  }
}
