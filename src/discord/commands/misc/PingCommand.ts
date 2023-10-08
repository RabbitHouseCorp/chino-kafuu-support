import { CommandListener } from '../../structures'
import { CommandRunOptions } from '../../structures/commands/CommandListener'
export default class PingCommand extends CommandListener {
  constructor() {
    super({ name: 'ping' })
  }

  run({ message, client }: CommandRunOptions) {
    message.channel.createMessage(`Ping: ${message.guild.shard.latency}ms\nShard: ${message.guild.shard.id}/${client.shards.size}`)
  }
}