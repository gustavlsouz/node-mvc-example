module.exports = (app) => {
	app.get('/pessoa/:id', app.controllers.pessoa.get);
};