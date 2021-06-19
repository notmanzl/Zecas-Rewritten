const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args){
        super(...args, {
            aliases: ['bot'],
            description: 'O bot diz no chat o que quiseres',
            category: 'Owner',
            usage: '<mensagem>',
            ownerOnly: true,
            args: true,
            cmdoptions: [{
				name: "mensagem",
				type: "STRING",
				description: "Mensagem que queres enviar",
				required: true,
			}],
            defaultperms: false,
            cmdperms: [
                {
                    id: '66135146079715328',
                    type: 'USER',
                    permission: true,
                },
            ]
        })
    }

    async run(message, args) {
        const string = args[0];
        message.channel.send(`${string}`);
        return message.reply({ content: `Enviado.`, ephemeral: true });       
    }
}