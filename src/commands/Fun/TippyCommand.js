const Command = require("../../structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
module.exports = class PatCommand extends Command {
	constructor (client) {
		super (client, {
			name: "tippy",
			category: "fun",
			aliases:["piadas"],
			UserPermission: null,
			ClientPermission: ["MANAGE_WEBHOOK"],
			OnlyDevs: false,
			hidden: false
		})
	}
	run({message, args, server}, t) {
        
		let tippy = this.client.apis.piadas
		let piada = tippy[Math.floor(Math.random() * tippy.length)]
		message.channel.createWebhook("Tippy", "https://giffiles.alphacoders.com/184/184302.gif").then(wh => {
			wh.send(piada)
			wh.delete()
		})
	}
}