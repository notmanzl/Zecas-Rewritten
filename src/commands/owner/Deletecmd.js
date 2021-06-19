const Command = require('../../structures/command');
const { MessageButton } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'test command, do not use',
            category: 'Owner',
            usage: '<pergunta>',
            ownerOnly: true,
            args: true
        })
    }

    async run(message, args) {
        const command = await this.client.guilds.cache.get(message.guild.id).commands.cache.find(elem => elem.name === args[0]);


		await message.guild.commands.delete(command);
        console.log(command);
        message.reply(`done`)

    }


}
