import { ChinoClient } from '../../ChinoClient'
import { Guild, Member, TextChannel } from 'eris'
const { guild_support } = require('../../config')
import { EmbedBuilder } from '../../structures'
export class BoosterUtils {
  static async start(client: ChinoClient, guild: Guild, member: Member) {
    if (guild.id !== guild_support.id) return
    if (guild.premiumSubscriptionCount > 40) return

    if (member.premiumSince !== null) {
      if (member.roles.includes(guild_support.booster.donateRoleID)) return
      const embed = new EmbedBuilder()
      embed.setColor('DEFAULT')
      embed.setAuthor(`${member.user.username}#${member.user.discriminator} thank you!`, member.user.avatarURL)
      embed.setDescription(`${member.user.mention} boosted \`${guild.name}\`. Thank you very much! I added ${Number(guild_support.booster.value).toLocaleString()} yens into your account as a reward for boosting. Enjoy and call your friend to chat with us. Again: thanks.`)
      embed.setThumbnail(member.user.avatarURL)
      let user = await client.database.users.getOrCreate(member.user.id)
      user.yens += Math.round(guild_support.booster.value)
      user.save()
      const channel = guild.channels.get(guild_support.booster.channelID) as TextChannel
      channel.createMessage(embed.build(member.user.mention))
      member.addRole(guild_support.booster.donateRoleID)
      try {
        const dmChannel = await member.user.getDMChannel()
        dmChannel.createMessage(`Hey ${member.user.mention}, thanks for boosting the \`${guild.name}\`, I added **${Number(guild_support.booster.value).toLocaleString()}** yens into your account.`)
      } catch {
        console.error(`The direct message of ${member.user.username}#${member.user.discriminator} are closed.`)
      }
    } else {
      if (member.roles.includes(guild_support.booster.donateRoleID)) return
      member.removeRole(guild_support.booster.donateRoleID)
    }
  }
}