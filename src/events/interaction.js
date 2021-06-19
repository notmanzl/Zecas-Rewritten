const Event = require('../structures/event');

module.exports = class extends Event {

    async run(interaction) {
        if (!interaction.isCommand()) return;

        const command = this.client.commands.get(interaction.commandName);

        if (command) {
            if (command.ownerOnly && !this.client.utils.checkOwner(interaction.member.user)){
                return interaction.reply( {content: 'Este comando só pode ser usado pelo owner.', ephemeral: true});
            }

            const args = [];
            await interaction.options.forEach(option => { 
                args.push(option.value)                
            });

            let notspam = true;

            if(interaction.channel.name.includes("spam"))  {
                notspam = false;
            }

            return command.run(interaction, args, notspam);
        }

    }

}