const Event = require('../../structures/event');

module.exports = class extends Event {

    async run(messageReaction, user) {
        if (messageReaction.message.author.id == 511614459672920079) {
            if (messageReaction.message.channel.id == 612345060008132620) {
                if (messageReaction.partial) await messageReaction.fetch();
                if (user.id != 511614459672920079) {
                    var member = messageReaction.message.guild.members.cache.get(user.id);
                    //gta
                    if (messageReaction.emoji.id == 612349938214502495) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "GTA")
                        );
                    }
                    //lol
                    if (messageReaction.emoji.id == 612351828473937951) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "LoL")
                        );
                    }
                    //MC
                    if (messageReaction.emoji.id == 722166993779949789) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "Minecraft")
                        );
                    }
                    //Valorant
                    if (messageReaction.emoji.id == 702266556117155860) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "Valorant")
                        );
                    }
                    //F1
                    if (messageReaction.emoji.id == 771060089498501141) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "F1")
                        );
                    }
                    //UFC
                    if (messageReaction.emoji.id == 771060089367953408) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "UFC")
                        );
                    }
                    //Genshin
                    if (messageReaction.emoji.id == 900153011303768085) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "Genshin")
                        );
                    }
                    //Anime
                    if (messageReaction.emoji.id == 721816608108183583) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "Anime")
                        );
                    }
                    //Futebol
                    if (messageReaction.emoji.id == 857017377219543050) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "Futebol")
                        );
                    }
                    //Gaming News
                    if (messageReaction.emoji.id == 857019715083436042) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "Gaming News")
                        );
                    }
                    //Free Games
                    if (messageReaction.emoji.id == 857019346622742548) {
                        member.roles.remove(
                            member.guild.roles.cache.find(role => role.name === "Free Games")
                        );
                    }
                    console.log(`Removido ${messageReaction.emoji.name} a alguém.`)
                }
            }
        }
    }
}