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
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "GTA")
                        );
                    }
                    //cs
                    if (messageReaction.emoji.id == 612351414395469824) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "CS")
                        );
                    }
                    //lol
                    if (messageReaction.emoji.id == 612351828473937951) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "LoL")
                        );
                    }
                    //Anime
                    if (messageReaction.emoji.id == 721816608108183583) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "Weeb")
                        );
                    }
                    //MC
                    if (messageReaction.emoji.id == 722166993779949789) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "Minecraft")
                        );
                    }
                    //Amongus
                    if (messageReaction.emoji.id == 754373354982735872) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "Among Us")
                        );
                    }
                    //F1
                    if (messageReaction.emoji.id == 771060089498501141) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "F1")
                        );
                    }
                    //UFC
                    if (messageReaction.emoji.id == 771060089367953408) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "UFC")
                        );
                    }
                    //Apex
                    if (messageReaction.emoji.id == 771062410923868221) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "Apex")
                        );
                    }
                    //Genshin
                    if (messageReaction.emoji.id == 771060542918885436) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "Genshin")
                        );
                    }
                    //Cyberpunk
                    if (messageReaction.emoji.id == 771060089556697128) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "Cyberpunk")
                        );
                    }
                    //phasmo
                    if (messageReaction.emoji.id == 777599465888284702) {
                        member.roles.add(
                            member.guild.roles.cache.find(role => role.name === "Phasmophobia")
                        );
                    }
                    console.log(`Adicionado ${messageReaction.emoji.name} a alguém.`)
                }
            }
        }
    }

}