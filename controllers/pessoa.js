module.exports = (app) => {
	const PessoaModel = app.models.pessoas;

	const PessoaController = {
		get : (req, res) => {
			let query = { '_id': req.params.id };
			console.log(`\n\nQuery: ${query} ID ${req.params.id}\n\n`);
			PessoaModel.findOne(query)
			.exec((err, data) => {
				if (!err) {
					console.log(`\nEncontrado!`);
					// console.dir(data);
					data = data['_doc'];

					let dataNascimento = new Date(data.dataNascimento);
					let dd = dataNascimento.getDate();
					let mm = dataNascimento.getMonth() + 1;
					let yyyy = dataNascimento.getFullYear();
					data.dataNascimento = dd + '/' + mm + '/' + yyyy;

					if (typeof data.status === 'boolean' && data.status === true) {
						data.status = 'Ativo';
					} else if (data.status === false) {
						data.status = 'Inativo';
					}

					if (data.sexo === '1') {
						data.sexo = 'Feminino';
					} else if (data.sexo === '2') {
						data.sexo = 'Masculino';
					}

					if (data.flgPassageiro === false) {
						data.flgPassageiro = 'Motorista';
					} else {
						data.flgPassageiro = 'Passageiro';
					}
					res.render('pessoa/index', { 'data': data });
				}
			})
		}
	};

	return PessoaController;
};