// comando retorna com a resposta Pong!

const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com pong!"),

  async execute(interection) {
    await interection.reply("Pong!")
  }
}