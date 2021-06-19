const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['mutar', 'mu', 'unmute'],
            category: 'Moderação',
            description: 'Dá mute/unmute a alguém',
            usage: '<Membro>',
            args: true,
            cmdoptions: [{
				name: "user",
				type: "USER",
				description: "Utilizador que queres mutar",
				required: true,
			}],
            defaultperms: false,
            cmdperms: [
                {
                    id: '510848401169186816',
                    type: 'ROLE',
                    permission: true,
                }
            ]
        });
    }

    async run(message, [target]) {
        const member = message.guild.members.cache.get(target) || message.member;
        let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if (message.member.permissions.has("MUTE_MEMBERS")) {
            if (member.roles.cache.has(muterole.id) || member.voice.serverMute) {
                member.roles.remove(muterole);
                return message.reply(`${member} foi **unmuted**.`);
            } else {
                member.roles.add(muterole);
                return message.reply(`${member} foi **muted**.`);
            }
        } else return message.reply("Não tens permissão para isto.");
    }
}