const Command = require("../../structures/command")
const Canvas = require("canvas")
const { MessageAttachment } = require("discord.js")
module.exports = class LicencaCommand extends Command {
	constructor (client) {
		super (client, {
			name: "license",
			category: "image",
			aliases: ["licença", "licenca"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	async run({message, args, server}, t) {

		let user = message.mentions.users.first() || this.client.users.get(args[0]) || message.author
		let canvas = await Canvas.createCanvas(1150, 893)
		let ctx = canvas.getContext("2d")
		let UserImg = await Canvas.loadImage(user.displayAvatarURL({format: "png"}))
		let Card = await Canvas.loadImage("https://media.discordapp.net/attachments/584149756469575701/597483177937731584/unknown.png?width=360&height=169")
		ctx.rotate(Math.PI * 2 / -30)
		ctx.textAlign = "center"
        
		ctx.fillStyle = message.guild.member(user)? message.guild.member(user).displayHexColor : "#450396"
		ctx.roundRect(-10, 250, 860, 550, 50, true, false)
		ctx.drawImage(Card, -10, 300, 800, 393)
		ctx.drawImage(UserImg, 428, 300, 393, 393)

		ctx.font = "small-caps bold 50px sans-serif;"
		ctx.fillStyle = "#000000"
		ctx.fillText(user.username, 190, 365, 400)
		ctx.fillStyle = "#fff"
		ctx.fillText(`${t("commands:license.licensed-for")}: ${((user.id === message.author.id) ? args.join(" ") || t("commands:license.be-cute") : (args.slice(1).join(" ") || t("commands:license.be-cute")))}`, 430, 760, 820)
		message.channel.send(new MessageAttachment(canvas.toBuffer(), "licenca.png"))
	}
}