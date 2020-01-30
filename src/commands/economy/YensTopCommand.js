const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class YensTopCommand extends Command {
	constructor (client) {
		super(client, {
			name: "yenstop",
			aliases: ["topyens", "topyen", "yentop"],
			category: "economy",
			OnlyDevs: true
		})
	}

	async run({message, args, server}, t) {
		let usuario = await this.client.database.Users.find({})
		let number = 0
		let users = []
		let members = await this.client.shardManager
		usuario.filter(async user => await members.getUsers(user._id)).forEach(async user => {
			let us = await members.getUsers(user._id)
			users.push({
				tag: us.tag,
				yens: user.yens
			})
		})
		users.sort(function (a, b) {
			return b.yens - a.yens
		})
		let desc = users.map(a => `**${++number} -** \`${a.tag}\` - *yens: ${Number(a.yens).toLocaleString()}*`).slice(0, 15)
		let embed = new MessageEmbed()
		.setColor(this.client.colors.default)
		.setTitle(`As ${desc.length} pessoas com mais yens`)
		.setDescription(desc)
		.setThumbnail(this.client.user.displayAvatarURL())

		message.channel.send(embed)
	}
}