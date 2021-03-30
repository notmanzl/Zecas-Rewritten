const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['chamar'],
            category: 'Utilidade',
            description: 'Chama a pessoa mencionada',
            usage: '<@membro>',
            args: true
        });
    }

    async run(message, [target]) {
        const member = message.mentions.members.last() || message.guild.members.cache.get(target);
        if (!message.member.hasPermission('MANAGE_EMOJIS')) message.channel.send("Não tens permissão para isto.");
        member.send("**PING!** <@" + message.author.id + "> está te a chamar!");
        message.reply("enviado!").then(msg => {
            if (!message.channel.name.includes('spam')) {
                msg.edit(msg.content + "\n*(Este comando será apagado após 10segs)*").then(msg => {
                    setTimeout(() => msg.delete(), 10000);
                })
                setTimeout(() => message.delete(), 10000);
            }
        })
    }

}