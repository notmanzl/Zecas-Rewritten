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
            aliases: ['sfxremove', 'soundremove'],
            category: 'Soundboard',
            description: 'Remove um som da soundboard',
            usage: '<Nome>',
            args: true
        });
    }

    async run(message, args) {
        if (message.member.hasPermission("MANAGE_CHANNELS")) {
            if (args[0]) {
                if (fs.existsSync(path.join(__dirname, "..", "..", "..", "assets", "audio", args[0] + ".mp3"))) {
                    fs.unlinkSync(path.join(__dirname, "..", "..", "..", "assets", "audio", args[0] + ".mp3"));
                    message.channel.send("O som ``" + args[0] + "`` foi removido.");
                } else {
                    message.channel.send("Esse som não existe.")
                }
            } else {
                message.channel.send("Tens de escolher o som.")
            }
        } else {
            message.channel.send("Não tens permissão para isto.");
        }
    }

}