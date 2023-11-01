// comando retorna com a resposta Pong! de forma privada

const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pping")
        .setDescription("Responde com pong! com mensagem privada"),

    async execute(interection) {
        await interection.reply({ content: 'Privado Pong!', ephemeral: true });
    }
}