import { Config } from '../../config'
import { CommandListener } from '../../structures'
import { CommandRunOptions } from '../../structures/commands/CommandListener'
export default class NotifyCommand extends CommandListener {
  constructor() {
    super({ name: 'notify', aliases: ['notificar'] })
  }

  async run({ message }: CommandRunOptions) {
    let error = false
    if (!Config.guild_support.notifyRole && typeof Config.guild_support.notifyRole === 'string')
      return message.channel.createMessage('The notification role is not configured, contact a staff')
    if (message.member.roles.includes(Config.guild_support.notifyRole)) {
      message.member.removeRole(Config.guild_support.notifyRole)
        .then(() => message.channel.createMessage('Ok then, you will no longer receive new updates about me. Sorry if my staff team disturb you with too many mentions...'))
        .catch((err) => {
          message.channel.createMessage('Something went wrong. Try contacting a server staff member.')
          console.error(err)
        })
    } else {
      message.member.addRole(Config.guild_support.notifyRole)
        .then(() => message.channel.createMessage('I\'m happy to see that you want receive more updates notifications about me, I hope you enjoy and don\'t get disturbed.'))
        .catch((err) => {
          message.channel.createMessage('Something went wrong. Try contacting a server staff member.')
          console.log(err)
        })
    }
  }
}