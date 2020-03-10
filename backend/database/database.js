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
    port: '8889',
    user: 'b1752824fb5086',
    password: 'a9a2e190',
    database: 'Plastic Ocean'
})

module.exports = connection;