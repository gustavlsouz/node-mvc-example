module.exports = (app) => {
	const Schema = require('mongoose').Schema;

	const passageiroDeCorrida = Schema({
		id: { type: String, required: true }
		, nome: { type: String, required: true }
	});

	const corridas = Schema({
		passageiro: { type: passageiroDeCorrida }
		, valor: { type: Number }
	});

	const pessoa = Schema({
		nome: { type: String, required: true }
		, dataNascimento: { type: Date, required: true }
		, cpf: { type: String, required: true }
		, sexo: { type: String, required: true }
		
		, flgPassageiro: { type: Boolean }
		
		/* Para motoristas */
		, modeloCarro: { type: String }
		, status: { type: Boolean }
		, corridas: [corridas]
	});

	return db.model('pessoas', pessoa)
};