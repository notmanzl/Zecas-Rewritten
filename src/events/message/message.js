const Event = require('../../structures/event');

module.exports = class extends Event {

	async run(message) {
		const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

		if (!message.guild || message.author.bot) return;

		if (message.content.match(/Ribeira/i)) {
			message.reply('gay');
		}

		if (message.content.match(mentionRegex)) message.channel.send(`O meu prefixo para ${message.guild.name} é \`${this.client.prefix}\`.`);

		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

		if (!message.content.startsWith(this.client.prefix)) return;

		const [cmd, ...args] = message.content.slice(this.client.prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {
			if (!this.client.utils.checkOwner(message.author)) {
				return;
			}

			if (command.args && !args.length) {
				return message.channel.send(`Este comando precisa de argumentos. Uso correto: **/${command.usage ?
					command.usage : 'Este commando não tem um formato de uso'}**.`);
			}

			command.run(message, args);
		}
	}

};