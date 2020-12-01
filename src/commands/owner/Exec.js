const Command = require('../../structures/command');
const { exec } = require('child_process');

module.exports = class extends Command {

    constructor(...args){
        super(...args, {
            aliases: ['execute'],
            description: 'Executa comandos na consola',
            category: 'Owner',
            usage: '<comando>',
            ownerOnly: true,
            args: true
        })
    }

    async run(message, ...args) {
        exec(args[0].join(' '), (error, stdout) =>{
            const response = stdout || error;
            message.channel.send(response, {split : true, code : true});
        })
    }
}