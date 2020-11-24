const Command = require('./../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Cria uma poll'
        });
    }

    async run(message, args) {

        let description = args.join(' ');

        const embed = new MessageEmbed()
            .setColor(message.member.displayColor)
            .setTitle("Poll  ⠀⠀⠀⠀⠀⠀⠀⠀")
            .setDescription(description)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter("Poll criada por " + message.author.username, message.author.displayAvatarURL({ dynamic: true }));

        const msg = await message.channel.send(embed);
        await msg.react(message.guild.emojis.cache.get("759037020521103360"));
        await msg.react(message.guild.emojis.cache.get("759037020659515402"));

    }

}