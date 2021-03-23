const Command = require('../../structures/command');
var path = require("path");
const fs = require('fs');
const directoryPath = path.join(__dirname, "..", "..", "..", "assets", "audio");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['sfx', 'sound'],
            category: 'Fun',
            description: 'Toca um som no voice channel',
            usage: '<Som>'
        });
    }

    async run(message, args) {
        if (args.length) {
            if (fs.existsSync(path.join(__dirname, "..", "..", "..", "assets", "audio", args[0] + ".mp3"))) {
                if (message.member.voice.channel) {
                    const connection = await message.member.voice.channel.join();
                    const dispatcher = connection.play(path.join(__dirname, "..", "..", "..", "assets", "audio", args[0] + ".mp3"), {
                        volume: 0.35,
                    });
                    dispatcher.on('start', () => {
                        console.log(args[0] + ' a tocar!');
                    });

                    dispatcher.on('finish', () => {
                        console.log(args[0] + ' acabou de tocar!');
                        connection.disconnect();
                    });

                    dispatcher.on('error', () => {
                        console.error;
                        connection.disconnect();
                    });
                } else {
                    message.channel.send("Tens de estar num voice channel.");
                }
            } else {
                fs.readdir(directoryPath, function (err, files) {
                    if (err) {
                        return console.log('Unable to scan directory: ' + err);
                    }
                    message.channel.send("Esse som não existe.\nSons disponíveis: ``" + files.toString().replace(/.mp3/g, '').replace(/,/g, ', ') + "``");
                });
            }
        } else {
            fs.readdir(directoryPath, function (err, files) {
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                }
                message.channel.send("Sons disponíveis: ``" + files.toString().replace(/.mp3/g, '').replace(/,/g, ', ') + "``");
            });
        }
    }

}