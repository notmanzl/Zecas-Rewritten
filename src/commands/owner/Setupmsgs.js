const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Dá setup da mensagem no Welcome',
            category: 'Owner',
            ownerOnly: true,
        })
    }

    async run(message, ...args) {
        const newembed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor("32a852")
            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setDescription(
                "Bem vindo ao " +
                message.guild.name +
                " lê em baixo algumas informações úteis :arrow_down:\n"
            )
            .addField(
                "Regras :scroll:",
                "**1.** Não Sejas otário\n **2.** Proíbido conteúdo NSFW fora do channel de NSFW\n**3.** Proíbido Spam fora do channel de Spam\n **4.** Respeitar os TOS do Discord",
                false
            )
            .addField(
                "Comandos :desktop:",
                `Usa **/help** para saberes todos os comandos!`,
                false
            )
            .addField(
                "Jogos :video_game:",
                "Reage a esta mensagem para seres taggado consoante os jogos que queres.",
                false
            );
            message.channel
                .messages.fetch("612960847160934400")
                .then(function (message) {
                    message.edit({embeds: [newembed]});
                    console.log("Message edited.");
                });
            message.delete();
    }
}