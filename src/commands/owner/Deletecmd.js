const Command = require('../../structures/command');
const { MessageButton } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Apaga Slash Commands',
            category: 'Owner',
            usage: '<comando>',
            ownerOnly: true,
            args: true,
            cmdoptions: [{
				name: "comando",
				type: "STRING",
				description: "Nome do comando que queres apagar",
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
        const command = await this.client.guilds.cache.get(message.guild.id).commands.cache.find(elem => elem.name === args[0]);


		await message.guild.commands.delete(command);
        console.log(command);
        message.reply(`done`)

    }


}
