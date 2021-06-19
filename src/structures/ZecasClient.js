const { Client, Collection, Permissions, Intents } = require('discord.js');
const Util = require('./util.js');
const { MongoClient } = require('mongodb');

module.exports = class ZecasClient extends Client {

    constructor(options = {}) {
        super({
            disableMentions: 'everyone',  intents: Intents.ALL 
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
        
        if (!options.uri) throw new Error('You must pass a mongoDB uri for the client.');
        if (typeof options.uri !== 'string') throw new TypeError('MongoDB uri should be a type of String.');
        this.mongoDBuri = options.uri;
    }

    async start(client, token = this.token){
        this.utils.loadCommands();
        this.utils.loadEvents();
        this.mongoDB = await new MongoClient.connect(this.mongoDBuri, { useNewUrlParser: true, useUnifiedTopology: true }).then().catch();
        super.login(token);
    }

};