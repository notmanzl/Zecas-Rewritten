const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ms'],
            category: 'Utilidade',
            description: 'Mostra a latência do bot'
        });
    }

    async run(message) {
        const msg = await message.channel.send('A calcular...');

        const latency = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`Latência do Bot: \`${latency}ms\` Latência da API: \`${Math.round(this.client.ws.ping)}ms\``);
    }

}