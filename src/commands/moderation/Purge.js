const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['clear'],
            category: 'Moderação',
            description: 'Apaga várias mensagens',
            usage: '<Número de mensagens> [Channel]',
            args: true,
            cmdoptions: [{
                name: "mensagens",
                type: "INTEGER",
                description: "Número de mensagens a serem apagadas (Máximo: 50)",
                required: true,
            },
            {
                name: "channel",
                type: "CHANNEL",
                description: "Channel onde queres apagar as mensagens (Default: Channel onde fazes o comando)",
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
        console.log(args[1])
        const channel = message.guild.channels.cache.get(args[1]) || message.channel;
        if (message.member.permissions.has("MANAGE_CHANNELS")) {

            if (isNaN(args[0]) || args[0] > 50) return message.reply("Parâmetro inválido. Máximo: **50**");
            if (!channel.isText()) return message.reply({ content: "Channel inválido.", ephemeral: true });
            channel.bulkDelete(args[0]);
            return message.reply({ content: `Foram apagadas \`${args[0]}\` mensagens em ${channel}`, ephemeral: false });

        } else return message.reply({ content: "Não tens permissão para isto.", ephemeral: true });

    }

}