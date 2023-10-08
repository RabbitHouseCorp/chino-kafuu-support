import { CommandListener } from '../../structures'
import { CommandRunOptions } from '../../structures/commands/CommandListener'
import { Config } from '../../config'
export default class NotifyCommand extends CommandListener {
  constructor() {
    super({ name: 'notify', aliases: ['notificar'] })
  }

  run({ message }: CommandRunOptions) {
    if (message.member.roles.includes(Config.guild_support.notifyRole)) {
      message.member.removeRole(Config.guild_support.notifyRole).then(() => {
        message.channel.createMessage('Ok then, you will no longer receive new updates about me. Sorry if my staff team disturb you with too many mentions...')
      })
    } else {
      message.member.addRole(Config.guild_support.notifyRole).then(() => {
        message.channel.createMessage('I\'m happy to see that you want receive more updates notifications about me, I hope you enjoy and don\'t get disturbed.')
      })
    }
  }
}