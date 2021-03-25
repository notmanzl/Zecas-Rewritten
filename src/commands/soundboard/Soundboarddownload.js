const Command = require('../../structures/command');
const { MessageAttachment } = require('discord.js');
var path = require("path");
const fs = require('fs');
const directoryPath = path.join(__dirname, "..", "..", "..", "assets", "audio");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['sfxdl', 'sounddl', 'soundboarddl', 'sfxdownload', 'sounddownload'],
            category: 'Soundboard',
            description: 'Envia o ficheiro do som escolhido',
            usage: '<Nome>',
            args: true
        });
    }

    async run(message, args) {
        if (message.member.hasPermission('MANAGE_EMOJIS')) {
            if (args[0]) {
                if (fs.existsSync(path.join(__dirname, "..", "..", "..", "assets", "audio", args[0] + ".mp3"))) {
                    const attachment = new MessageAttachment(path.join(__dirname, "..", "..", "..", "assets", "audio", args[0] + ".mp3"));
                    message.channel.send(args[0], attachment);
                } else {
                    message.channel.send("Esse som não existe.");
                }
            } else {
                message.channel.send("Tens de escolher um som.")
            }
        } else {
            message.channel.send("Não tens permissão para isto.");
        }
    }

}