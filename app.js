const express = require('express');
const mysql = require('mysql');

// initialize express app
const app = express();

app.set('port', process.env.PORT || 3000);


const dbOptions = {
    host     : 'http://172.17.0.2',
    user     : 'root',
    password : '1234',
    port     : '3306'
    //socketPath: '/var/run/mysqld/mysqld.sock'
};

// create mysql connection
const db = mysql.createConnection(dbOptions);

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
    // connection
    db.connect((err) =>{
        if (err){
            console.log("MySQL not connected. Error: " + err.code);
            console.log("host:"+ dbOptions.host + "user:" + dbOptions.user + "password:" + dbOptions.password + "port:" + dbOptions.port);
            throw err; 
        }
        console.log('MySQL connected!');
    });

    res.send('GET Successful!');
});

let server = app.listen(app.get('port'), () =>{
    console.log("Express server listening on port " + server.address().port);
})