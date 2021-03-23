const Command = require('../../structures/command');
var path = require("path");
const fs = require('fs');
const directoryPath = path.join(__dirname, "..", "..", "..", "assets", "audio");
let request = require(`request`);
function download(url, filename) {
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(path.join(__dirname, "..", "..", "..", "assets", "audio", filename + ".mp3")));
}

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['sfxadd', 'soundadd'],
            category: 'Soundboard',
            description: 'Adiciona um som à soundboard',
            usage: '<Nome> e um anexo .mp3',
            args: true
        });
    }

    async run(message, args) {
        if (message.member.hasPermission('MANAGE_EMOJIS')) {
            if (args[0]) {
                if (message.attachments.first()) {
                    if (message.attachments.first().size <= 300000) {
                        if (message.attachments.first().name.endsWith(".mp3")) {
                            download(message.attachments.first().url, args[0]);
                            message.channel.send("Adicionado ``" + args[0] + " (" + message.attachments.first().name + ")`` à soundboard.");
                        } else {
                            message.channel.send("Tem de ser um ficheiro MP3.")
                        }
                    }
                    else {
                        message.channel.send("O ficheiro não pode ter mais de 300KB.")
                    }
                } else {
                    message.channel.send("Tens de enviar um anexo.")
                }
            } else {
                message.channel.send("Tens de definir um nome.")
            }
        } else {
            message.channel.send("Não tens permissão para isto.");
        }
    }

}