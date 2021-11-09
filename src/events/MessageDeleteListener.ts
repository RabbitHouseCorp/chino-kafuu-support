import { Message, TextChannel } from 'eris'
import { ChinoClient } from '../ChinoClient'
import { EmbedBuilder } from '../structures'
const { Config: { guild_support } } = require('../config')

export default {
  name: 'messageDelete',
  run: (client: ChinoClient, message: Message) => {
    if (!message.author) return
    const embed = new EmbedBuilder()
    embed.setColor('ERROR')
    embed.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
    embed.setFooter(`User ID: ${message.author.id}`)
    embed.setTimestamp(new Date())
    embed.setDescription(`${message.author.mention} **deleted a message**\n\n**Text channel:** ${message.channel.mention}`)
    embed.addField('Deleted message', `\`\`\`${message.content.slice(0, 1000)}\`\`\``)

    const channel = message.guild.channels.get(guild_support.eventLog) as TextChannel
    if (!message.content) return
    channel.createMessage(embed.build())
  }
}