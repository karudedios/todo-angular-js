const mongoose 	= require('mongoose');
const http	= require('http');
const express	= require('express');

const app = express();
const router = new express.Router();
const server = http.createServer(app);

app.get('/', (req, res) => res.json({ message: "Hello" }));

app.use(router);

server.listen(process.env.PORT || '8080', process.env.IP || '0.0.0.0', () => {
  console.log("Server rocking");
});

