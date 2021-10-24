import { Guild, Member, TextChannel } from 'eris'
import { ChinoClient } from '../ChinoClient'
import { EmbedBuilder } from '../structures'
const { guild_support } = require('../config')
export default {
  name: 'guildMemberRemove',
  run: (client: ChinoClient, guild: Guild, member: Member) => {
    const channel = guild.channels.get(guild_support.leaveChannel) as TextChannel
    const embed = new EmbedBuilder()
    embed.setColor('LEAVE')
    embed.setThumbnail(member.user.avatarURL)
    embed.setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
    embed.setFooter(`Now we have ${guild.memberCount} members`, guild.iconURL)
    embed.addField(`${member.user.username}#${member.user.discriminator} left from the guild`, `See you later **${member.user.username}#${member.user.discriminator}**, we will be waiting for you here in **${guild.name}**, I hope you come back!\n\nWith ${member.user.username} leaving, we now have ${guild.memberCount} people in ${guild.name}.`)

    channel.edit({
      topic: `[Click to expand] ${guild.memberCount} members | Read the <#${guild_support.infoChannel}> to know what is allowed or not. \n\n**INVITE TO SERVER:** If you want to know about the server invite, here it is: ${guild.vanityURL !== null ? `https://discord.gg/${guild.vanityURL}` : guild.getInvites().then((invites) => `https://discord.gg/${invites[0].code}`)}\n\n**CHINO'S INVITE:** If you want to add it to your server, here is my invite: https://discord.com/oauth2/authorize?client_id=${guild_support.botMain}&scope=bot%20applications.commands&permissions=8560045566`
    })
    channel.createMessage(embed.build())
  }
}