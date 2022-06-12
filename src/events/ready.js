/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
const Event = require('../structures/event');
const { MongoClient } = require('mongodb');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
// eslint-disable-next-line no-undef
const $ = (jQuery = require('jquery')(window));

function getLevel(experience) {
    return Math.floor(Math.sqrt(experience) / 10);
}

async function voiceXP(client) {
    client.guilds.cache.forEach((guild) => {
        guild.channels.cache.forEach((channel) => {
            if (channel.type == 'GUILD_VOICE' && channel != guild.afkChannel && channel.members.filter(member => !member.user.bot && !member.voice.mute && !member.voice.deaf).size > 1) {
                channel.members.filter(member => !member.user.bot && !member.voice.mute && !member.voice.deaf).forEach(async(member) => {

                    const query = await client.mongoDB.db('Discord').collection('experience').findOne({ guildId: member.guild.id, userId: member.id });

                    // eslint-disable-next-line no-shadow
                    const xpGained = (client.utils.getRndInteger(2, 10) / 10) * (1 + (channel.members.filter(member => !member.user.bot && !member.voice.mute && !member.voice.deaf).size / 10));

                    const experience = query === null ? xpGained : query.experience + xpGained;


                    await client.mongoDB.db('Discord').collection('experience').updateOne({ guildId: member.guild.id, userId: member.id }, {
                        $set: {
                            guildId: member.guild.id,
                            userId: member.id,
                            guildName: member.guild.name,
                            userName: member.user.username,
                            experience: experience,

                        },
                    }, { upsert: true });

                    if (query === null) return;
                    if (client.utils.getLevel(experience) > client.utils.getLevel(query.experience)) return member.send(`Subiste para o nível ${client.utils.getLevel(experience)} em ${member.guild.name}!`);

                    console.log('[VoiceXP] ' + member.user.username + ' - ' + experience);
                    console.log('[VoiceXP] ' + member.user.username + ' - ' + xpGained);

                });
            }
        });
    });
    setTimeout(voiceXP.bind(null, client), 60000);
}

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true,
        });
    }

    async run() {

        this.client.guilds.cache.forEach(g => {
            g.roles.fetch();
        });

        console.log([`Loggado como ${this.client.user.username}!`,
            `Carregados ${this.client.commands.size} comandos!`,
            `Carregados ${this.client.events.size} eventos!`,
        ].join('\n'));

        const clientuser = this.client.user;
        setInterval(() => {
            $.getJSON(
                'https://api.minetools.eu/ping/mc.manzl.pt/',
                function(json) {
                    if (json.error) {
                        clientuser.setActivity('@notmanzl', { type: 'WATCHING' });
                        // eslint-disable-next-line brace-style
                    } else {
                        clientuser.setActivity('mc.manzl.pt (' + json.players.online + '/' + json.players.max + ')', { type: 'PLAYING' });
                    }
                },
            );
        }, 30000);


        if (this.client.guilds.cache.get('337617578128048129')) {
            this.client.guilds.cache
                .get('337617578128048129')
                .rulesChannel
                .messages.fetch('612960847160934400')
                .then(function(message) {
                    // GTA
                    message.react(message.guild.emojis.cache.get('612349938214502495'));
                    // LoL
                    message.react(message.guild.emojis.cache.get('612351828473937951'));
                    // MC
                    message.react(message.guild.emojis.cache.get('722166993779949789'));
                    // Valorant
                    message.react(message.guild.emojis.cache.get('702266556117155860'));
                    // F1
                    message.react(message.guild.emojis.cache.get('771060089498501141'));
                    // UFC
                    message.react(message.guild.emojis.cache.get('771060089367953408'));
                    // Genshin
                    message.react(message.guild.emojis.cache.get('900153011303768085'));
                    // Anime
                    message.react(message.guild.emojis.cache.get('721816608108183583'));
                    // Futebol
                    message.react(message.guild.emojis.cache.get('857017377219543050'));
                    // Gaming News
                    message.react(message.guild.emojis.cache.get('857019715083436042'));
                    // Free Games
                    message.react(message.guild.emojis.cache.get('857019346622742548'));
                    // Lost Ark
                    message.react(message.guild.emojis.cache.get('942214840452276244'));
                });
        }
        voiceXP(this.client);
    }

};