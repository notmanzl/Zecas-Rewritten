const Command = require('../../structures/command');
var path = require("path");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['letsgo'],
            category: 'Soundboard',
            description: 'IS THAT DABABY?'
        });
    }

    async run(message, args) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(path.join(__dirname, "..", "..", "..", "assets", "audio", "dababy.mp3"), {
                volume: 0.35,
            });
            

            dispatcher.on('start', () => {
                console.log('dababy a tocar!');
            });

            dispatcher.on('finish', () => {
                console.log('dababy acabou de tocar!');
                connection.disconnect();
            });

            dispatcher.on('error', () => {
                console.error;
                connection.disconnect();
            });
        }
    }

}