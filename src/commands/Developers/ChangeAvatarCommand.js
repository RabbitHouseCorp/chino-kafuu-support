const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ChangeAvatarCommand extends Command {
	constructor(client) {
		super(client, {
			name: "changeavatar",
			category: "developers",
			aliases: ["alteraravatar", "setavatar"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: true,
			hidden: true,
		})
	} 
	run({message, args, server}, t) {
        
		const avatar = args[0] || message.attachments.first() ? message.attachments.first().url : undefined
		if (!avatar || avatar === undefined) return message.chinoReply("error", t("commands:changeavatar.args-null"))

		this.client.user.setAvatar(avatar).then(() => {
			const embed = new MessageEmbed()
				.setColor(this.client.colors.default)
				.setAuthor(t("commands:changeavatar.avatar"), avatar)
				.setImage(avatar)

			message.channel.send(embed)
		})
	}
}
