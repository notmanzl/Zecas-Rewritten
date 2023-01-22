const Command = require('../../structures/command');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['carta'],
            category: 'Fun',
            description: 'Tira uma carta aleatória',
            defaultperms: true,
        });
    }

    async run(message, args, notspam) {
        var imgArray = [
            "https://i.imgur.com/NipQh9Y.jpg",
            "https://i.imgur.com/K4O0tGX.png",
            "https://i.imgur.com/LSN5T7L.jpg",
            "https://i.imgur.com/Y744acM.png",
            "https://i.imgur.com/UQ4uSFh.png",
            "https://i.imgur.com/O8qbA4B.png",
            "https://i.imgur.com/DRYmFBd.png",
            "https://i.imgur.com/LZlcQFJ.png",
            "https://i.imgur.com/pXLq4Ab.jpg",
            "https://i.imgur.com/JhlTpxX.png",
            "https://i.imgur.com/y3E30xm.jpg",
            "https://i.imgur.com/7coo31q.jpg",
            "https://i.imgur.com/3zHsc7J.jpg",
            "https://i.imgur.com/5lcTfHY.jpg",
            "https://i.imgur.com/ixFM4tg.jpg",
            "https://i.imgur.com/ola0ryy.png",
            "https://i.imgur.com/dv6YNI6.png",
            "https://i.imgur.com/gbFZm8b.png",
            "https://i.imgur.com/68E2C96.jpg",
            "https://i.imgur.com/s55tRr6.jpg",
            "https://i.imgur.com/vKSiVxU.jpg",
            "https://i.imgur.com/4TG7NAF.jpg",
            "https://i.imgur.com/l3QY4Ir.png",
            "https://i.imgur.com/aVx3KcE.jpg",
            "https://i.imgur.com/DiQj3Yp.png",
            "https://i.imgur.com/GW3IUU3.jpg",
            "https://i.imgur.com/icdwBcj.jpg",
            "https://i.imgur.com/ZoeP3Np.jpg",
            "https://i.imgur.com/GMujLwX.jpg",
            "https://i.imgur.com/x0Jlpz1.png",
            "https://media.discordapp.net/attachments/174223143492255744/384061797591810051/doubt.jpg",
            "https://media.discordapp.net/attachments/174223143492255744/384059061534064662/roach.jpg",
            "https://media.discordapp.net/attachments/174134682454065154/384059446537617408/createcard.jpg",
            "https://media.discordapp.net/attachments/337617578128048129/384057459540492298/createcard.jpg",
            "https://media.discordapp.net/attachments/174134682454065154/384067167857147907/createcard_2.jpg",
            "https://media.discordapp.net/attachments/174134682454065154/384067631780724746/createcard_3.jpg",
            "https://media.discordapp.net/attachments/384068453373444096/384075064124899328/Screenshot_4.png",
            "https://media.discordapp.net/attachments/184400336612622336/384370480334766082/createcard.jpg",
            "https://media.discordapp.net/attachments/184400336612622336/384375796036403210/createcard.jpg",
            "https://i.imgur.com/qKJI0MU.jpg",
            "https://media.discordapp.net/attachments/384462530095087626/462439806819893258/createcard.png",
            "https://media.discordapp.net/attachments/337617578128048129/463485552537108497/createcard.png"
        ];
        var card = Math.floor(Math.random() * imgArray.length);
        const attachment = new MessageAttachment(`${imgArray[card]}`);
        console.log(card);
        return message.reply({
            files: [imgArray[card]]
        });

    }


}