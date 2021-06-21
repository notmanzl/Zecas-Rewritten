const Command = require('../../structures/command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['cor'],
            category: 'Utilidade',
            description: 'Muda a tua cor',
            usage: "<Cor>",
            args: true,
            cmdoptions: [{
				name: "cor",
				type: "STRING",
				description: `Cor com que queres ficar ("reset" para ficares sem cores)`,
				required: true,
			}],
            defaultperms: false,
            cmdperms: [
                {
                    id: '568144642131099663',
                    type: 'ROLE',
                    permission: true,
                }
            ]
        });
    }

    async run(message, args, notspam) {

        function findRole(Guild, string) {
            return Guild.roles.cache.find(role => role.name === string);
        }

        var ccolor = args[0];
        if (message.member.permissions.has('MANAGE_EMOJIS')) {
            var memberRoles = message.member.roles.cache.array();
            if (ccolor == "reset") {
                for (var i = 0; i < memberRoles.length; i++) {
                    if (memberRoles[i].name.startsWith("#")) {
                        message.member.roles.remove(memberRoles[i]);
                    }
                }
                message.reply({ content: "Ficaste sem cores.", ephemeral: notspam });
            } else if (
                ccolor.startsWith("#") ||
                findRole(message.guild, "#" + this.client.utils.capitalise(ccolor) + "$")
            ) {
                ccolor = ccolor.replace("#", "");
                if (
                    !findRole(message.guild, "#" + this.client.utils.capitalise(ccolor)) &&
                    !findRole(message.guild, "#" + this.client.utils.capitalise(ccolor) + "$")
                ) {
                    if (!(message.guild.roles.cache.find(role => role.hexColor.toLowerCase() === ("#" + ccolor.toLowerCase())))) {
                        message.guild
                            .roles.create(
                                {
                                        name: "#" + this.client.utils.capitalise(ccolor),
                                        color: ccolor,
                                })
                            .then(role => message.member.roles.add(role));
                    } else {
                        message.channel.send("Esta cor está a ser utilizada por um rank do servidor.");
                        return;
                    }
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
                message.reply({ content: "Ficaste com a cor `" + ccolor + "`.", ephemeral: notspam });
            } else if (message.guild.roles.cache.find(role => role.hexColor === ccolor.substring(1))) {
                console.log("ya");
            }
            else {
                message.reply({ content: "Cor inválida.", ephemeral: notspam });
            }
        } else {
            message.reply({ content: "Não tens permissão para isto.", ephemeral: notspam });
        }
    }

}