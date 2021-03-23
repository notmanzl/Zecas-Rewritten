const Command = require('../../structures/command');
var path = require("path");
const fs = require('fs');
const directoryPath = path.join(__dirname, "..", "..", "..", "assets", "audio");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['sfxrename', 'soundrename'],
            category: 'Soundboard',
            description: 'Muda o nome de um som da soundboard',
            usage: '<NomeAntigo> <NomeNovo>',
            args: true
        });
    }

    async run(message, args) {
        if (message.member.hasPermission("MANAGE_CHANNELS")) {
            if (args[0]) {
                if (args[1]) {
                    if (fs.existsSync(path.join(__dirname, "..", "..", "..", "assets", "audio", args[0] + ".mp3"))) {
                        fs.rename(path.join(__dirname, "..", "..", "..", "assets", "audio", args[0] + ".mp3"), path.join(__dirname, "..", "..", "..", "assets", "audio", args[1] + ".mp3"));
                        message.channel.send("O som ``" + args[0] + "`` foi mudado para ``" + args[1] + "``.");
                    } else {
                        message.channel.send("Esse som não existe.");
                    }
                } else {
                    message.channel.send("Tens de escolher um novo nome para o som.");
                }
            } else {
                message.channel.send("Tens de escolher o som.");
            }
        } else {
            message.channel.send("Não tens permissão para isto.");
        }
    }

}