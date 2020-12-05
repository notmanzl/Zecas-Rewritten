const Event = require('../../structures/event');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    async run(message) {
        if (message.author.bot) return;
        const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;
        const embed = new MessageEmbed()
            .setColor(message.member.displayColor)
            .setAuthor(message.author.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setTitle('Mensagem Apagada')
            .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setTimestamp()
            .setDescription([
                `**• ID:** ${message.id}`,
                `**• Channel:** ${message.channel}`,
                `**• Autor:** ${message.member.displayName}`,
                `${attachments ? `**• Ficheiros:** ${attachments.join('\n')}` : ''}`
            ]);
        if (message.content.length) {
            embed.addField(`**• Mensagem:**`, `${message.content}`);
        }

        const channel = message.guild.channels.cache.find(ch => ch.name === 'deletedlogs');
        if (channel) channel.send(embed);
    }

}