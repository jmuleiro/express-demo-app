const express = require('express');
const mysql = require('mysql');

// initialize express app
const app = express();

// create mysql connection
const db = mysql.createConnection({
    host     : '0.0.0.0',
    user     : 'root',
    password : '1234',
    port     : '3306',
    socketPath: '/var/run/mysqld/mysqld.sock'
});

// create db
app.get('/createdb', (req, res) =>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) =>{
        if(err)
            throw err;
        console.log(result);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('Database created');
    });
});

// default get
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('GET Successful!');
});


// connection
db.connect((err) =>{
    if (err)
      throw err;
    console.log('MySQL connected!');
});

app.listen('3000', () =>{
    console.log("Server started on port 3000");
});