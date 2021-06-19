const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ms'],
            category: 'Informação',
            description: 'Mostra a latência do bot'
        });
    }

    async run(message) {
        await message.reply('A calcular...');
        const msg = await message.fetchReply();
        const latency = msg.createdTimestamp - message.createdTimestamp;

        message.editReply(`Latência do Bot: \`${latency}ms\` Latência da API: \`${Math.round(this.client.ws.ping)}ms\``);
    }

}