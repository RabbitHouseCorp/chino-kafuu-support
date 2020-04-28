const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
module.exports = class NowPlayingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "nowplaying",
			category: "music",
			aliases: ["playingnow", "np"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}

	async run({ message, args, server }, t) {

		if (!this.client.player.has(message.guild.id)) return message.chinoReply("error", t("commands:dj-module.queue-null"))
		if (!this.client.player.get(message.guild.id).nowPlaying) return message.chinoReply("error", t("commands:dj-module.queue-null"))
		if (!message.member.voice.channel) return message.chinoReply("error", t("commands:dj-module.channel-null"))
		if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.chinoReply("error", t("commands:dj-module.another-channel"))

		message.channel.send(t("commands:np.waiting")).then(msg => {
			let start = this.client.player.get(message.guild.id).player.state.position >= 3600000 ? moment.duration(this.client.player.get(message.guild.id).player.state.position).format("hh:mm:ss", { stopTrim: "h" }) : moment.duration(this.client.player.get(message.guild.id).player.state.position).format("mm:ss", { stopTrim: "m" })
			let end = moment.duration(this.client.player.get(message.guild.id).nowPlaying.length).format("hh:mm:ss")
			let volume = `${this.client.player.get(message.guild.id).player.state.volume}/150`
			let player = this.client.player.get(message.guild.id).nowPlaying
			let listInfo = [
				`**${t("commands:np.name")}:** \`${player.title}\``,
				`**${t("commands:np.time")}:** \`${start}/${end}\``,
				`**${t("commands:np.volume")}:** \`${volume}\``,
				`**${t("commands:np.url")}:** [${t("commands:click-here")}](${player.uri})`
			]
			const embed = new MessageEmbed()
			embed.setColor(this.client.colors.default)
			embed.setURL(player.uri)
			embed.setImage(`https://img.youtube.com/vi/${player.identifier}/maxresdefault.jpg`)
			embed.setTitle(t("commands:np.nowplaying"))
			embed.setDescription(listInfo.join("\n"))

			msg.delete()
			message.channel.send(embed)
		})
	}
}
