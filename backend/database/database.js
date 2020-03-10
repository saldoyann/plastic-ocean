const mysql = require('mysql');

// const connection =mysql.createConnection({
//     host: 'localhost',
//     port: '8889',
//     user: 'root',
//     password: 'root',
//     database: 'climact-projet'
// })

const connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    port: '3306',
    user: 'b1752824fb5086',
    password: 'a9a2e190',
    database: 'heroku_2d70bf9b778a071'
})

module.exports = connection;