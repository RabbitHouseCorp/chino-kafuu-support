import { Message } from 'eris'
import { ChinoClient } from '../../ChinoClient'

export class CommandRunner {
  static async start(client: ChinoClient, message: Message) {
    if (message.channel.id === '468880249023889408') {
      await message.addReaction('👍')
      await message.addReaction('👎')
      await message.addReaction('😍')
    }
    if (message.content.indexOf(process.env.DISCORD_BOT_PREFIX) < 0) return
    const args = message.content.slice(process.env.DISCORD_BOT_PREFIX.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName))

    if (command.config.dev && !process.env.DISCORD_BOT_DEVELOPERS.trim().split(',').includes(message.author.id)) return
    command.run({ client, message, args })
  }
}
