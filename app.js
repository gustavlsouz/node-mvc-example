const express = require('express')
	,load = require('express-load')
	,app = express()
	,mongoose = require('mongoose')
	,bodyParser = require('body-parser');
	;

const PORT = 3030;

global.db = global.db = mongoose.createConnection('mongodb://localhost/gustavo_teste');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

load('models')
.then('controllers')
.then('routes')
.into(app);

app.listen(PORT, () => {
	console.log('Aplicação no ar');
	console.log(`http://localhost:${PORT}/`);
});