import { Message } from 'eris'
import { ChinoClient } from '../../ChinoClient'

export class CommandRunner {
  static async start(client: ChinoClient, message: Message) {
    if (message.channel.id === '468880249023889408') {
      await message.addReaction('👍')
      await message.addReaction('👎')
      await message.addReaction('😍')
    }
    if (message.content.indexOf(process.env.PREFIX) < 0) return
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName))
    
    if (command.config.dev && !process.env.DEV.trim().split(',').includes(message.author.id)) return
    command.run(client, message, args)
  }
}
