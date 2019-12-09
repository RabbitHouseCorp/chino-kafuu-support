const Command = require("../../structures/command")
module.exports = class RenameEmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: "renameemoji",
            aliases: ["renomearemoji"],
            category: "mod",
            UserPermission: ["MANAGE_EMOJIS"],
            ClientPermission: ["MANAGE_EMOJIS"]
        })
    }
    
    run({message, args, server}, t) {
        if (!args[0]) return message.chinoReply("error", "você não mencionou o emoji que deseja renomear.")
        let emoji = message.guild.emojis.get(args[0].replace(/[-._<:>Aa-zZ]/g, ""))
        if (!emoji) return message.chinoReply("error", "este emoji não se encontra neste servidor.")
        if (!args[1]) return message.chinoReply("error", "você não informou o nome que deseja colocar.")

        emoji.edit({name: args[1]}).then(emoji => {
            message.channel.send(`${emoji} **|** ${message.author}, emoji renomeado com sucesso.`)
        })
    }
}