import { BoosterUtils, EmbedBuilder } from '../structures'
import { ChinoClient } from '../ChinoClient'
import { Guild, Member, TextChannel } from 'eris'
const { Config: { guild_support } } = require('../config')
export default {
  name: 'guildMemberUpdate',
  run: async (client: ChinoClient, guild: Guild, member: Member, oldMember: Member) => {
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
    embed.setFooter(`User ID: ${member.user.id}`)
    embed.setTimestamp(new Date())
    embed.setDescription(`${member.user.mention} **Changed they nickname**\n\n**Old nickname:** \`${oldMember.nick ?? 'None'}\`\n**New nickname:** \`${member.nick ?? 'None'}\``)

    const channel = guild.channels.get(guild_support.eventLog) as TextChannel
    if ((member.nick && !oldMember.nick) || (!member.nick && oldMember.nick)) {
      channel.createMessage(embed.build())
    }

    if (guild.id === guild_support.id && !member.pending && !member.user.bot) member.addRole(guild_support.memberRole)
    BoosterUtils.start(client, guild, member)
  }
}
