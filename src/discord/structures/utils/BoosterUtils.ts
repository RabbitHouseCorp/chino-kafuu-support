import { Guild, Member, TextChannel } from 'eris'
import { ChinoClient } from '../../ChinoClient.platform'
import { Config } from '../../config'
import { EmbedBuilder } from '../../structures'
export class BoosterUtils {
  static async start(client: ChinoClient, guild: Guild, member: Member) {
    if (guild.id !== Config.guild_support.id) return

    if (member.premiumSince !== null && member.roles.includes(Config.guild_support.booster.boosterRole)) {
      if (guild.premiumSubscriptionCount > 25) return
      if (member.roles.includes(Config.guild_support.booster.donateRoleID)) return
      const embed = new EmbedBuilder()
      embed.setColor('DEFAULT')
      embed.setAuthor(`${member.user.username}#${member.user.discriminator} thank you!`, member.user.avatarURL)
      embed.setDescription(`${member.user.mention} boosted \`${guild.name}\`. Thank you very much! I added ${Number(Config.guild_support.booster.value).toLocaleString()} yens into your account as a reward for boosting. Enjoy and call your friend to chat with us. Again: thanks.`)
      embed.setThumbnail(member.user.avatarURL)
      let user = await client.database.users.getOrCreate(member.user.id, {})
      user.yens += Math.round(Config.guild_support.booster.value)
      const channel = guild.channels.get(Config.guild_support.booster.channelID) as TextChannel
      Promise.all([
        user.save(),
        channel.createMessage(embed.build(member.user.mention)),
        member.addRole(Config.guild_support.booster.donateRoleID)
      ]).catch((error) => console.error(error))
      try {
        const dmChannel = await member.user.getDMChannel()
        dmChannel.createMessage(`Hey ${member.user.mention}, thanks for boosting the \`${guild.name}\`, I added **${Number(Config.guild_support.booster.value).toLocaleString()}** yens into your account.`)
      } catch {
        console.error(`The direct message of ${member.user.username}#${member.user.discriminator} are closed.`)
      }
    } else {
      if (member.roles.includes(Config.guild_support.booster.donateRoleID)) {
        member.removeRole(Config.guild_support.booster.donateRoleID)
      }
    }
  }
}
