import { Message } from 'eris'
import { ChinoClient } from '../../ChinoClient'
import { CommandListener } from '../../structures'
module.exports = class PingCommand extends CommandListener {
  constructor() {
    super({ name: 'ping' })
  }

  run(client: ChinoClient, message: Message, args: string[]) {
    message.channel.createMessage(`Ping: ${message.guild.shard.latency}ms\nShard: ${message.guild.shard.id}/${client.shards.size}`)
  }
}