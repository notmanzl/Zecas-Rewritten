const Event = require('../structures/event');
const { MongoClient } = require('mongodb');

function getLevel(experience){
    return Math.floor(Math.sqrt(experience)/10);
}

async function voiceXP(client) {
    client.guilds.cache.forEach((guild) => {
        guild.channels.cache.forEach((channel) => {
            if (channel.type == "voice" && channel != guild.afkChannel && channel.members.filter(member => !member.user.bot && !member.voice.mute && !member.voice.deaf).size > 1) {
                channel.members.filter(member => !member.user.bot && !member.voice.mute && !member.voice.deaf).forEach(async (member) => {

                    const query = await client.mongoDB.db('Discord').collection('experience').findOne({ guildId: member.guild.id, userId: member.id });

                    const xpGained = client.utils.getRndInteger(5, 20)/10;

                    const experience = query === null ? xpGained : query.experience + xpGained;


                    await client.mongoDB.db('Discord').collection('experience').updateOne(
                        { guildId: member.guild.id, userId: member.id },
                        {
                            $set: {
                                guildId: member.guild.id,
                                userId: member.id,
                                guildName: member.guild.name,
                                userName: member.user.username,
                                experience: experience

                            }
                        }, { upsert: true });

                    if (query === null) return;
                    if (client.utils.getLevel(experience) > client.utils.getLevel(query.experience)) return member.send(`Subiste para o nível ${client.utils.getLevel(experience)} em ${member.guild.name}!`);
                    
                    console.log("[VoiceXP] " + member.user.username + " - " + experience);
                    console.log("[VoiceXP] " + member.user.username + " - " + xpGained);

                })
            }
        });
    });
    setTimeout(voiceXP.bind(null, client), 60000);
}

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true
        });
    }

    async run() {

        console.log([`Loggado como ${this.client.user.username}!`,
        `Carregados ${this.client.commands.size} comandos!`,
        `Carregados ${this.client.events.size} eventos!`
        ].join('\n'));

        this.client.user.setActivity('@notmanzl', { type: 'WATCHING' });

        if (this.client.guilds.cache.get("337617578128048129")) {
            this.client.guilds.cache
                .get("337617578128048129")
                .rulesChannel
                .messages.fetch("612960847160934400")
                .then(function (message) {
                    //gta
                    message.react(message.guild.emojis.cache.get("612349938214502495"));
                    //cs
                    message.react(message.guild.emojis.cache.get("612351414395469824"));
                    //lol
                    message.react(message.guild.emojis.cache.get("612351828473937951"));
                    //Anime
                    message.react(message.guild.emojis.cache.get("721816608108183583"));
                    //MC
                    message.react(message.guild.emojis.cache.get("722166993779949789"));
                    //amongus
                    message.react(message.guild.emojis.cache.get("754373354982735872"));
                    //f1    
                    message.react(message.guild.emojis.cache.get("771060089498501141"));
                    //ufc
                    message.react(message.guild.emojis.cache.get("771060089367953408"));
                    //apex
                    message.react(message.guild.emojis.cache.get("771062410923868221"));
                    //genshin
                    message.react(message.guild.emojis.cache.get("771060542918885436"));
                    //cyberpunk
                    message.react(message.guild.emojis.cache.get("771060089556697128"));
                    //phasmo
                    message.react(message.guild.emojis.cache.get("777599465888284702"));
                });
        }
        voiceXP(this.client);
    }

}