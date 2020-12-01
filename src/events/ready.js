const Event = require('../structures/event');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true
        });
    }

    run() {
        console.log([`Loggado como ${this.client.user.username}!`, 
            `Carregados ${this.client.commands.size} comandos!`,
            `Carregados ${this.client.events.size} eventos!`
            ].join('\n'));

        this.client.user.setActivity('@notmanzl', { type: 'WATCHING' });

    }

}