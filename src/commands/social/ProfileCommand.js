const { MessageEmbed } = require("discord.js")
const Command = require("../../structures/command")
module.exports = class ProfileCommand extends Command {
	constructor(client) {
		super(client, {
			name: "profile",
			aliases: ["perfil"],
			category: "social",
			ClientPermission: ["EMBED_LINKS", "ADD_REACTIONS"]
		})
	}

	async run({ message, args, server }, t) {
		let member = args[0] ? await this.client.users.fetch(args[0].replace(/[<@!>]/g, "")) : message.author
		let user = await this.client.database.Users.findById(member.id)
		if (!user) {
			new this.client.database.Users({
				_id: member.id
			}).save()
		}
		let userAvatar = member.avatar.startsWith("a_") ? member.displayAvatarURL({ format: "gif" }) : member.displayAvatarURL({ format: "webp" })
		if (user.blacklist) {
			const bannedEmbed = new MessageEmbed()
			bannedEmbed.setColor(this.client.colors.default)
			bannedEmbed.setAuthor(`${member.tag} está banido.`, userAvatar)
			bannedEmbed.setThumbnail(userAvatar)
			bannedEmbed.addField("Motivo", user.blacklistReason)

			message.channel.send(bannedEmbed)
			return
		}
		if (args[0] === "color") {
			if (!args[1]) return message.chinoReply("error", t("commands:profile.colors.args-null"))
			if (!args[1].startsWith("#")) return message.chinoReply("error", t("commands:profile.colors.hex"))
			const colorEmbed = new MessageEmbed()
			colorEmbed.setColor(`${args[1]}`)
			colorEmbed.setAuthor(message.author.tag, userAvatar)
			colorEmbed.setDescription(t("commands:profile.colors.this-color"))

			message.channel.send(colorEmbed).then(msg => {
				msg.react("success:577973168342302771")
				setTimeout(() => msg.react("error:577973245391667200"), 1000)

				const collector = msg.createReactionCollector((reaction, user) => (reaction.emoji.name === "success", "error") && (user.id !== this.client.user.id && user.id === message.author.id))
				collector.on("collect", r => {
					switch (r.emoji.name) {
						case "success":
							user.profileColor = args[1]
							user.yens -= Number(1000)
							user.save().then(() => {
								message.chinoReply("success", t("commands:profile.colors.success", { member: member.toString(), value: Number(realValue[0]).toLocaleString() }))
								msg.delete()
							})
							break;
						case "error":
							message.chinoReply("error", t("commands:profile.colors.cancel"))
							msg.delete()
							break;
					}
				})
			})
			return
		}

		let marryWith = await this.client.users.fetch(user.marryWith)
		let description = [
			`${this.client.emotes.sharo_excited} **${t("commands:profile.aboutme")} »** *\`${user.aboutme}\`*`,
			`${this.client.emotes.rize_smile} **${t("commands:profile.user-name")} »** *\`${member.tag}\`*`,
			`${this.client.emotes.chino_peek} **${t("commands:profile.user-id")} »** *\`${member.id}\`*`,
			`${this.client.emotes.cocoa_carresing_tippy} **${t("commands:profile.marred")} »** *\`${user.isMarry ? marryWith.tag : t("commands:with-nobody")}\`*`,
			`${this.client.emotes.yen} **${t("commands:profile.yens")} »** *\`${Number(user.yens).toLocaleString()}\`*`,
			`${this.client.emotes.sharo_hug_chino} **${t("commands:profile.rep")} »** *\`${user.rep}\`*`
		]
		const embed = new MessageEmbed()
		embed.setColor(user.profileColor)
		embed.setAuthor(t("commands:profile.title", { member: member.tag }), member.displayAvatarURL({ format }))
		embed.setThumbnail(member.displayAvatarURL({ format }))
		embed.setDescription(description.join("\n\n"))

		message.channel.send(embed)
	}
}