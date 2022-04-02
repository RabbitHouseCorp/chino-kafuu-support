import { Member } from 'eris'
import { ChinoClient } from '../ChinoClient'
import { AntiInviteUtils } from '../structures'
import { Config } from '../config'

export default {
  name: 'presenceUpdate',
  run: async (client: ChinoClient, member: Member, oldPresence: object) => {
    if (member.guild.id !== Config.guild_support.id) return
    if (member.user.bot) return
    const activities = member.activities
    const hasInvStatus = AntiInviteUtils.hasInviteOnStatus(activities)
    const hasMuteRole = member.roles.includes(Config.guild_support.muteRole)
    if (hasInvStatus && !hasMuteRole) {
      if (member.roles.includes(Config.guild_support.staffRole)) return
      const guildInvite = await client.getGuildInvites(member.guild.id)
      const invite = activities.find(status => status.type === 4 || status.type === 0).state
        .replace(/(https:\/\/|http:\/\/)/, '')
        .replace(/(discord\.gg|discord\.com\/invite|discordapp\.com\/invite|discord\.me|discord\.io)/, '')
        .replace('/', '')
      if (guildInvite.find(({ code }) => code === invite) || (member.guild.vanityURL !== null && member.guild.vanityURL === invite)) {
        if (hasMuteRole) member.removeRole(Config.guild_support.muteRole)
        return
      }
      if (member.pending) return
      member.addRole(Config.guild_support.muteRole)
    } else if (hasMuteRole && !hasInvStatus) {
      member.removeRole(Config.guild_support.muteRole)
    }
  }
}