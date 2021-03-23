const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['mutar', 'mu', 'unmute'],
            category: 'Moderação',
            description: 'Dá mute/unmute a alguém',
            usage: '<Membro>',
            args : true
        });
    }

    async run(message, [target]) {
        const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
        let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
        if (message.member.hasPermission("MUTE_MEMBERS")) {
            if(member.roles.cache.has(muterole.id) || member.voice.serverMute) {
                member.roles.remove(muterole);
                member.voice.setMute(false);
                return message.channel.send(`${member} foi **unmuted**.`);
            } else {
                member.roles.add(muterole);
                member.voice.setMute(true);
                return message.channel.send(`${member} foi **muted**.`);
            }
        } else return message.channel.send("Não tens permissão para isto.");
    }
}