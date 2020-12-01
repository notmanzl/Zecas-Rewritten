const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['temporary', 'temporario'],
            description: 'Cria um Channel temporário',
            category: 'Utilidade',
            usage: '<nome>',
            args: true
        })
    }

    async run(message, args) {
        createtempchannel(message);

        function findbitrate(message) {
            if (message.guild.premiumTier == "0") {
                return 96000;
            }
            else if (message.guild.premiumTier == "1") {
                return 128000;
            }
            else if (message.guild.premiumTier == "2") {
                return 256000;

            }
            else if (message.guild.premiumTier == "3") {
                return 384000;
            }
        }

        async function createtempchannel(message) {
            var parent = message.guild.channels.cache.find(ch => ch.name === 'Temporário');
            if(!parent) return message.channel.send('Não existe uma categoria para channels temporários.');
            args = args.join(' ');
            if (message.member.hasPermission('MANAGE_EMOJIS')) {
                var newchannel = message.guild.channels.create(args, {
                    type: "voice",
                    parent: parent,
                    bitrate: await findbitrate(message)
                });
                message.channel.send("O teu channel foi criado.");
            } else {
                message.channel.send("Não tens permissão para isto.");
            }

        }

    }
}