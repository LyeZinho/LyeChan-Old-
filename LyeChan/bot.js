const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const secrets = require('./dados/bot_secret.json');
const { prefix } = require('./dados/config.json');





/*-----------------------------------------Login log-----------------------------------------------*/
client.once('ready', () => {
    let token = '';
    let id = '';
    const webhookClient = new Discord.WebhookClient(id, token);

    const embed = new Discord.MessageEmbed()
        .setTitle('✅**-<Logado com sucesso>-**✅')
        .setColor('#0099ff');

    webhookClient.send(embed);
});
/*/*---------------------------------------------------------------------------------------------------*/



//Captura eventos comuns
/*-----------------------------------------Event Handler-----------------------------------------------*/
const eventFiles = fs.readdirSync('./eventos').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./eventos/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
/*-------------------------------------------------------------------------------------------------------*/




//Captura os commandos
/*-----------------------------------------Command Handler-----------------------------------------------*/


const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Um erro ocorreu!');
	}
});
/*-------------------------------------------------------------------------------------------------------*/



//base de dados
/*-----------------------------------------Database------------------------------------------------------*/


    

    client.on('guildMemberAdd', member => {

        let userTable = {
            userId:`${message.author.id}`,
            userName:`${message.author.name}`,
            userMoney:0,
            userXp:0,
            userInventory:[],
            usersBadges:[],
            redistred:true
        };
        
    })
/*-------------------------------------------------------------------------------------------------------*/




client.login(secrets.token);