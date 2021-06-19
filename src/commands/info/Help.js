const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ajuda', 'h', 'welp'],
            category: 'Informação',
            description: 'Mostra os comandos do Bot',
            args: false,
            cmdoptions: [{
				name: "comando",
				type: "STRING",
				description: "Comando para o qual queres obter informação (Default: Mostra todos os comandos)",
				required: false,
			}],
        });
    }

    async run(message, [command], notspam) {
        const embed = new MessageEmbed()
            .setColor(message.member.displayColor)
            .setAuthor(`${this.client.user.username} Ajuda`, message.guild.iconURL({ dynamic: true, size: 4096 }))
            .setThumbnail(this.client.user.displayAvatarURL())
            .setFooter("Pedido por " + message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        if (command) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

            if (!cmd) return message.reply({content: `O comando \`${command}\` não existe.`  , ephemeral: notspam })

            embed.setAuthor(`Ajuda para ${this.client.utils.capitalise(cmd.name)}`, this.client.user.displayAvatarURL());
            embed.setDescription(
                `**• Alias:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'Nenhum alias'}
                **• Descrição:** ${cmd.description}
                **• Categoria:** ${cmd.category}
                **• Uso:** ${this.client.prefix + cmd.usage}`
            );

            return message.reply({embeds: [embed]  , ephemeral: notspam });
        } else {
            embed.setDescription(
                `Comandos disponíveis.
                Prefixo: / ou \`${this.client.prefix}\`
                Parámetros do commando: \`<>\` é obrigatório e \`[]\` é opcional.`
            );
            let categories;
            if (!this.client.owners.includes(message.member.id)) {
                categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
            } else {
                categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
            }

            for (const category of categories) {
                try {
                    embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
                        cmd.category === category).filter(cmd =>
                            !cmd.serverOnly || (cmd.serverOnly && message.guild)).map(cmd => `\`${cmd.name}\``).join(' '));
                } catch (e) { }
            }
            return message.reply({embeds: [embed]  , ephemeral: notspam });
        }
    }

}