import { Message } from 'eris'
import { ChinoClient } from '../../ChinoClient'

export class CommandRunner {
  static start(client: ChinoClient, message: Message) {
    if (message.content.indexOf(process.env.PREFIX) < 0) return
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName))

    command.run(client, message, args)
    if (command.config.dev && !process.env.DEV.trim().split(',').includes(message.author.id)) return
  }
}