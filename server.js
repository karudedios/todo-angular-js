const http	      = require('http');
const express     = require('express');
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
const Todo        = require('./features/todo/model/todo');
const User        = require('./features/user/model/user');

const app         = express();
const server      = http.createServer(app);

mongoose.connect(process.env.MONGOOSE_CONNECTION_STR || 'mongodb://localhost:27017/todo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

const apiRouter = require('./router.js')(Todo, User);

app.use(apiRouter);

server.listen(process.env.PORT || '8080', process.env.IP || '0.0.0.0', () => {
  console.log("Server rocking");
});
