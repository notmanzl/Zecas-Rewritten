const path = require('path')
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./command.js');

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
        return glob(`${this.directory}commands/**/*.js`).then(commands => {
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

}