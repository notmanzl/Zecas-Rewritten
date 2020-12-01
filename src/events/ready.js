const Event = require('../structures/event');

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

}