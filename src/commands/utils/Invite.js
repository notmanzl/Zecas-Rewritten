const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            category: 'Utilidade',
            description: 'Cria um invite para o servidor',
            usage: "[número de usos]"
        });
    }

    async run(message, args) {
        if (!message.guild.rulesChannel) return message.channel.send("Este servidor não tem um channel de regras.");

        var welcomechannel = message.guild.rulesChannel;

        var maxuses = 1;
        if (parseInt(args[0]) <= 5) {
            maxuses = args[0];
        } else {
            return message.channel.send("Não podes criar invites com mais de 5 usos.");
        }

        if (message.member.hasPermission('MANAGE_EMOJIS')) {
            var options = {
                maxAge: 3600,
                maxUses: maxuses,
                unique: true
            };
            welcomechannel
                .createInvite(options)
                .then(invite => message.reply(invite.url));
        } else {
            message.channel.send("Não tens permissão para isto.");
        }
    }

}