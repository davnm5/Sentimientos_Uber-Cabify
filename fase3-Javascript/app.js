const express = require('express');
const app = express();
const path = require("path");
var router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

router.get('/wordcloud/positivas/:app', function (req, res) {
  console.log(req.params.app);
  if (req.params.app == "uber") {
    fs.readFile("../fase2-R/output/wordcloud_positivas_uber.txt", { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    });
  }
  if (req.params.app == "cabify") {
    fs.readFile("../fase2-R/output/wordcloud_positivas_cabify.txt", { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    });
  }

});

router.get('/wordcloud/negativas/:app', function (req, res) {
  if (req.params.app == "uber") {
    fs.readFile("../fase2-R/output/wordcloud_negativas_uber.txt", { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    });
  }
  if (req.params.app == "cabify") {
    fs.readFile("../fase2-R/output/wordcloud_negativas_cabify.txt", { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
        res.send(data);
      } else {
        console.log(err);
      }
    });
  }
});

router.get('/mapas', function (req, res) {
  fs.readFile("../fase2-R/output/output.csv", { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

router.get('/api/radar/:polaridad', function (req, res) {
  fs.readFile("../fase2-R/output/output.csv", { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
      var lines = data.split("\n");
      var result = [];
      var headers = lines[0].split(",");

      for (var i = 2; i < lines.length - 1; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
          if (headers[j].toLowerCase().trim() === req.params.polaridad) {
            obj[headers[j]] = currentline[j];
            obj[headers[0]] = currentline[0];

            obj["app"] = currentline[4];
          }
        }
        result.push(obj);
      }
      res.send(JSON.stringify(result)); //JSON
    } else {
      console.log(err);
    }
  });
});



router.get('/wordcloud_uber', function (req, res) {
  res.sendFile(path.join(__dirname + '/wordcloud_uber.html'));
});

router.get('/wordcloud_cabify', function (req, res) {
  res.sendFile(path.join(__dirname + '/wordcloud_cabify.html'));
});

router.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/mapa', function (req, res) {
  res.sendFile(path.join(__dirname + '/mapa.html'));
});
router.get('/radar', function (req, res) {
  res.sendFile(path.join(__dirname + '/radar.html'));
});

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));
app.use('/', router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.status(404).send("page not found");
  console.error(res.statusCode + "page not found");

});

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function () {
  console.log("Server started...");
});