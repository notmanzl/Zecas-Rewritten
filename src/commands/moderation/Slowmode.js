const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['slow', 'sm'],
            category: 'Moderação',
            description: 'Ativa ou desativa o Slowmode',
            usage: '[Tempo]',
            cmdoptions: [{
				name: "tempo",
				type: "INTEGER",
				description: "Tempo de slowmode (em segundos) (Default: 0)",
				required: false,
			}],
            defaultperms: false,
            cmdperms: [
                {
                    id: '510848401169186816',
                    type: 'ROLE',
                    permission: true,
                }
            ]
        });
    }

    async run(message, args) {
        const channel = message.channel;
        if (message.member.permissions.has("MANAGE_CHANNELS")) { 
            if (args.length) {
                if (isNaN(args[0])) {
                    message.reply("Parâmetro inválido.");
                    return;
                } else {
                    channel.setRateLimitPerUser(args[0],message.member.user.username);
                    channel.send("Este channel está agora em slow mode **(" + args[0] + "s)**.");
                    message.reply({ content: "Ligado.", ephemeral: true });
                }
            } else {
                channel.setRateLimitPerUser(0, message.member.user.username);
                channel.send("O slow mode neste channel foi desligado.");
                message.reply({ content: "Desligado.", ephemeral: true });
            }
        } else message.reply("Não tens permissão para isto.");

    }

}