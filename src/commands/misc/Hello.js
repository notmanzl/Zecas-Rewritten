const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ola'],
            description: 'Digo Hello!'
        });
    }

    async run(message, args){
        message.channel.send('Hello!');
    }

}