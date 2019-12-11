const Command = require("../../structures/command")
const request = require("request")
module.exports = class TranslateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "translate",
            aliases: ["traduzir"],
            category: "util"
        })
    }

    async run({message, args, server}, t) {
        
        if (!args[1]) return message.chinoReply("error", "você não argumentou algo para mim traduzir.")
        let url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${args[0]}&dt=t&q=${args.slice(1).join("+")}&ie=UTF-8&oe=UTF-8`
        request(url, function(err, response, body) {
            if (err) {
                args[0] = "en"
            }
            let translate = body.match(/^\[\[\[".+?",/)[0]
            translate = translate.substring(4, translate.length - 2)
            message.chinoReply("map", translate)
        })
    }
}