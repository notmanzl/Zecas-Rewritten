const Command = require('../../structures/command');
const { MessageButton } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'Dá deploy de Slash Commands',
            category: 'Owner',
            usage: '<comando>',
            ownerOnly: true,
            args: true,
            cmdoptions: [{
                name: "comando",
                type: "STRING",
                description: "Nome do comando que queres dar deploy",
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
        const cmd = this.client.commands.get(args[0]);

        const data = {
            name: args[0],
            description: cmd.description,
            options: cmd.cmdoptions,
            defaultPermission: cmd.defaultperms
        };
        let command = await message.guild.commands.create(data);
        console.log(cmd.cmdperms);
        command = await command.permissions.set({
            guild: message.guild, command: command,
            permissions:
                cmd.cmdperms,

        })
        console.log(command);
        message.reply(`Comando **/${args[0]}** registado nesta Guild com a descrição **${cmd.description}**`)
    }


}
