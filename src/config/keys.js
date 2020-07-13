// Para executar o app localmente,
// é necessário criar o arquivo dev.js
// com todas as chaves definidas em prod.js
if (process.env.NODE_ENV == 'production') {
	//console.log("Executando em modo de produção, na posta: ", process.env.PORT);
	module.exports = require('./prod')
} else {
	module.exports = require('./dev')
}
