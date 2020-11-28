const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Staffd do Discord',
	DISCORD_PARTNER: 'Parceiro do Discord',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Nível 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Nível 2)',
	HYPESQUAD_EVENTS: 'Eventos da HypeSquad',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'Sistema',
	VERIFIED_BOT: 'Bot Verificado',
	VERIFIED_DEVELOPER: 'Desenvolvedor de Bots Verificado'
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ui' , 'member', 'user', 'uinfo', 'usrinfo', 'memberinfo', 'minfo'],
            description: 'Mostra a informação sobre um membro'
        });
    }

    async run(message, [target]) {
        const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;

        const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
        const userFlags = member.user.flags.toArray();
        const embed = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic : true, size: 4096 }))
        .setColor(member.displayHexColor)
        .addField(member.user.username, [
            `**• Username:** ${member.user.username} #${member.user.discriminator}`,
            `**• ID:** ${member.user.id}`,
            `**• Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nenhum'}`,
            `**• Avatar:** [Link](${member.user.displayAvatarURL({dynamic : true})})`,
            `**• Criou conta a:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
            `**• Estado:** ${member.user.presence.status}`,
            `\u200b`
        ])
        .addField('Member',[
            `**• Role Principal:** ${member.roles.highest.id === message.guild.id ? 'Nenhum' : member.roles.highest.name}`,
            `**• Juntou-se a:** ${moment(member.joinedAt).format('LL LTS')}`,
            `**• Role:** ${member.roles.hoist ? member.roles.hoist.name : 'Nenhum'}`,
            `**• Roles:** [${roles.length}]: ${roles.length < 10 ? roles.join(', ') : roles.length >9 ? this.client.utils.trimArray(roles) : 'Nenhum'}`
            ])
        .setTimestamp()
        .setFooter(`${message.guild.name}`,message.guild.iconURL({dynamic: true}));

    return message.channel.send(embed);
    }

}