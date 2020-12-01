const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['fl'],
            category: 'Utilidade',
            description: 'Muda a região do servidor para tentar corrigir problemas'
        });
    }

    async run(message) {
        if (message.guild.region == "europe") {
            message.guild.setRegion("us-east");
            message.channel.send(`Região mudada para \`${message.guild.region}\`.`);
          } else {
            message.guild.setRegion("europe");
            message.channel.send(`Região mudada para \`${message.guild.region}\`.`);
          }
    }

}