const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['temporary', 'temporario'],
            description: 'Cria um Channel temporário',
            category: 'Utilidade',
            usage: '<Nome> [Slots]',
            args: true,
            cmdoptions: [{
				name: "nome",
				type: "STRING",
				description: "Nome para o channel",
				required: true,
			},
            {
				name: "slots",
				type: "INTEGER",
				description: "Número de slots do channel (Default: Sem limite)",
				required: false,
			}],
            defaultperms: false,
            cmdperms: [
                {
                    id: '568144642131099663',
                    type: 'ROLE',
                    permission: true,
                }
            ]
        })
    }

    async run(message, args) {

        let slots = args[1] || 0;

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
            if(!parent) return message.reply('Não existe uma categoria para channels temporários.');
            if (message.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) {
                var newchannel = message.guild.channels.create(args[0], {
                    type: "GUILD_VOICE",
                    parent: parent,
                    bitrate: await findbitrate(message),
                    userLimit: slots
                });
                return message.reply("O teu channel foi criado.");
            } else {
                return message.reply("Não tens permissão para isto.");
            }

        }

    }
}