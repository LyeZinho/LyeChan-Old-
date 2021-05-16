module.exports = {
	name: 'registrar',
	description: 'Registra usuarios na firebase',
	execute(message, args) {
		
        
        database.ref('customPath').once('value').then(function(snapshot) {
            console.log( snapshot.val() )
        })
	},
};