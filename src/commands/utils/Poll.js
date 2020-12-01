const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['votacao'],
            category: 'Utilidade',
            description: 'Cria uma poll',
            usage: '<pergunta>',
            args : true
        });
    }

    async run(message, args) {

        let description = args.join(' ');

        const embed = new MessageEmbed()
            .setColor(message.member.displayColor)
            .setTitle("Poll  ⠀⠀⠀⠀⠀⠀⠀⠀")
            .setDescription(description)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
            .setFooter("Poll criada por " + message.author.username, message.author.displayAvatarURL({ dynamic: true }));

        const msg = await message.channel.send(embed);

        if ( message.guild.id == '337617578128048129' ) {
            await msg.react(message.guild.emojis.cache.get("759037020521103360"));
            await msg.react(message.guild.emojis.cache.get("759037020659515402"));
        }
        else {
            await msg.react("✔️");
            await msg.react("❌");
        }

    }

}