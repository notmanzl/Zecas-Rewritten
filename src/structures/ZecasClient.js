const { Client } = require('discord.js');

module.exports = class ZecasClient extends Client {

    constructor(options = {}) {
        super({
            disableMentions: 'everyone'
        });
        this.validate(options);

        this.once('ready', () => {
            console.log(`Loggado como ${this.user.username}!`);
        })

        this.on('message', async (message) => {
            const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
            const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);

            if (!message.guild || message.author.bot) return;

            if (message.content.match(mentionRegex)) message.channel.send(`O meu prefixo para ${message.guild.name} é \`${this.prefix}\`.`);

            const prefix = message.content.match(mentionRegexPrefix) ?
                message.content.match(mentionRegexPrefix)[0] : this.prefix;


            const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

            if (cmd.toLowerCase() === 'hello') {
                message.channel.send('boas mpt');
            }
        });
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
        super.start(token);
    }

};