var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    chalk = require('chalk'),
    debug = require('debug')('app'),
    morgan = require('morgan'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var db;

if(process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/patientAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/patientAPI');
}
var Patientthirdpartyuser = require('./models/thirdpartyModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'patientsecret'}));


require('./config/passport.js')(app);

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));

app.set('views', './views');
app.set('view engine', 'ejs');

var thirdpartyRouter = require('./routes/thirdpartyRouter')(Patientthirdpartyuser);
var authRouter = require('./routes/authRouter')();

app.use('/api/thirdparty', thirdpartyRouter);
app.use('/auth', authRouter);
app.set(express.static(path.join(__dirname, '/public/')));
app.get('/', function (req, res) {
    res.render(
    'index',
    {
      nav: [{ link: '/users', title: 'ThirdParty Users' }],
      title: 'Patient - thirdParty'
    }
    );
});

app.listen(port, function () {
    debug('Running on port: ' + chalk.green(port));
});

module.exports = app;
