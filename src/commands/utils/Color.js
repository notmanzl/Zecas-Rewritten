const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['cor'],
            category: 'Utilidade',
            description: 'Muda a tua cor',
            usage: "<cor>",
            args: true
        });
    }

    async run(message, args) {

        function findRole(Guild, string) {
            return Guild.roles.cache.find(role => role.name === string);
        }

        var ccolor = args[0];
        if (message.member.hasPermission('MANAGE_EMOJIS')) {
            if (message.channel.name.includes("spam")) {
                var memberRoles = message.member.roles.cache.array();
                if (ccolor == "reset") {
                    for (var i = 0; i < memberRoles.length; i++) {
                        if (memberRoles[i].name.startsWith("#")) {
                            message.member.roles.remove(memberRoles[i]);
                        }
                    }
                    message.channel.send("Ficaste sem cores.");
                } else if (
                    ccolor.startsWith("#") ||
                    findRole(message.guild, "#" + this.client.utils.capitalise(ccolor) + "$")
                ) {
                    ccolor = ccolor.replace("#", "");
                    if (
                        !findRole(message.guild, "#" + this.client.utils.capitalise(ccolor)) &&
                        !findRole(message.guild, "#" + this.client.utils.capitalise(ccolor) + "$")
                    ) {
                        message.guild
                            .roles.create(
                                {
                                    data: {
                                        name: "#" + this.client.utils.capitalise(ccolor),
                                        color: ccolor,
                                    }
                                })
                            .then(role => message.member.roles.add(role));
                    } else {
                        if (findRole(message.guild, "#" + this.client.utils.capitalise(ccolor))) {
                            message.member.roles.add(
                                findRole(message.guild, "#" + this.client.utils.capitalise(ccolor))
                            );
                        } else {
                            message.member.roles.add(
                                findRole(message.guild, "#" + this.client.utils.capitalise(ccolor) + "$")
                            );
                        }
                    }
                    for (var i = 0; i < memberRoles.length; i++) {
                        if (memberRoles[i].name.startsWith("#")) {
                            if (
                                memberRoles[i] !=
                                findRole(message.guild, "#" + this.client.utils.capitalise(ccolor)) &&
                                memberRoles[i] !=
                                findRole(message.guild, "#" + this.client.utils.capitalise(ccolor) + "$")
                            ) {
                                message.member.roles.remove(memberRoles[i]);
                            }
                        }
                    }
                    message.channel.send(
                        "Ficaste com a cor `" + ccolor + "`."
                    );
                } else {
                    message.channel.send("Cor inválida.");
                }
            } else {
                message.channel.send(
                    "Só podes mudar de cor num channel que tenha `spam` no nome."
                );
            }
        } else {
            message.channel.send("Não tens permissão para isto.");
        }
    }

}