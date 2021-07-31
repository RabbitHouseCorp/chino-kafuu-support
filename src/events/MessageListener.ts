import { Message } from "eris"
import { ChinoClient } from "../ChinoClient"
import { AntiInviteUtils, EmbedBuilder } from '../structures'
const { guild_support } = require('../config')

module.exports = {
  name: 'messageCreate',
  run: (client: ChinoClient, message: Message) => {
    if (message.channel.type === 1) return
    if (message.author.bot) return
    if (AntiInviteUtils.isInvite(message.content)) {
      message.delete().then(() => {

      })
    }
    if (message.content.indexOf(process.env.PREFIX) < 0) return
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName))

    command.run(client, message, args)
    if (command.config.dev && !process.env.DEV.trim().split(',').includes(message.author.id)) return
  }
}