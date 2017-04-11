var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'));

app.engine('handelbars', exphbs({
	defaultLayout: 'Main'
}));
app.set('view engine', 'handelbars');

var routes = require('./controllers/routes.js');

app.use('/', routes);
app.use('/update', routes);
app.use('/create', routes);

var port = process.env.PORT || 3000;
db.sequelize.sync().then(function(){
	app.listen(port);
});

console.log("connected to server!");