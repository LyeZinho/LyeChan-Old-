module.exports = {
	name: 'registrar',
	description: 'Registra usuarios na firebase',
	execute(message, args) {

		//Data
        const db = require('crud-db');
		db.initialize();
		const Discord = require('discord.js');
		//Data
		
		let userdata = {
			name: message.author.name,
			//Rankeamento
			/*
			Rank: Classificação em classes
			Power/poder: Valor numerico em relação aos items e atributos
			rank e poder influencia no match making
			*/
			rank: 'bronze',
			power: 100,
			//Vida
			resitence:0,//Atributo especial
			life: 100,

			//Mana
			magicpower: 0,//Atributo especial
			mana: 20,

			//Inventario do usuario
			inventory: {
				slot_0: {
					item_name:'',
					amount: 0
				},
				slot_1: {
					item_name:'',
					amount: 0
				},
				slot_2: {
					item_name:'',
					amount: 0
				},
				slot_3: {
					item_name:'',
					amount: 0
				},
				slot_4: {
					item_name:'',
					amount: 0
				},
				slot_5: {
					item_name:'',
					amount: 0
				},
				slot_6: {
					item_name:'',
					amount: 0
				}
			},

			//Atributos negativos ou positivos
			stats: {
				slot_0:{
					name:'',
					time:0
				},
				slot_1:{
					name:'',
					time:0
				},
				slot_2:{
					name:'',
					time:0
				}
			}
			//
			

		}

	},
};