import { Message } from 'eris'
import { ChinoClient } from '../../ChinoClient.platform'

export class CommandRunner {
  static async start(client: ChinoClient, message: Message) {
    if (message.channel.id === '468880249023889408') {
      Promise.all([
        message.addReaction('👍'),
        message.addReaction('👎'),
        message.addReaction('😍')
      ]).catch((error) => console.error(error))
    }
    const prefix = process?.env?.DISCORD_BOT_PREFIX || process?.env?.BOT_PREFIX
    if (message.content.indexOf(prefix) < 0) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName))

    if (command.config.dev && !process.env.DISCORD_BOT_DEVELOPERS.trim().split(',').includes(message.author.id)) return
    command.run({ client, message, args })
  }
}
