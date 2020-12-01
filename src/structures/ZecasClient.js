const { Client, Collection } = require('discord.js');
const Util = require('./util.js');

module.exports = class ZecasClient extends Client {

    constructor(options = {}) {
        super({
            disableMentions: 'everyone'
        });
        this.validate(options);

        this.commands = new Collection();

        this.aliases = new Collection();

        this.events = new Collection();

        this.utils = new Util(this);

        this.owners = options.owners;

    }

    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

        if (!options.token) throw new Error('Sem Token na configuração.');
        this.token = options.token;

        if (!options.prefix) throw new Error('Sem prefixo na configuração.');
        if (typeof options.prefix !== 'string') throw new TypeError('O prefixo não é uma string.');
        this.prefix = options.prefix;
    }

    async start(token = this.token) {
        this.utils.loadCommands();
        this.utils.loadEvents();
        super.login(token);
    }

};