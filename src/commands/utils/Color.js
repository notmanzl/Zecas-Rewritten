const Command = require('../../structures/command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['cor'],
			category: 'Utilidade',
			description: 'Muda a tua cor',
			usage: '<Cor>',
			args: true,
			cmdoptions: [{
				name: 'cor',
				type: 'STRING',
				description: 'Cor com que queres ficar ("reset" para ficares sem cores)',
				required: true,
			}],
			defaultperms: false,
			cmdperms: [
				{
					id: '568144642131099663',
					type: 'ROLE',
					permission: true,
				},
			],
		});
	}

	async run(message, args, notspam) {

		// REGEX CORES VÁLIDAS
		const hexreg = /^#([0-9a-f]{3}){1,2}$/i;

		// ENCONTRAR ROLE
		function findRole(Guild, string) {
			return Guild.roles.cache.find(role => role.name === string);
		}

		// APAGAR OUTRAS CORES
		function removeRoles(memberRoles) {
			for (let i = 0; i < memberRoles.length; i++) {
				if (memberRoles[i].name.startsWith('#')) {
					message.member.roles.remove(memberRoles[i]);
				}
			}
		}

		// ADD # AND UPPERCASE
		let ccolor = args[0].toUpperCase();
		if (!ccolor.startsWith('#')) {
			ccolor = '#' + ccolor;
		}

		// FORMATTING CHECK
		if (!hexreg.test(ccolor) && !findRole(message.guild, this.client.utils.capitalise(ccolor) + '$') && ccolor !== '#RESET') {
			return message.reply('Cor inválida.');
		}


		if (message.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) {
			const memberRoles = Array.from(message.member.roles.cache.map(r => r));

			// RESET CORES
			if (ccolor == '#RESET') {
				removeRoles(memberRoles);
				return message.reply({ content: 'Ficaste sem cores.', ephemeral: notspam });
			}

			// CORES PADRÃO
			if (findRole(message.guild, ccolor + '$')) {
				removeRoles(memberRoles);
				const corrole = await findRole(message.guild, ccolor + '$');
				message.member.roles.add(corrole);
				return message.reply({ content: 'Ficaste com a cor `' + ccolor + '`.', ephemeral: notspam });
			}
			// CORES EXISTENTES NÃO PADRÃO
			else if (findRole(message.guild, ccolor)) {
				removeRoles(memberRoles);
				const corrole = await findRole(message.guild, ccolor);
				message.member.roles.add(corrole);
				return message.reply({ content: 'Ficaste com a cor `' + ccolor + '`.', ephemeral: notspam });
			}
			// CHECK CORES RANK
			else if (message.guild.roles.cache.find(role => role.hexColor.toUpperCase() === ccolor)) {
				return message.reply('Esta cor está a ser utilizada por um rank do servidor.');
			}
			// CORES NÃO EXISTENTES
			else {
				removeRoles(memberRoles);
				message.guild
					.roles.create(
						{
							name: ccolor,
							color: ccolor,
						})
					.then(role => message.member.roles.add(role));
				return message.reply({ content: 'Ficaste com a cor `' + ccolor + '`.', ephemeral: notspam });
			}

		}
		else {
			message.reply({ content: 'Não tens permissão para isto.', ephemeral: notspam });
		}
	}

};