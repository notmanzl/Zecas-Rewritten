const Event = require('../../structures/event');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    async run(messages) {

        const channel = messages.first().guild.channels.cache.find(ch => ch.name === 'deletedlogs');
        if (channel) channel.send({ content: `Foram apagadas \`${messages.size}\` mensagens em ${messages.first().channel}` });
    }

}