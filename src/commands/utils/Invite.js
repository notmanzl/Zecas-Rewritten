const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            category: 'Utilidade',
            description: 'Cria um invite para o servidor',
            usage: "[Usos]",
            args: false,
            cmdoptions: [{
				name: "usos",
				type: "INTEGER",
				description: "Número de usos do invite (Default: 1/Máximo: 5)",
				required: false,
			}],
            defaultperms: false,
            cmdperms: [
                {
                    id: '568144642131099663',
                    type: 'ROLE',
                    permission: true,
                }
            ]
        });
    }

    async run(message, args) {
        if (!message.guild.rulesChannel) return message.reply("Este servidor não tem um channel de regras.");

        var welcomechannel = message.guild.rulesChannel;

        var maxuses = 1;
        if (parseInt(args[0]) <= 5) {
            maxuses = args[0];
        } else if (args[0]) {
            return message.reply("Não podes criar invites com mais de 5 usos.");
        }

        if (message.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) {
            var options = {
                maxAge: 3600,
                maxUses: maxuses,
                unique: true
            };
            welcomechannel
                .createInvite(options)
                .then(invite => message.reply(invite.url));
        } else {
            message.reply("Não tens permissão para isto.");
        }
    }

}