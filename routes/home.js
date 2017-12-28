module.exports = (app) => {
	app.get('/', app.controllers.home.index);
	app.post('/post', app.controllers.home.post);
	app.get('/get', app.controllers.home.get);
	app.get('/get/pesquisa/:texto/:tipoPessoa', app.controllers.home.getPesquisa);
};