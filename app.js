
const express = require('express');
const cors = require("cors")
const http = require('http');
const session = require('express-session');
const Router = require('./src/routes/index');
const Database = require("./src/config/Database/Database")
const app = express();
const server = http.createServer(app);
require("dotenv").config()



app.set('port', process.env.PORT||8080);


//middleware
app.use(cors())





// app.set('view engine', 'ejs');
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use("/", Router)


server.listen(process.env.PORT||8080, () => {
  console.log(process.env.PORT)
})
module.exports = server;
