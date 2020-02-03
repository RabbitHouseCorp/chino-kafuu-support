const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class SpotifyCommand extends Command {
	constructor(client) {
		super(client, {
			name: "spotify",
			category: "util",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false

		})
	}
	async run({ message, args, server }, t) {

		let member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, "")) || message.author
		if (!member.presence.activity) return message.chinoReply("error", t("commands:spotify.userNoListen", { member: member.username }))
		if (member.presence.activity.name !== "Spotify" && member.presence.activity.type !== "LISTENING") return message.chinoReply("error", t("commands:spotify.userNoListen", { author: message.author, member: member.username }))

		let spotifyImg = member.presence.activity.assets.largeImageURL({})
		let spotifyUrl = `https://open.spotify.com/track/${member.presence.activity.syncID}`
		let spotifyName = member.presence.activity.details
		let spotifyAlbum = member.presence.activity.assets.largeText
		let spotifyAuthor = member.presence.activity.state

		let embed = new MessageEmbed()
			.setAuthor(t("commands:spotify.userListening", { member: member.tag }), "https://cdn.discordapp.com/emojis/554334875411415107.png?v=1")
			.setColor(this.client.colors.mine)
			.setThumbnail(spotifyImg)
			.setFooter(spotifyAlbum, spotifyImg)
			.addField(t("commands:spotify.name"), spotifyName)
			.addField(t("commands:spotify.author"), spotifyAuthor)
			.addField(t("commands:spotify.album"), spotifyAlbum)
			.addField(t("commands:spotify.url"), t("commands:spotify.inUrl", { spotifyUrl: spotifyUrl }))

		message.channel.send(embed)
	}
}