import { Message, TextableChannel } from 'eris'
import { EmbedBuilder } from '..'
import { ChinoClient } from '../../ChinoClient'
import axios from 'axios'
import { Logger } from '../utils/Logger'
interface GuildSupport {
  id: string
  notifyRole: string
  muteRole: string
  staffRole: string
  eventLog: string
  memberRole: string
  infoChannel: string
  welcomeChannel: string
  leaveChannel: string
  modLog: string
  botRole: string
  botMain: string
  booster: {
    boosterRole: string
    channelID: string
    donateRoleID: string
    value: number
  }
}

export default async function isScam(client: ChinoClient, message: Message<TextableChannel>, guild_support: GuildSupport) {
  if (message.member.roles.includes(guild_support.staffRole)) return
  try {
    const { data: { domains } } = await axios.get('https://raw.githubusercontent.com/nikolaischunk/discord-phishing-links/main/domain-list.json', { responseType: 'json' })
    if (domains.includes(message.content)) {
      const guild = client.guilds.get(guild_support.id)
      const embed = new EmbedBuilder()
      embed.setColor('MODERATION')
      embed.setAuthor(`${message.author.username}#${message.author.discriminator} | Banned`, message.author.avatarURL)
      embed.setThumbnail(client.user.avatarURL)
      embed.addField('Username', `${message.author.username}#${message.author.discriminator} (\`${message.author.id}\`)`)
      embed.addField('Who punished', `${client.user.username}#${client.user.discriminator} (\`${client.user.id}\`)`)
      embed.addField('Reason', '[AUTO MOD] SPAMBOT - Sending a malicious or NSFW URL is not allowed in our guild. Get away from here!')

      guild.banMember(message.author.id, 7, '[AUTO MOD] SPAMBOT - Sending a malicious or NSFW URL is not allowed in our guild. Get away from here!')
      return message.channel.createMessage(embed.build())
    }
  } catch {
    Logger.error('I can\'t access this GitHub\'s raw for an unknown reason...')
  }
}
