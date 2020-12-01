const express = require('express');
const mysql = require('mysql');

// initialize express app
const app = express();

const dbOptions = {
    host     : 'localhost',
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
            console.log("DBOptions var: " + dbOptions);
            throw err; 
        }
        console.log('MySQL connected!');
    });

    res.send('GET Successful!');
});

app.listen('3000', () =>{
    console.log("Server started on port 3000");
});