var express = require('express');
var app = express();
var path = require ('path');
var fs = require('fs');
var bodyParser = require ('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('private'))
app.get('/table', function (req, res){
  res.sendfile('private/table.html')
})
app.get('/form', function (req, res){
  res.sendfile('private/get.html')
})
app.post('/api/new/:name', function(req,res){
  var fileName = req.params.name;
  var fileText =  req.body.text;
  console.log(fileText);
  console.log(fileName);
  fs.appendFile('private/'+fileName, fileText , function(err, contents){
    if (err) throw err;
    console.log('data was appended');
    res.json(200, {status: 'success', dataText: req.body.text})
  })
})
app.post('/api/text', function(req,res){
  console.log(req.body.text);
  fs.writeFile('private/index.txt', req.body.text, 'utf8',function (err, contents){
    if (err) throw err;
    res.json(200, {status: 'success', dataText: req.body.text})
  })
})
app.get('/api/text', function (req, res){
fs.readFile('private/index.txt', 'utf8', function (err, contents){
    if (err) throw err;
    console.log(contents);
    res.json(200, {status: 'success', dataText: contents})
  });
})
// app.get('/openfile', function(req, res){
//   res.sendfile('private/openFile.html')
// })
app.get('/api/items/:text', function(req, res){
  var file = req.params.text;
  console.log(req.params.text);
  fs.readFile('private/' + file, 'utf8', function (err, contents){
    if (err) throw err;
    console.log(contents)

    res.json(200, {status: 'success', dataText: contents})
  })

})

app.get('/api/items', function (req, res){
  fs.readdir('/home/sagneva_e/projects/get/private', function(err, items){
    if (err) throw err;
    console.log(items)
    res.json(200, {status: 'success', dataText: items})
  })
})
app.listen(8080, function(){
  console.log('Server has been started');
});

app.get('/newfile', function (req, res){
  res.sendfile('private/createFile.html')
})

app.get('/openfile', function (req, res){
  res.sendfile('private/openFile.html')
})
// app.get('/api/table', function (req, res){
//   res.sendfile('private/table.html')
// })
