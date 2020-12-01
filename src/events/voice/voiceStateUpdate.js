const Event = require('../../structures/event');

module.exports = class extends Event {

    async run(oldState, newState) {
        if(oldState.channel) {
            var parent = oldState.guild.channels.cache.find(ch => ch.name === 'Temporário');
            if(!parent) return;
            if (oldState.channel.parent == parent) {
                if (oldState.channel.members.size == 0) {
                    oldState.channel.delete();
                }
            }
        }
    }

}