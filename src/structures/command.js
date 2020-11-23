module.exports = class Command{

    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.description = options.description || "Sem descrição.";
        this.category = options.category || "Misc";
        this.usage = options.usage ||  "Uso não fornecido.";
    }

    async run(message, args){
        throw new Error(`O comando ${this.name} não fornece um método de execução!`);
    }

}