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
      if (evaled.match(new RegExp(client.token))) return message.channel.createMessage(`\`\`\`js\n[REDACTED]\`\`\``)
      if (evaled.length > 1800) evaled = `${evaled.slice(0, 1800)}...`
      evaled = `\`\`\`js\n${evaled}\`\`\``
      await message.channel.createMessage(evaled)
    } catch (error) {

    }
  }
}