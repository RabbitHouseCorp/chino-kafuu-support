const Command = require("../../structures/command")
module.exports = class JanKePonCommand extends Command {
    constructor(client) {
        super(client, {
            name: "jankenpon",
            aliases: ["ppt"],
            category: "games"
        })
    }

    async run({ message, args, server }, t) {
        if (!args[0]) return message.chinoReply("error", "o que você escolhe?")
        let user = await this.client.database.Users.findById(message.author.id)
        let options = ["pedra", "papel", "tesoura"]
        if (!options.includes(args[0])) return message.chinoReply("error", "você só pode escolher entre `pedra`, `papel` ou `tesoura`")
        let clientChoice = options[Math.floor(Math.random() * options.length)]
        let me = args[0].toLowerCase()
        let result
        let emoji
        let value = Math.floor(Math.random() * 1500)
        let userWinOption = (
            me === "pedra" && clientChoice === "tesoura" ||
            me === "tesoura" && clientChoice === "papel" ||
            me === "papel" && clientChoice === "pedra"
        )
        let userLoserOption = (
            clientChoice === "pedra" && me === "tesoura" ||
            clientChoice === "tesoura" && me === "papel" ||
            clientChoice === "papel" && me === "pedra"
        )
        if (userWinOption) {
            emoji = "chino_sad"
            result = `você escolheu \`${me}\` e eu escolhi \`${clientChoice}\`, parabéns, parece que você ganhou, estou depositando \`${Number(value).toLocaleString()}\` yens na sua conta.`
            user.yens += value
            user.save()
        } else if (me === clientChoice) {
            emoji = "chino_thiking"
            result = "parece que empatamos! Ninguém ganhou ou perdeu."
        } else if (userLoserOption) {
            emoji = "chino_kek"
            result = `você escolheu \`${me}\` e eu escolhi \`${clientChoice}\`, parece que eu ganhei, yay, estou tirando \`${Number(value).toLocaleString()}\` yens da sua conta, ok?`
            user.yens -= value
            user.save()
        }

        message.channel.send("Jan ken pon").then(msg => {
            setTimeout(() => {
                msg.delete()
                message.chinoReply(emoji, result)
            }, 2000)
        })
    }
}