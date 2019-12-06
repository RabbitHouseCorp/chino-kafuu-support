const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reply",
            aliases: ["r", "responder", "quote"],
            category: "Util",
            ClientPermission: ["MANAGE_MESSAGES", "MANAGE_WEBHOOK"]
        })
    }

    run({message, args, server}, t) {
        if (!args[0]) return message.chinoReply("error", t("commands:reply.args-null"))
        if (!args[1]) return message.chinoReply("error", t("commands:reply.quote-null"))
        let msg = message.channel.messages.get(args[0])
        if (!msg) return message.chinoReply("error", t("commands:reply.message-not-found"))
        if (message.channel.id !== msg.channel.id) return message.chinoReply("error", t("commands:reply.is-other-channel"))

        const embed = new MessageEmbed()
        .setAuthor(`${msg.author.tag} ${t("commands:reply.saying")}...`, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setColor("#000000")
        .setFooter(`${t("commands:reply.sended-in")} ${msg.channel.name}`, message.guild.iconURL())

        message.delete()
        message.channel.createWebhook(message.author.username, {
            avatar: message.author.displayAvatarURL()
        }).then(webhook => {
            webhook.send(`${msg.author}, ${args.slice(1).join(" ")}`, embed)
            setTimeout(() => webhook.delete(), 500)
        })
    }
}