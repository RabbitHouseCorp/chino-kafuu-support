import { BoosterUtils } from '../structures'
import { ChinoClient } from '../ChinoClient'
import { Guild, Member } from 'eris'
module.exports = {
  name: 'guildMemberUpdate',
  run: async (client: ChinoClient, guild: Guild, member: Member, oldMember: Member) => {
    BoosterUtils.start(client, guild, member)
  }
}