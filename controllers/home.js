module.exports = (app) => {
	
	const PessoasModel = app.models.pessoas;

	const HomeController = {
		index : (req, res) => {
			res.render('home/index');
		}

		,post: (req, res) => {
			let obj = req.body;
			console.log(obj);
			
			if (obj.tipo === '1') {
				obj['flgPassageiro'] = true;
			} else {
				obj['flgPassageiro'] = false;
			}

			delete obj['tipo'];
			
			let newPessoa = PessoasModel(obj);

			newPessoa.save(err => {
				if (err) {
					console.log(err);
				} else {
					console.log(`Salvo com sucesso!`);
					console.log(req.body);
				}
			});
			res.send();
		}

		,get: (req, res) => {
			PessoasModel.find({})
				.limit(20)
				.sort({ "_id": -1 })
				.select({'modeloCarro':false
					, '__v': false
					, 'dataNascimento': false
					, 'cpf': false, 'sexo': false
					, 'modeloCarro': false
					, 'corridas': false})
				.exec((err, data) => {
					if (!err) {
						res.json(data);
						console.log(data);
					}
				});
		}

		, getPesquisa: (req, res) => {
			let query = {}
				, texto = req.params.texto
				, tipoPessoa = req.params.tipoPessoa
				;

			let re = /^[a-zA-Z ]{3,30}$/;

			query.nome = new RegExp(texto, 'i');

			if (tipoPessoa === 'passageiro') {
				query.flgPassageiro = true;
			} else if (tipoPessoa === 'motorista') {
				query.flgPassageiro = false;
			}
			console.log(`Query: \n\n`, query);

			if (re.test(texto)) {
				PessoasModel.find(query)
					.select({
						'modeloCarro': false
						, '__v': false
						, 'dataNascimento': false
						, 'cpf': false, 'sexo': false
						, 'modeloCarro': false
						, 'corridas': false
					})
					.exec((err, data) => {
						res.status(200).json(data);
					})
			}
		}
	};
	return HomeController;
};