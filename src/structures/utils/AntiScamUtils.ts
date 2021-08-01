import { Message, TextableChannel } from 'eris'
import { ChinoClient } from '../../ChinoClient'
import { EmbedBuilder } from '..'
export class AntiScamUtils {
  static isScam(client: ChinoClient, message: Message<TextableChannel>, guild_support: any) {
    if (message.member.roles.includes(guild_support.staffRole))
      if ((/(?:stmeacomunnitty\.ru)/g).test(message.content.toLowerCase())) {
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
}