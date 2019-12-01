const Command = require('../../structures/command')
const { Util } = require("discord.js")
module.exports = class RestrictRoleCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'restrictrole',
            category: 'mod',
            aliases: ['restringirrole'],
            UserPermission: ['MANAGE_ROLES'],
            ClientPermission: ['MANAGE_ROLES'],
            OnlyDevs: false,
            hidden: false
        })
    }

    run({message, args, server}, t) {

        const option = args[0]
        if (!option) return message.chinoReply('error', t('commands:restrictemoji.no-option'))

        const role = message.guild.roles.get(args[1].replace(/[<@&>]/g, ""))
        if (!role) return message.chinoReply('error', t('commands:roleinfo.args-null'))

        const emoji = Util.parseEmoji(args[2])
        if (!emoji) return message.chinoReply('error', t('commands:emoji.args-null'))

        if (['adicionar', 'adc', 'add', 'insert'].includes(option.toLowerCase())) {
            emoji.roles.add(role)
            message.chinoReply('success', t('commands:restrictemoji.added-successfully'))
        } else if (['remover', 'remove', 'delete', 'deletar'].includes(option.toLowerCase())) {
            emoji.roles.remove(role)
            message.chinoReply('success', t('commands:restrictemoji.removed-successfully'))
        }
    }
}