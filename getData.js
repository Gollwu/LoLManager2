var express = require('express');
var app = express.createServer();
app.set('views', __dirname + '/views');
app.get('/', function(req, res){
  res.render('index', {locals: {
    title: 'test Mongo/Node/ORM'
  }});
});

app.listen(8080);