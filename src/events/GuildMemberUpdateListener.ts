import { BoosterUtils } from '../structures'
import { ChinoClient } from '../ChinoClient'
import { Guild, Member } from 'eris'
const { guild_support } = require('../config')
module.exports = {
  name: 'guildMemberUpdate',
  run: async (client: ChinoClient, guild: Guild, member: Member, oldMember: Member) => {
    if (guild.id === guild_support.id && !member.pending && !member.user.bot) member.addRole(guild_support.memberRole)
    BoosterUtils.start(client, guild, member)
  }
}