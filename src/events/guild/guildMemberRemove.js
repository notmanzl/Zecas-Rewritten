const Event = require('../../structures/event');

module.exports = class extends Event {

    async run(GuildMember) {
        if ((!GuildMember.guild.id === '337617578128048129')) return;

        const msgreactions =  GuildMember.guild.rulesChannel.messages.cache.get("612960847160934400").reactions.cache;
        const user = GuildMember.user;

        msgreactions.forEach(reaction => reaction.users.remove(user));
            
    }

}