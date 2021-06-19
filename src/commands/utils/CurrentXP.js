const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['voicexp'],
            category: 'Utilidade',
            description: 'Diz-te quanto XP estás atualmente a ganhar no Voice Channel'
        });
    }

    async run(message) {
        if (message.member.voice.channel) {
            const channel = message.member.voice.channel;
            if (channel.type == "voice" && channel != message.guild.afkChannel && channel.members.filter(member => !member.user.bot && !member.voice.mute && !member.voice.deaf).size > 1) {
                message.reply("Estás a ganhar entre **" + 0.2 * (1 + (channel.members.filter(member => !member.user.bot && !member.voice.mute && !member.voice.deaf).size / 10)) + "** e **" + 1 * (1 + (channel.members.filter(member => !member.user.bot && !member.voice.mute && !member.voice.deaf).size / 10)) + "** de XP.");
            } else message.reply("Não estás a receber XP.");
        } else message.reply("Não estás num Voice Channel.");
    }
}