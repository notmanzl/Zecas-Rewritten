const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['slow', 'sm'],
            category: 'Moderação',
            description: 'Ativa ou desativa o Slowmode',
            usage: '[Tempo] [Channel]',
            cmdoptions: [{
				name: "tempo",
				type: "INTEGER",
				description: "Tempo de slowmode (em segundos) (Default: 0)",
				required: false,
			},
            {
				name: "channel",
				type: "CHANNEL",
                description: "Channel onde queres ativar/desativar o slow mode (Default: Channel onde fazes o comando)",
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
        const channel = message.guild.channels.cache.get(args[1]) || message.channel;
        if (message.member.permissions.has("MANAGE_CHANNELS")) { 
            if (args[0] && args[0] > 0) {
                if (isNaN(args[0])) {
                    return message.reply("Parâmetro inválido.");
                } else {
                    channel.setRateLimitPerUser(args[0],message.member.user.username);
                    channel.send("Este channel está agora em slow mode **(" + args[0] + "s)**.");
                    return message.reply({ content: `Slow mode ligado em ${channel} (\`${args[0]}\`s)`, ephemeral: true });
                }
            } else {
                channel.setRateLimitPerUser(0, message.member.user.username);
                channel.send("O slow mode neste channel foi desligado.");
                return message.reply({ content: `Slow mode desligado em ${channel}`, ephemeral: true });
            }
        } else return message.reply("Não tens permissão para isto.");

    }

}