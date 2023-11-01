const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('simularguildmemberadd')
		.setDescription('Simula o evento GuildMemberAdd!'),

    // Definindo a função que será executada quando o comando for acionado
	async execute(interaction) {
        const member = interaction.member;
        interaction.client.emit('guildMemberAdd', member)
        await interaction.reply({content: `Evento GuildMemberAdd simulado para ${member}`})
    }
    
}