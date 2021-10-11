const express = require('express');
require('dotenv').config()
const { MYSQL_IP, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD } = require("./config/config");

var mysql = require('mysql');



const connectWithRetry = () => {
    var connection = mysql.createConnection({
        host     : MYSQL_IP,
        port     : MYSQL_PORT,
        user     : MYSQL_USER,
        password : MYSQL_PASSWORD
      });
    
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
        //setTimeout(connectWithRetry, 5000)
      });
    connection.end();
}

connectWithRetry();

const app = express();

app.get("/", (req, res) => {
    res.send("<h2>Hi There!</h2>");
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));