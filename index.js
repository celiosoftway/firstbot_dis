const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] })

//Collection para utilizar no handler de comandos
client.commands = new Collection()

//variaveis do arquivo .env
require("dotenv").config();

// handler de comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandsFile = fs.readdirSync(commandsPath).filter(File => File.endsWith(".js"))

for (const file of commandsFile) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)

	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command)
	} else {
		console.log(`Esse comando em ${filePath} esta com "data" ou "execute" ausente`)
	}
}

// handler de eventos
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// login do bot usando o TOKEN do arquivo .env
client.login(process.env.TOKEN)
