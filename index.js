"use strict";
var _estado_expediente = {estado_encurso:"en curso",estado_abierto:"abierto",estado_esperando:"esperando",estado_cerrado:"cerrado",estado_urgente:"urgente"};
var _estado_movimiento = {estado_asignado:"asignado",estado_avanzando:"avanzando",estado_interviniendo:"interviniendo",estado_finalizado:"finalizado"};

var path = require('path');
var express = require("express");
var https = require('http');
var bodyParser = require('body-parser');

var fs=require("fs");

var variable=30;
function createServer(){
	var app = express();
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	//app.use(express.static(path.join(__dirname, 'static')));
	var port = process.env.PORT || 5300;
	var server = https.createServer(app).listen(port,function(){
		var host = server.address().address;
		var port = server.address().port;
		/*console.log("host: ",host);
		console.log("port: ",port);
		console.log("server :", server.address());*/
		console.log('Escuchando por peticiones en https://%s:%s', host, port)
	});
	
	app.route("/getData")
	.get(function(req, res){
		requestData( res);
	})
	app.get('/hola', function (req, res) {
	  res.status(200).send('Hello World...');
	})
	
}

function requestData( handler){
	var factor=5;
	if (variable>200) variable=10; 
	variable=variable+ Math.trunc(factor*Math.random());
	handler.send({ok:true,valor:variable});
	
}

createServer();
