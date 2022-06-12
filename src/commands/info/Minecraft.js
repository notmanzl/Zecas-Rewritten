const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
var $ = (jQuery = require("jquery")(window));

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['mc'],
            category: 'Informação',
            description: 'Mostra a informação sobre um servidor de minecraft',
            usage: '[IP]',
            cmdoptions: [{
                name: "ip",
                type: "STRING",
                description: "Servidor para o qual queres obter informação (Default: mc.manzl.pt)",
                required: false,
            }],
            defaultperms: true,
        });
    }

    async run(message, args, notspam) {
        let ip = 'mc.manzl.pt';
        let port = '25565';
        if (args[0]) {
            ip = args[0].replace(":", "/");
        }
        const embed = new MessageEmbed()
            .setAuthor("Informações sobre " + ip)
            .setColor(0x99ff33)
            .setFooter(
                "Informação pedida por " + message.member.user.username,
                message.member.user.avatarURL
            )
            .setThumbnail(
                "https://api.minetools.eu/favicon/" + ip
            )
            .setTimestamp()
            .addField(
                "Players",
                json.players.online + "/" + json.players.max,
                true
            )
            .addField("Online", namesArray.join('\r\n') + "\u200b", true)
            .addField("MOTD", json.description, true)
            .addField("Versão", json.version.name, true);
        return message.reply({ embeds: [embed], ephemeral: notspam });
    }


}