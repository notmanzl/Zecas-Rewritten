const Event = require('../../structures/event');

module.exports = class extends Event {

    async run(invite) {
        if(invite.maxAge > 3600 || invite.maxUses > 5) {
            invite.delete();
            invite.inviter.send("O invite que criaste foi apagado por questões de segurança, para criares um invite usa **!invite**.");
        }
    }

}