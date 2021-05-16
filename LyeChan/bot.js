

//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./_modulos_/config.json')
const db = require('crud-db');
const fs = require('fs');
//Crud-db
db.initialize();
//Firebase
var firebase = require('firebase');
let config = require('./_modulos_/firebaseConfig.json');
firebase.initializeApp(config);
let database = firebase.database()
//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
/*
*
*
*
*
*
*
*/
//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


client.on('guildDelete', guild => {
	db.vanish(`${guild.id}`);
})


client.on('guildCreate', guild => {

	let data = {
		name: guild.name,
		region: guild.region,
		prefix: "$",
		registred: true
	}
	db.add(`${guild.id}`, data);
})



//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
/*
*
*
*
*
*
*
*/
//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

const eventFiles = fs.readdirSync('./_modulos_/eventos').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./_modulos_/eventos/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
/*
*
*
*
*
*-[command handler]
*
*/
//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./_modulos_/comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./_modulos_/comandos/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {

	//Coleta o prefixo na base de dados
	let data = db.get(message.guild.id);
	let prefix = data.prefix;

	if (!message.content.startsWith(prefix) || message.author.bot) return;


	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;


	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
/*
*
*
*
*
*
*
*/
//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

//————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
client.login(config.token);
