var main = function() {
	// inicio
	var formCadastro = $('#cadastro');
	formCadastro.hide();

	var divBotaoCadastro = $('#containers-btn-cadastro');

	var divModeloCarro = $('#div-modeloCarro');
	divModeloCarro.hide();
	var divStatus = $('#div-status');
	divStatus.hide();

	// funções

	var init = function () {
		$.get('get', mount);
	};

	var mount = function (data) {
		console.log(data);

		let $tabela = $('<table>');
		for (let idx = 0; idx < data.length; idx++) {
			let inf = data[idx];

			if (inf.sexo === "2") {
				inf.sexo = 'Masculino';
			} else if (inf.sexo === "1") {
				inf.sexo = 'Feminino';
			}

			if (inf.status && inf.status === true) {
				inf.status = 'Ativo';
			} else if (inf.status === false) {
				inf.status = 'Inativo';
			} else {
				inf.status = '';
			}

			if (inf.flgPassageiro) {
				inf.nome += ' (Passageiro)';
			} else {
				inf.nome += ' (Motorista)';
			}
			delete inf.flgPassageiro;

			let $tr = $('<tr>');
			let $a = $('<a>');

			let id = inf['_id'];
			delete inf['_id'];
			$a.attr('href', '/pessoa/' + id);
			console.log('id ', id);

			Object.keys(inf).forEach(function (key) {
				let $th = $('<th>');
				$th.attr('name', key);

				if (key !== 'nome') {
					$th.text(inf[key]);
				} else {
					$a.text(inf[key]);
					$th.append($a);
				}

				$tr.append($th);
				$tabela.append($tr);
			});
		}
		$('#resultados').append($tabela);
	};
	
	var checkText = function(text) {
		
		if (text.length === 0 || text.trim() === '') {
			$.notify('Por favor, preencha todos os campos!', {'position': 'right down'});
			return false
		} 
		return true;
	};

	var makeObject = function(arrayOfObjects) {
		let obj = {};
		for (let idx = 0; idx < arrayOfObjects.length; idx++) {
			let el = arrayOfObjects[idx];
			let key = el.name;
			let value = el.value;
			obj[key] = value;
		}
		return obj;
	};

	var validateObj = function(obj) {
		let results = [];

		// passageiro
		if  (obj.tipo === "1") {
			delete obj['modeloCarro'];
			delete obj['status'];
		}

		Object.keys(obj).forEach(function(key) {
			results.push(checkText(obj[key]));
		});
		
		return { result: results, obj: obj};
	};

	var cleanForm = function(arrayForm) {
		arrayForm.forEach(function(obj) {
			let el = $('#' + obj.name);
			el.val('');
		});
	};

	// eventos

	// mostra form de cadastro
	$('#btn-cad').on('click', function() {
		divBotaoCadastro.hide();
		formCadastro.fadeIn();
	});

	// habilita opções de motorista
	$('#tipo').change(function () {
		var option = $("#tipo option:selected").text();
		
		if (option.toLowerCase() === 'motorista') {
			divModeloCarro.fadeIn();
			divStatus.fadeIn();
		}
	});

	// oculta campos de cadastro
	$('#cancelar').on('click', function() {
		// sem limpar os campos no caso de clicar por acidente.
		formCadastro.hide();
		divBotaoCadastro.fadeIn();
	});

	$('#salvar').on('click', function() {
		let arrayForm = $("form#form-cadastro").serializeArray();
		var formDataObj = makeObject(arrayForm);
		console.log(arrayForm);

		let results = validateObj(formDataObj);

		if (results.result.indexOf(false) < 0) {
			// console.log(obj);
			cleanForm(arrayForm);
			$.post('post', results.obj, function (data) {
				console.log(results.obj);
				$.notify('Informações enviadas ao servidor.', 'success');
			});
		}
	});

	$('#pesquisar').on('click', function() {
		let resultados = $('#resultados').empty();
		let pesq = $('#pesquisa').val();
		let tipoPessoa;

		if (pesq === '') {
			pesq = '*';
		}
		
		$('#opcoes-pesquisa > label > input').each(function(idx, elToSelect) {
			if ($(elToSelect).prop('checked')) {
				tipoPessoa = $(elToSelect).val()
				console.log(tipoPessoa);
			}
		});

		$.get('get/pesquisa/' + pesq + '/' + tipoPessoa, function(data) {
			console.log(data);
			mount(data);
		});
	});

	// primeira pesquisa
	init();
};

$(document).ready(main);