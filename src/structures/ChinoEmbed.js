const { MessageEmbed } = require("discord.js")

module.exports = class ChinoEmbed extends MessageEmbed {
	constructor(data = {}) {
		super(data)
		this.setColor("#6b8dff")
	}
}