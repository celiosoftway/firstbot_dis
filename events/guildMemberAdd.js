const { Events, AttachmentBuilder } = require('discord.js');
const path = require('path');
require("dotenv").config();

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const Canvas = require('canvas')

        const channel_id = process.env.ID_CANAL;
        const channel = member.guild.channels.cache.get(channel_id);

        if (!channel) return;

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(path.join(__dirname, '../background.png'));

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.font = '36px sans';
        ctx.fillStyle = '#ffffff';

        const text = `Bem vindo ${member.user.tag}`;
        const textWidth = ctx.measureText(text).width;
        ctx.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 5);

        ctx.fillStyle = '#a1b2c3';
        const memberCount = member.guild.memberCount;
        const message = `Membros: ${memberCount}`;
        const textWidthMessage = ctx.measureText(message).width;
        ctx.fillText(message, canvas.width / 2 - textWidthMessage / 2, canvas.height / 1.1);

        const avatarURL = member.user.displayAvatarURL({ extension: "png" });
        const avatarImage = await Canvas.loadImage(avatarURL);

        const x = canvas.width / 2 - 64;
        const y = canvas.height / 2 - 64;

        ctx.beginPath();
        ctx.arc(x + 64, y + 64, 70, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 64, y + 64, 64, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatarImage,
            x,
            y,
            120,
            128
        );

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome-image.png' });
        channel.send({ content: `Bem vindo ${member}!`, files: [attachment] })
    }
}