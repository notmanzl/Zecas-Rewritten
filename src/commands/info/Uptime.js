const Command = require('../../structures/command');
const ms = require('ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ut'],
            category: 'Informação',
            description: 'Diz à quanto tempo o bot está ligado'
        });
    }

    async run(message) {
        message.channel.send(`Ligado à \`${ms(this.client.uptime, { long : true })}\``);
    }

}