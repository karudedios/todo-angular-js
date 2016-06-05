const http                        = require('http');
const express                     = require('express');
const mongoose                    = require('mongoose');
const passport                    = require('passport');
const bodyParser                  = require('body-parser');
const session                     = require('express-session');
const Todo                        = require('./features/todo/model/todo');
const User                        = require('./features/user/model/user');
const LocalAuthenticationStrategy = require('./features/auth/strategies/local');

const app         = express();
const server      = http.createServer(app);

mongoose.connect(process.env.MONGOOSE_CONNECTION_STR || 'mongodb://localhost:27017/todo');

const strategy = new LocalAuthenticationStrategy(User, passport);

const apiRouter = require('./routers/api')(Todo, User);
const authRouter = require('./routers/auth')(User, strategy);

const urlEncodedSettings = { extended: true };

const sessionSettings = { resave: true, saveUninitialized: false, secret: '31a4793fe0b7c9fe6d1d30c7c7b042de' };

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded(urlEncodedSettings))
  .use(session(sessionSettings))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(__dirname + '/public'))
  .use('/bower_components',  express.static(__dirname + '/bower_components'))
  .use(authRouter)
  .use(apiRouter);

const port  = process.env.PORT || '8080';
const ip    = process.env.ip || '0.0.0.0';

server.listen(process.env.PORT || '8080', process.env.IP || '0.0.0.0', () => {
  console.log(`Server rocking at ${ip}:${port}`);
});
