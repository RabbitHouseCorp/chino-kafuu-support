import { Guild, Member, TextChannel } from 'eris'
import { ChinoClient } from '../ChinoClient.platform'
import { EmbedBuilder } from '../structures'
import { Config } from '../config'

export default {
  name: 'guildMemberAdd',
  run: async (client: ChinoClient, guild: Guild, member: Member) => {
    if (member.user.bot) {
      if (member.roles.includes(Config.guild_support.botRole)) return
      member.addRole(Config.guild_support.botRole)
    }

    const invites = await guild.getInvites()
    const channel = guild.channels.get(Config.guild_support.welcomeChannel) as TextChannel
    const embed = new EmbedBuilder()
    embed.setColor('WELCOME')
    embed.setThumbnail(member.user.avatarURL)
    embed.setAuthor(`Welcome ${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
    embed.setFooter(`Now we have ${guild.memberCount} members`, guild.iconURL)
    embed.setDescription(`${member.user.username}#${member.user.discriminator} joined on my support server, welcome and thanks for join!\nIs important that you read the <#${Config.guild_support.infoChannel}> to know everything and avoid being punished. You need support? Then you can go into any channel of the support category.`)
    embed.addField('🐦 Twitter', 'Check out my twitter [@ChinoKafuuBot](https://twitter.com/ChinoKafuuBot)', true)
    embed.addField('<:chino_chibi:574337895838777374> Add me', `Add me in your server [clicking here](https://discord.com/oauth2/authorize?client_id=${Config.guild_support.botMain}&scope=bot%20applications.commands&permissions=8560045566)`, true)
    embed.addField('<a:chino_petpet:760564885280784405> Invite your friends', `You can invite some of your friends copying [this invite](${guild.vanityURL !== null ? `https://discord.gg/${guild.vanityURL}` : `https://discord.gg/${invites.filter((invite) => !invite.inviter.bot && !invite.temporary)[0].code}`})`, true)

    channel.edit({
      topic: `[Click to expand] ${guild.memberCount} members | Read the <#${Config.guild_support.infoChannel}> to know what is allowed or not. \n\n**INVITE TO SERVER:** If you want to know about the server invite, here it is: ${guild.vanityURL !== null ? `https://discord.gg/${guild.vanityURL}` : `https://discord.gg/${invites.filter((invite) => !invite.inviter.bot && !invite.temporary)[0].code}`}\n\n**CHINO'S INVITE:** If you want to add it to your server, here is my invite: https://discord.com/oauth2/authorize?client_id=${Config.guild_support.botMain}&scope=bot%20applications.commands&permissions=8560045566`
    })
    channel.createMessage(embed.build(member.user.mention))
  }
}