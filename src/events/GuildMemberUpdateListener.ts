import { Guild, Member, TextChannel } from "eris"
import { ChinoClient } from "../ChinoClient"
const { guild_support } = require('../config')
import { EmbedBuilder } from '../structures'
module.exports = {
  name: 'guildMemberUpdate',
  run: async (client: ChinoClient, guild: Guild, member: Member, oldMember: Member) => {
    if (guild.id !== guild_support.booster.guildID) return
    if (guild.premiumSubscriptionCount > 40) return
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setAuthor(`${member.user.username}#${member.user.discriminator} thank you!`, member.user.avatarURL)
    embed.setDescription(`${member.user.mention} boosted \`${guild.name}\`. Thank you very much! I added ${Number(guild_support.booster.value).toLocaleString()} yens into your account as a reward for boosting. Enjoy and call your friend to chat with us. Again: thanks.`)
    embed.setThumbnail(member.user.avatarURL)

    if (!oldMember.premiumSince && member.premiumSince) {
      if (!member.roles.includes(guild_support.booster.donateRoleID)) {
        member.addRole(guild_support.booster.donateRoleID)
      }
      let user = await client.database.users.getOrCreate(member.user.id)
      user.yens += Math.round(guild_support.booster.value)
      user.save()
      const channel = guild.channels.get(guild_support.booster.channelID) as TextChannel
      channel.createMessage(embed.build(member.user.mention))
      try {
        const dmChannel = await member.user.getDMChannel()
        dmChannel.createMessage(`Hey ${member.user.mention}, thanks for boosting the \`${guild.name}\`, I added **${Number(guild_support.booster.value).toLocaleString()}** yens into your account.`)
      } catch {
        console.error(`The direct message of ${member.user.username}#${member.user.discriminator} are closed.`)
      }
    }

    if (oldMember.premiumSince && !member.premiumSince) {
      if (member.roles.includes(guild_support.booster.donateRoleID)) {
        member.removeRole(guild_support.booster.donateRoleID)
      }
    }
  }
}