const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args){
        super(...args, {
            aliases: ['bot'],
            description: 'O bot diz no chat o que quiseres',
            category: 'Owner',
            usage: '<mensagem>',
            ownerOnly: true,
            args: true
        })
    }

    async run(message, args) {
        await message.delete();
        const string = args.join(' ');
        message.channel.send(`${string}`);
    }
}