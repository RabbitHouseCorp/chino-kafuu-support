import { Guild, Member, TextChannel } from 'eris'
import { ChinoClient } from '../ChinoClient.platform'
import { Config } from '../config'
import { BoosterUtils, EmbedBuilder } from '../structures'
export default {
  name: 'guildMemberUpdate',
  run: async (client: ChinoClient, guild: Guild, member: Member, oldMember: Member) => {
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
    embed.setFooter(`User ID: ${member.user.id}`)
    embed.setTimestamp(new Date())
    embed.setDescription(`${member.user.mention} **Changed they nickname**\n\n**Old nickname:** \`${oldMember.nick ?? 'None'}\`\n**New nickname:** \`${member.nick ?? 'None'}\``)

    const channel = guild.channels.get(Config.guild_support.eventLog) as TextChannel
    if ((member.nick && !oldMember.nick) || (!member.nick && oldMember.nick)) {
      try {
        channel.createMessage(embed.build())
      } catch (error) {
        console.error(error)
      }
    }

    if (guild.id === Config.guild_support.id && !member.pending && !member.user.bot) member.addRole(Config.guild_support.memberRole)
    try {
      BoosterUtils.start(client, guild, member)
    } catch (err) {
      console.error(err)
    }
  }
}
