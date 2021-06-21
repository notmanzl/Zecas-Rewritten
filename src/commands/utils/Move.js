const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['mover'],
            category: 'Utilidade',
            description: 'Move as pessoas do teu channel para outro',
            usage: '<Channel de destino> [Channel de origem]',
            args : true,
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


        if (!message.member.permissions.has('MOVE_MEMBERS')) message.reply({ content: "Não tens permissão para isto." , ephemeral: true });


        if (!message.member.voice.channel && !args[1]) return message.reply({ content: "Não estás em nenhum channel.", ephemeral: true });

        const from1 = message.guild.channels.cache.get(args[1]) || message.member.voice.channel;
        if(from1.members.size == "0") return message.reply({ content: "Esse channel está vazio.", ephemeral: true });
        if (!(target.type == "voice") || !(from1.type == "voice")) return message.reply({ content: 'Channel inválido.', ephemeral: true });
        var users = from1.members.array();
        for (let i = 0; i < users.length; i++) {
          var usertemp = users[i];
          usertemp.voice.setChannel(target);
        }
        message.reply(
           { content:"Foram movidas **" +
           users.length +
           "** pessoas de `" +
           from1.name +
           "` para `" +
           target.name +
           "`.", ephemeral: false }
        );

    }

}