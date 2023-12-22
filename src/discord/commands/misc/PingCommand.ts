import { CommandListener } from '../../structures'
import { CommandRunOptions } from '../../structures/commands/CommandListener'
export default class PingCommand extends CommandListener {
  constructor() {
    super({ name: 'ping' })
  }

  run({ message, client }: CommandRunOptions) {
    const timestamp = Date.now() - client.uptime 
    message.channel.createMessage(`Ping: ${message.guild.shard.latency}ms\nShard: ${message.guild.shard.id}/${client.shards.size}\nUptime: <t:${(timestamp / 1000).toFixed(0)}:R>`)
  }
}