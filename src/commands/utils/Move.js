const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['mover'],
            category: 'Utilidade',
            description: 'Move as pessoas do teu channel para outro',
            usage: '<Channel>',
            args : true
        });
    }

    async run(message, args) {

        let targetchannelname = args.join(' ');


        if (!message.member.hasPermission('MOVE_MEMBERS')) message.channel.send("Não tens permissão para isto.");

        if (!message.guild.channels.cache.find(ch => ch.name === targetchannelname)) return message.channel.send('Channel inválido.');

        if (!message.member.voice.channel) return message.channel.send("Não estás em nenhum channel.");

        const from1 = message.member.voice.channel;
        var users = from1.members.array();
        const destiny = message.guild.channels.cache.find(ch => ch.name === targetchannelname);
        for (let i = 0; i < users.length; i++) {
          var usertemp = users[i];
          usertemp.voice.setChannel(destiny);
        }
        message.channel.send(
          "Foram movidas **" +
            users.length +
            "** pessoas de `" +
            from1.name +
            "` para `" +
            targetchannelname +
            "`."
        );

    }

}