const http	      = require('http');
const express     = require('express');
const mongoose    = require('mongoose');
const passport    = require('passport');
const bodyParser  = require('body-parser');
const Todo        = require('./features/todo/model/todo');
const User        = require('./features/user/model/user');

const app         = express();
const server      = http.createServer(app);

mongoose.connect(process.env.MONGOOSE_CONNECTION_STR || 'mongodb://localhost:27017/todo');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
  resave: false,
  saveUninitialized: false,
  secret: '31a4793fe0b7c9fe6d1d30c7c7b042de',
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

const apiRouter = require('./router.js')(Todo, User, passport);

app.use(apiRouter);

server.listen(process.env.PORT || '8080', process.env.IP || '0.0.0.0', () => {
  console.log("Server rocking");
});
