var express = require('express');
var connection = require('./database/database');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
var htmlspecialchars = require('htmlspecialchars');
var app = express();

var PORT = process.env.PORT || 4201;

var storage = multer.diskStorage({
    destination: function(req, res, next){
        next(null, path.join(__dirname, './uploads/'));
    },
    filename: function(req, file, next){
        next(null , file.originalname);
    }
});
var upload = multer({ storage: storage })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, multipart/form-data');
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    if('OPTIONS' == req.method){
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

app.use(express.static('uploads'));

app.get('/', (req, res) => {
    connection.query("SELECT * FROM `idees-article` ORDER BY id_idee DESC LIMIT 3", (err, rows, fields) => {
        if (err){
            console.log("Erreur : " +err);
            res.end();
        }
        res.json(rows);
        //console.log(rows['photo_couverture']);
        //res.sendFile(path.join(__dirname, "./uploads/rows"));
    })
})

var uploadPhoto = upload.single('photo_couv');
app.post('/', uploadPhoto, function (req, res, next) {
    try {
        console.log(req.file);
        connection.query("INSERT INTO `idees-article` (email, explication_idee, photo_couverture) VALUES ('"+req.body.email+"', '"+htmlspecialchars(req.body.corps)+"', '"+req.file['originalname']+"')", function(err, result, fields){
            if (err)
                throw err;
    
            console.log(result);
        });

        res.send("ok");

    } catch(error){
        console.log(error);
        res.sendStatus(400);
    }
})

app.listen(PORT, '127.0.0.1', function(){
    console.log("Mon serveur écoute sur le port 4201 ! :)");
})