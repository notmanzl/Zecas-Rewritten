const Command = require('../../structures/command');
const { MessageEmbed, MessageActionRow, MessageButton, MessageComponentInteractionCollector } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['votacao'],
            category: 'Utilidade',
            description: 'Cria uma poll',
            usage: '<pergunta>',
            args: true,
			cmdoptions: [{
				name: "pergunta",
				type: "STRING",
				description: "Pergunta para a Poll",
				required: true,
			},
            {
				name: "reposta_1",
				type: "STRING",
				description: `Primeira opção de resposta (Default: "Sim")`,
				required: false,
			},
            {
				name: "resposta_2",
				type: "STRING",
				description: `Segunda opção de resposta (Default: "Não")`,
				required: false,
			}],
        });
    }

    async run(message, args) {

        let varsim = 0;
        let varnao = 0;

        let arrsim = [];
        let arrnao = [];

        let ans1 = args[1] || "Sim";
        let ans2 = args[2] || "Não";

        let description = args[0];

        const embed = new MessageEmbed()
            .setColor(message.member.displayColor)
            .setTitle("Poll")
            .setDescription(description)
            .addField(ans1, varsim.toString(), true)
            .addField(ans2, varnao.toString(), true)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
            .setFooter("Poll criada por " + message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true }));

        /*const msg = await message.channel.send({ embeds: [embed] });

       if (message.guild.id == '337617578128048129') {
           await msg.react("759037020521103360");
           await msg.react("759037020659515402");
       }
       else {
           await msg.react("✔️");
           await msg.react("❌");
       }
       return message.reply({ content: `Poll criada!`, ephemeral: true });*/

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomID('sim')
                    .setLabel(ans1)
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomID('nao')
                    .setLabel(ans2)
                    .setStyle('DANGER'),
                new MessageButton()
                    .setCustomID('respostas')
                    .setLabel('Ver Respostas')
                    .setStyle('SECONDARY'),
            );

        await message.reply({ embeds: [embed], components: [row] });
        const msg = await message.fetchReply();

        const filtersim = i => i.customID === 'sim';

        const collectorsim = msg.createMessageComponentInteractionCollector(filtersim, { time: 86400000 });

        collectorsim.on('collect', i => {
            if (arrsim.includes(i.member)) return i.reply({ content: `Não podes votar outra vez!`, ephemeral: true });
            else if (arrnao.includes(i.member)) {
                varsim++;
                varnao--;
                arrnao.splice(arrnao.indexOf(i.member), 1);
                arrsim.push(i.member);
                i.reply({ content: `Voto Alterado!`, ephemeral: true });
                const embed = new MessageEmbed()
                    .setColor(message.member.displayColor)
                    .setTitle("Poll")
                    .setDescription(description)
                    .addField(ans1, varsim.toString(), true)
                    .addField(ans2, varnao.toString(), true)
                    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
                    .setFooter("Poll criada por " + message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true }));
                msg.edit({ embeds: [embed], components: [row] });
            }
            else {
                i.reply({ content: `Voto Registado!`, ephemeral: true });
                varsim++;
                const embed = new MessageEmbed()
                    .setColor(message.member.displayColor)
                    .setTitle("Poll")
                    .setDescription(description)
                    .addField(ans1, varsim.toString(), true)
                    .addField(ans2, varnao.toString(), true)
                    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
                    .setFooter("Poll criada por " + message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true }));
                msg.edit({ embeds: [embed], components: [row] });
                arrsim.push(i.member);
            }
        });

        const filternao = i => i.customID === 'nao';

        const collectornao = msg.createMessageComponentInteractionCollector(filternao, { time: 86400000 });

        collectornao.on('collect', i => {
            if (arrnao.includes(i.member)) return i.reply({ content: `Não podes votar outra vez!`, ephemeral: true });
            else if (arrsim.includes(i.member)) {
                varnao++;
                varsim--;
                arrsim.splice(arrsim.indexOf(i.member), 1);
                arrnao.push(i.member);
                i.reply({ content: `Voto Alterado!`, ephemeral: true });
                const embed = new MessageEmbed()
                    .setColor(message.member.displayColor)
                    .setTitle("Poll")
                    .setDescription(description)
                    .addField(ans1, varsim.toString(), true)
                    .addField(ans2, varnao.toString(), true)
                    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
                    .setFooter("Poll criada por " + message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true }));
                msg.edit({ embeds: [embed], components: [row] });
            }
            else {
                i.reply({ content: `Voto Registado!`, ephemeral: true });
                varnao++;
                const embed = new MessageEmbed()
                    .setColor(message.member.displayColor)
                    .setTitle("Poll")
                    .setDescription(description)
                    .addField(ans1, varsim.toString(), true)
                    .addField(ans2, varnao.toString(), true)
                    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
                    .setFooter("Poll criada por " + message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true }));
                msg.edit({ embeds: [embed], components: [row] });
                arrnao.push(i.member);
            }
        });

        const filterresp = i => i.customID === 'respostas';

        const collectorresp = msg.createMessageComponentInteractionCollector(filterresp, { time: 86400000 });
        collectorresp.on('collect', i => {
            if (varsim > 0 || varnao > 0) {
                const respembed = new MessageEmbed()
                    .setColor(message.member.displayColor)
                    .setTitle("Poll - Respostas")
                    .addField(ans1 + " (" + varsim + ")", arrsim.toString() || varsim.toString())
                    .addField(ans2 + " (" + varnao + ")", arrnao.toString() || varnao.toString())
                    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
                    .setFooter("Poll criada por " + message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true }));
                i.reply({ embeds: [respembed], ephemeral: true });
            } else return i.reply({ content: "Ainda não existem respostas.", ephemeral: true })
        });

    }

}