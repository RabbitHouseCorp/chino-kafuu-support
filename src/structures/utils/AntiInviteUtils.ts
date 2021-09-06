import { Invite, Message, TextChannel } from 'eris'
import { ChinoClient } from '../../ChinoClient'
import { EmbedBuilder } from './EmbedBuilder'
const { guild_support } = require('../../config')

export class AntiInviteUtils {
  public static hasInviteOnStatus(activities: object[]) {
    interface Activity {
      type: number
      state: string
    }

    return activities.some((activity: Activity) => (activity.type === 4 && this.isInvite(activity.state)) || (activity.type === 0 && this.isInvite(activity.state)))
  }

  public static isInvite(text: string) {
    if ((/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(text)) {
      const textReplace_1: string = text
        .replace(/(https:\/\/)?(http:\/\/)/g, '')
        .replace(/(discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io)/g, '')
        .replace(/(\/)/g, '')

      if (textReplace_1.length < 1) return false
      if ((/(\/+(\s+[a-z0-9-.]+)?.+)/g).test(text)) {
        return true
      } else {
        return false
      }
    }

    return (/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(text)
  }

  static async inChannel(client: ChinoClient, message: Message) {
    if (!this.isInvite(message.content)) return
    const channel = client.getChannel(guild_support.modLog) as TextChannel
    if (message.member.roles.includes(guild_support.staffRole)) return
    const guildInvite = await message.guild.getInvites()
    const messageInvite = message.content
      .replace(/(https:\/\/|http:\/\/)/, '')
      .replace(/(discord\.gg|discord\.com\/invite|discordapp\.com\/invite|discord\.me|discord\.io)/, '')
      .replace('/', '')
    if (guildInvite.find((invite: Invite) => invite.code === messageInvite) || (message.guild.vanityURL !== null && message.guild.vanityURL === messageInvite)) return
    const embed = new EmbedBuilder()
    embed.setColor('MODERATION')
    embed.setAuthor(`${message.author.username}#${message.author.discriminator} | Warned`, message.author.avatarURL)
    embed.setThumbnail(client.user.avatarURL)
    embed.addField('Username', `${message.author.username}#${message.author.discriminator} (\`${message.author.id}\`)`)
    embed.addField('Who punished', `${client.user.username}#${client.user.discriminator} (\`${client.user.id}\`)`)
    embed.addField('Reason', '[AUTO MOD] ADVERSITING - Adversiting others Discord server in public chat.')
    message.delete()
    message.channel.createMessage(`Hey ${message.author.mention}! Stop right there. You can't adversiting others Discord guild here.`)
    return channel.createMessage(embed.build())
  }
}