const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class AnnounceCommand extends Command {
	constructor(client) {
		super(client, {
			name: "announce",
			category: "mod",
			aliases: ["anunciar"],
			UserPermission: ["MANAGE_GUILD", "MENTION_EVERYONE"],
			ClientPermission: ["SEND_MESSAGES", "MENTION_EVERYONE"],
			OnlyDevs: false
		})
	} 
	run({message, args, server}, t) {
            
		let chat = message.mentions.channels.first() || message.guild.channels.get(args[0])
		if (!chat) return message.chinoReply("error", t("commands:announce.noMention"))
		let announce = args.slice(1).join(" ")
		if (!announce) return message.chinoReply("error", t("commands:announce.noMsg"))

		const embed = new MessageEmbed()
			.setColor(this.client.colors.default)
			.setAuthor(t("commands:anunciar.by"))
			.setDescription(announce)
			.setFooter(message.guild.name)

		message.reply(t("commands:announce.confirmed", {chat: chat})).then(msg => {
			setTimeout(() => {
				msg.react("✅")
			}, 500)
			setTimeout(() => {
				msg.react("🌀")
			}, 1000)
			setTimeout(() => {
				msg.react("❎")
			}, 1500)
			const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "✅", "🌀", "❎") && (u.id !== this.client.user.id && u.id === message.author.id))
			collector.on("collect", r => {
				switch (r.emoji.name) {
				case "✅":
					chat.send("@everyone", embed)
					msg.delete()
					message.chinoReply("success", t("commands:announce.send"), {disableEveryone: false})
					break
				case "🌀":
					chat.send("@here", embed)
					msg.delete()
					message.chinoReply("success", t("commands:announce.send"), {disableEveryone: false})
					break
				case "❎":
					chat.send(embed)
					msg.delete()
					message.chinoReply("success", t("commands:announce.send"))
				}
})		})
	}
}
