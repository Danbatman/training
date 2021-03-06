'use strict';

var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');

var server = new http.Server(app);
var PORT = process.env.VIRTUAL_PORT | 9000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function(req, res){

    res.status(200).send("hello");

});

app.get('/user/:name', function(req, res){
    var name = req.params.name;
    console.log('requesting sensor user', name);

    // result of the call to a db
    var data = {
        name: "toto",
        age: 12
    };

    res.status(200).send(data);

});

server.listen(PORT, function () {
    console.log('Server running on', [
        'http://localhost:',
        PORT
    ].join(''));
});
