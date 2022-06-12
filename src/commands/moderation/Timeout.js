const Command = require('../../structures/command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			category: 'Moderação',
			description: 'Dá ou tira timeout a alguém',
			usage: '<Membro> [Tempo] [Razão]',
			args: true,
			cmdoptions: [{
				name: 'user',
				type: 'USER',
				description: 'Utilizador que queres mutar',
				required: true,
			},
			{
				name: 'tempo',
				type: 'INTEGER',
				description: 'Tempo que a pessoa vai ficar timedout (em segundos)',
				required: false,
			},
			{
				name: 'razão',
				type: 'STRING',
				description: 'Razão para o timeout',
				required: false,
			}],
			defaultperms: false,
			cmdperms: [
				{
					id: '510848401169186816',
					type: 'ROLE',
					permission: true,
				},
			],
		});
	}

	async run(message, args) {
		const member = message.guild.members.cache.get(args[0]) || message.member;
		if ((message.member.permissions.has('MODERATE_MEMBERS') && member.moderatable)) {
			if (member.isCommunicationDisabled() || !args[1]) {
				member.timeout(null);
				return message.reply(`${member} ficou **sem timeout**.`);
			}
			else {
				if (!args[2]) args[2] = '';
				member.timeout(args[1] * 1000, args[2] + ' (' + message.member.user.username + ')');
				return message.reply(`${member} levou **timeout de ${args[1]} segundos**.`);
			}
		}
		else if (!member.moderatable) {
			return message.reply('Esse utilizador não pode levar timeout.');
		}
		else {return message.reply('Não tens permissão para isto.');}
	}
};