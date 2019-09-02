const express = require('express');
const app = express();
const path = require("path");
var router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');



router.get('/wordcloud/positivas',function(req,res){
  fs.readFile("../fase2-R/output/wordcloud_positivas.csv", {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        res.send(data);
    } else {
        console.log(err);
    }
});
});
router.get('/mapas',function(req,res){
  fs.readFile("../fase2-R/output/output.csv", {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        res.send(data);    
    } else {
        console.log(err);
    }
});
});


router.get('/wordcloud/negativas',function(req,res){
  fs.readFile("../fase2-R/output/wordcloud_negativas.csv", {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        res.send(data);
    } else {
        console.log(err);
    }
});
});

router.get('/wordcloud',function(req,res){
  res.sendFile(path.join(__dirname+'/wordcloud.html'));
});
router.get('/mapa',function(req,res){
  res.sendFile(path.join(__dirname+'/mapa.html'));
});

app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/',router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.status(404).send("page not found");
    console.error(res.statusCode+"page not found");
  
  });

const host = '0.0.0.0';
const port = process.env.PORT || 3000;  
  
app.listen(port, host, function() {
  console.log("Server started...");
});