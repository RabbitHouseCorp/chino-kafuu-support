const Command = require("../../structures/command")
module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: "say",
			category: "misc",
			aliases: ["falar"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		let say = args.join(" ")
		if (!args.join(" ")) return message.chinoReply("error", t("commands:say"))
		if (!message.member.hasPermission("MENTION_EVERYONE")) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.createWebhook(message.author.username, { avatar: message.author.displayAvatarURL() }).then(w => {
				w.send(args.join(" "), {
					disableEveryone: false
				})
				setTimeout(() => w.delete(), 5000)
			})
			message.channel.send(say, {
				disableEveryone: false
			})

		} else {

			if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.createWebhook(message.author.username, { avatar: message.author.displayAvatarURL() }).then(w => {
				w.send(args.join(" "), {
					disableEveryone: true
				})
				setTimeout(() => w.delete(), 5000)
			})
			message.channel.send(say, {
				disableEveryone: true
			})
		}
	}
}
