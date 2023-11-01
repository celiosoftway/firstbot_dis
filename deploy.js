const { REST, Routes } = require('discord.js');

const dotenv = require('dotenv')
const { error } = require("node:console")
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

const fs = require('node:fs');
const path = require('node:path');

const commands = []
const commandsPath = path.join(__dirname,"commands")
const commandsFile = fs.readdirSync(commandsPath).filter(File => File.endsWith(".js"))

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandsFile) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


// Construct and prepare an instance of the REST module
const rest = new REST().setToken(TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
