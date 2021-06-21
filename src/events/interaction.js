const Event = require('../structures/event');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    async run(interaction) {
        if (!interaction.isCommand()) return;

        const command = this.client.commands.get(interaction.commandName);

        if (command) {
            if (command.ownerOnly && !this.client.utils.checkOwner(interaction.member.user)) {
                return interaction.reply({ content: 'Este comando só pode ser usado pelo owner.', ephemeral: true });
            }

            const args = [];
            await interaction.options.forEach(option => {
                args.push(option.value)
            });

            let notspam = true;

            if (interaction.channel.name.includes("spam")) {
                notspam = false;
            }

            //command logs
            const embed = new MessageEmbed()
                .setColor(interaction.member.displayColor)
                .setAuthor(interaction.member.user.tag, this.client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
                .setTitle('Comando executado')
                .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
                .setTimestamp()
                .setDescription(
                    `**• ID:** ${interaction.id}
                **• Channel:** ${interaction.channel}
                **• Autor:** ${interaction.member.displayName}`
                )
                .addField(`**• Comando:**`, `/${interaction.commandName} ${args.toString()}`);   
            const channel = interaction.guild.channels.cache.find(ch => ch.name === 'cmdlogs');
            if (channel) channel.send({ embeds: [embed] });

            return command.run(interaction, args, notspam);


        }

    }

}