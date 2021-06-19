const path = require('path')
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./command.js');
const Event = require('./event.js')

module.exports = class Util {

    constructor(client) {
        this.client = client;
    }

    isClass(input) {
        return typeof input === 'function' && 
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
    }

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    }

    async loadCommands () {
        return glob(`${this.directory}commands/**!(disabled)/*.js`).then(commands => {
            for (const commandFile of commands) {
                delete require.cache[commandFile];
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if (!this.isClass(File)) throw new TypeError(`O comando ${name} não exporta uma classe.`);
                const command = new File(this.client, name.toLowerCase());
                if (!(command instanceof Command)) throw new TypeError(`O comando ${name} não pertence aos comandos.`);
                this.client.commands.set(command.name, command);
                if (command.aliases.length) {
                    for (const alias of command.aliases){
                        this.client.aliases.set(alias, command.name);
                    }
                }
            }
        })
    }

    async loadEvents() {
        return glob(`${this.directory}events/**/*.js`).then(events => {
            for (const eventFile of events) {
                delete require.cache[eventFile];
                const { name } = path.parse(eventFile);
                const File = require(eventFile);
                if (!this.isClass(File)) throw new TypeError(`O evento ${name} não exporta uma classe.`);
                const event = new File(this.client, name);
                if(!(event instanceof Event)) throw new TypeError(`O evento ${name} não pertence aos eventos.`);
                this.client.events.set(event.name, event);
                event.emitter[event.type](name, (...args) => event.run(...args));
            }
        })
    }

    trimArray(arr, maxlen = 10) {
        if(arr.length > maxlen) {
            const len = arr.length - maxlen;
            arr = arr.slice(0, maxlen);
            arr.push(`Mais ${len}...`)
        }
        return arr;
    }

    removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    capitalise(string ){
        return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
    }

    checkOwner(target){
        return this.client.owners.includes(target.id)
    }

    getLevel(experience){
        return Math.floor(Math.sqrt(experience)/10);
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    getExperience(level){
        return Math.pow(10 * (level), 2)
    }

    async getRank(message, member){
        const query = await this.client.mongoDB.db('Discord').collection('experience').find({guildId : message.guild.id}).toArray();
        

        const sorted_query = query.sort(function(a,b) {return b.experience - a.experience});


        for(let i = 0 ; i < sorted_query.length ; i++){
            if(sorted_query[i].userId === member.user.id) return i + 1;
        }
        return
    }
}