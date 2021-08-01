import { Message } from 'eris'
import { ChinoClient } from '../ChinoClient'
import { AntiInviteUtils, AntiScamUtils, BoosterUtils, CommandRunner } from '../structures'
const { guild_support } = require('../config')

module.exports = {
  name: 'messageCreate',
  run: (client: ChinoClient, message: Message) => {
    if (message.channel.type === 1) return
    if (message.author.bot) return
    AntiInviteUtils.inChannel(client, message)
    AntiScamUtils.isScam(client, message, guild_support)
    BoosterUtils.start(client, client.guilds.get(message.guildID), message.member)
    CommandRunner.start(client, message)
  }
}