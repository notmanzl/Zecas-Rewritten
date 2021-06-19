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
        const cmd = this.client.commands.get(args[0]);

        const data = {
            name: args[0],
            description: cmd.description,
            defaultPermission: cmd.defaultperms,
            options: cmd.cmdoptions
        };
        const command = await message.guild.commands.create(data);
        await command.setPermissions(cmd.cmdperms);
        console.log(command);
        message.reply(`Comando **/${args[0]}** registado nesta Guild com a descrição **${cmd.description}**`)

    }


}
