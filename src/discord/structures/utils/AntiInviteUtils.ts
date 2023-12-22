import { Invite, InviteChannel, Message, TextChannel } from 'eris'
import { ChinoClient } from '../../ChinoClient.platform'
import { Config } from '../../config'
import { EmbedBuilder } from './EmbedBuilder'

const maxCacheTime = 20 * 1000
let invites: Invite<"withMetadata", InviteChannel>[] = []
let time: number | null = null
export class AntiInviteUtils {
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
    if (message.guildID !== Config.guild_support.id) return
    if (!this.isInvite(message.content)) return
    const channel = client.getChannel(Config.guild_support.modLog) as TextChannel
    if (message.member.roles.includes(Config.guild_support.staffRole)) return
    let guildInvite: Invite<"withMetadata", InviteChannel>[]
    if (time - (Date.now() + maxCacheTime) > 0 || invites.length === 0) {
      guildInvite = await message.guild.getInvites()
      time = Date.now() + maxCacheTime
      invites.push(...guildInvite)
    } else {
      guildInvite = invites
    }
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
    Promise.all([
      message.delete(),
      message.channel.createMessage(`Hey ${message.author.mention}! Stop right there. You can't adversiting others Discord guild here.`),
      channel.createMessage(embed.build())
    ]).catch((error) => console.error(error))
  }
}