const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['chamar'],
            category: 'Utilidade',
            description: 'Chama a pessoa mencionada',
            usage: '<@membro>',
            args: true,
            cmdoptions: [{
				name: "user",
				type: "USER",
				description: "Pessoa que queres mencionar",
				required: true,
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

    async run(message, [target]) {
        const member = message.guild.members.cache.get(target);
        if (!message.member.permissions.has('MANAGE_EMOJIS')) return message.reply({ content: `Não tens permissão para isto!`, ephemeral: true });
        member.send("**PING!** <@" + message.member.user.id + "> está te a chamar!");
        return message.reply({ content: `Enviado!`, ephemeral: true });
    }

}