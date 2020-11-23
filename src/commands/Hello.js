const Command = require('./../structures/Command');

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