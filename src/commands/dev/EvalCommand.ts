import { Message } from 'eris'
import { ChinoClient } from '../../ChinoClient'
import { CommandListener, EmbedBuilder } from '../../structures'
import { inspect } from 'util'
module.exports = class EvalCommand extends CommandListener {
  constructor() {
    super({ name: 'eval', dev: true })
  }

  async run(client: ChinoClient, message: Message, args: string[]) {
    try {
      let evaled = inspect(await eval(args.join(' ')), { depth: 1 })
      evaled = evaled.replace(new RegExp(`${client.token}`, 'g'), '[REDACTED]')
      if (evaled.length > 1800) evaled = `${evaled.slice(0, 1800)}...`
      evaled = `\`\`\`js\n${typeof evaled}\`\`\`\n\`\`\`js\n${evaled}\`\`\``
      await message.channel.createMessage(evaled)
    } catch (error) {
      const embed = new EmbedBuilder()
      embed.setColor('ERROR')
      embed.setTitle('Whoops, there is something wrong, check out now.')
      embed.setDescription(error.stack.slice(0, 1800))
      
      message.channel.createMessage(embed.build())
    }
  }
}