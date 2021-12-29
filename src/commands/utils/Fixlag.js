const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['fl'],
            category: 'Utilidade',
            description: 'Muda a região do servidor para tentar corrigir problemas',
            defaultperms: false,
            cmdperms: [
                {
                    id: '568144642131099663',
                    type: 'ROLE',
                    permission: true,
                }
            ]
        });
    }

    async run(message) {
        if (message.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) {
            if (message.member.voice.channel) {
                if (message.member.voice.channel.rtcRegion == "rotterdam") {
                    message.member.voice.channel.setRTCRegion("us-east").then(updated => message.reply(`Região mudada para \`${updated.rtcRegion}\`.`));
                } else {
                    message.member.voice.channel.setRTCRegion("rotterdam").then(updated => message.reply(`Região mudada para \`${updated.rtcRegion}\`.`));;
                }
            } else return message.reply("Não estás num voice channel")
        } else {
            return message.reply("Não tens permissão para isto.");
        }
    }

}