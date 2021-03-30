const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
    DISABLED: 'Desligado',
    MEMBERS_WITHOUT_ROLES: 'Sem role',
    ALL_MEMBERS: 'Everyone'
};
const verificationLevels = {
    NONE: 'Nenhum',
    LOW: 'Baixo',
    MEDIUM: 'Médio',
    HIGH: 'Alto',
    VERY_HIGH: 'Muito Alto'
};
const regions = {
    brazil: 'Brasil',
    europe: 'Europa',
    hongkong: 'Hong Kong',
    india: 'Índia',
    japan: 'Japão',
    russia: 'Rússia',
    singapore: 'Singapura',
    southafrica: 'Áfria do Sul',
    sydney: 'Sydney',
    'us-central': 'EUA Central',
    'us-east': 'EUA Este',
    'us-west': 'EUA Oeste',
    'us-south': 'EUA Sul'
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['si', 'svinfo', 'server', 'guildinfo', 'guild'],
            category: 'Informação',
            description: 'Mostra a informação do servidor'
        });
    }

    async run(message) {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setDescription(`**Informação sobre __${message.guild.name}__**`)
            .setColor(message.member.displayColor)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }))
            .addField('Geral', [
                `**• Nome:** ${message.guild.name}`,
                `**• ID:** ${message.guild.id}`,
                `**• Dono:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
                `**• Região:** ${regions[message.guild.region]}`,
                `**• Nível de Boost:** ${message.guild.premiumTier ? `Nível ${message.guild.premiumTier}` : 'Nenhum'}`,
                `**• Filtro Explícito:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**• Nível de Verificação:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**• Data de Criação:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                '\u200b'
            ])
            .addField('Estatísticas', [
                `**• Número de Roles:** ${roles.length}`,
                `**• Número de Emojis:** ${emojis.size}`,
                `**• Número de Emojis Normais:** ${emojis.filter(emoji => !emoji.animated).size}`,
                `**• Número de Emojis Animados:** ${emojis.filter(emoji => emoji.animated).size}`,
                `**• Número de Membros:** ${message.guild.memberCount}`,
                `**• Humanos:** ${members.filter(member => !member.user.bot).size}`,
                `**• Bots:** ${members.filter(member => member.user.bot).size}`,
                `**• Channels de Texto:** ${channels.filter(channel => channel.type === 'text').size}`,
                `**• Channels de Voz:** ${channels.filter(channel => channel.type === 'voice').size}`,
                `**• Boosts:** ${message.guild.premiumSubscriptionCount || '0'}`,
                '\u200b'
            ])
            .addField('Presence', [
                `**• Online:** ${members.filter(member => member.presence.status === 'online').size}`,
                `**• Ausente:** ${members.filter(member => member.presence.status === 'idle').size}`,
                `**• Ocupado:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                `**• Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
                '\u200b'
            ])
            .addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Nenhum')
            .setTimestamp();
        message.channel.send(embed).then(msg => {
            if (!message.channel.name.includes('spam')) {
                msg.edit(msg.content + "\n*(Este comando será apagado após 10segs)*").then(msg => {
                    setTimeout(() => msg.delete(), 10000);
                })
                setTimeout(() => message.delete(), 10000);
            }
        });
    }

}