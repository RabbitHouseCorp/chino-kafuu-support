import { Message, TextChannel } from 'eris'
import { ChinoClient } from '../ChinoClient'
import { EmbedBuilder } from '../structures'
const { guild_support } = require('../config')

module.exports = {
  name: 'messageUpdate',
  run: (client: ChinoClient, message: Message, oldMessage: Message) => {
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
    embed.setFooter(`User ID: ${message.author.id}`)
    embed.setTimestamp(new Date())
    embed.setDescription(`${message.author.mention} **edited a message**\n\n**Text channel:** ${message.channel.mention}`)
    embed.addField('Old message', `\`\`\`${oldMessage.content.slice(0, 1000)}\`\`\``)
    embed.addField('New message', `\`\`\`${message.content.slice(0, 1000)}\`\`\``)

    if (oldMessage.content === message.content) return
    const channel = message.guild.channels.get(guild_support.eventLog) as TextChannel
    channel.createMessage(embed.build())
  }
}