const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['slow', 'sm'],
            category: 'Utilidade',
            description: 'Ativa ou desativa o Slowmode',
            usage: '[tempo]'
        });
    }

    async run(message, args) {
        const channel = message.channel;
        if (message.member.hasPermission("MANAGE_CHANNELS")) {
            if (args.length) {
                if (isNaN(args[0])) {
                    message.channel.send("Parâmetro inválido.");
                    return;
                } else {
                    channel.setRateLimitPerUser(args[0],message.member.user.username);
                    channel.send("Este channel está agora em slow mode **(" + args[0] + "s)**.");
                }
            } else {
                channel.setRateLimitPerUser(0, message.member.user.username);
                channel.send("O slow mode neste channel foi desligado.");
            }
        } else message.channel.send("Não tens permissão para isto.");

    }

}