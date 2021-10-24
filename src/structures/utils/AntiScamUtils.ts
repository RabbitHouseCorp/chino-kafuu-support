import { Message, TextableChannel } from 'eris'
import { EmbedBuilder } from '..'
import { ChinoClient } from '../../ChinoClient'
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

export function isScam(client: ChinoClient, message: Message<TextableChannel>, guild_support: GuildSupport) {
  if (message.member.roles.includes(guild_support.staffRole)) return
  const regex = (/(?:stmeacomunnitty\.ru|steamcomminuty\.ru|steamcommunytu\.ru|steamcommunytru\.ru|steancomminyitu\.ru|steamcommuntry\.ru|steamcommunytiy\.ru|steancommunytiu\.ru|steancommunnity\.co|steancommunnity\.ru|steancommunnity\.ru|steancommunnity\.co|streammcnmuunity\.ru|streammcomuunity\.ru|steamcommunitlu\.com)/g)
  if (regex.test(message.content.toLowerCase())) {
    const guild = client.guilds.get(guild_support.id)
    const embed = new EmbedBuilder()
    embed.setColor('MODERATION')
    embed.setAuthor(`${message.author.username}#${message.author.discriminator} | Banned`, message.author.avatarURL)
    embed.setThumbnail(client.user.avatarURL)
    embed.addField('Username', `${message.author.username}#${message.author.discriminator} (\`${message.author.id}\`)`)
    embed.addField('Who punished', `${client.user.username}#${client.user.discriminator} (\`${client.user.id}\`)`)
    embed.addField('Reason', '[AUTO MOD] SPAMBOT - Sending a malicious or NSFW URL is not allowed in our guild. Get away from here!')

    message.delete()
    guild.banMember(message.author.id, 7, '[AUTO MOD] SPAMBOT - Sending a malicious or NSFW URL is not allowed in our guild. Get away from here!')
    return message.channel.createMessage(embed.build())
  }
}
