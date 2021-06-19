const Command = require('../../structures/command');
const ms = require('ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ut'],
            category: 'Informação',
            description: 'Diz há quanto tempo o bot está ligado'
        });
    }

    async run(message, args, notspam) {
        return message.reply({ content: `Ligado há \`${ms(this.client.uptime, { long : true })}\``, ephemeral: notspam });
    }

}