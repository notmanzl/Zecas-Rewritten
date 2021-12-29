const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['mover'],
            category: 'Utilidade',
            description: 'Move as pessoas do teu channel para outro',
            usage: '<Channel de destino> [Channel de origem]',
            args: true,
            ownerOnly: false,
            cmdoptions: [{
                name: "channel_destino",
                type: "CHANNEL",
                description: "Channel para onde queres mandar as pessoas",
                required: true,
            },
            {
                name: "channel_origem",
                type: "CHANNEL",
                description: "Channel de onde queres mandar as pessoas (Default: Channel onde estás)",
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

        let target = message.guild.channels.cache.get(args[0]);


        if (!message.member.permissions.has('MOVE_MEMBERS')) message.reply({ content: "Não tens permissão para isto.", ephemeral: true });


        if (!message.member.voice.channel && !args[1]) return message.reply({ content: "Não estás em nenhum channel.", ephemeral: true });

        const from1 = message.guild.channels.cache.get(args[1]) || message.member.voice.channel;
        if (from1.members.size == "0") return message.reply({ content: "Esse channel está vazio.", ephemeral: true });
        var members = from1.members.size;
        if (!(target.type == "GUILD_VOICE") || !(from1.type == "GUILD_VOICE")) return message.reply({ content: 'Channel inválido.', ephemeral: true });
        from1.members.forEach((member) => {
            member.voice.setChannel(target);
        });
        message.reply(
            {
                content: "Foram movidas **" +
                    members +
                    "** pessoas de `" +
                    from1.name +
                    "` para `" +
                    target.name +
                    "`.", ephemeral: false
            }
        );

    }

}