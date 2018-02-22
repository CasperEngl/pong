// Define path
const path = require('path');

// Define express
const express = require('express');
// Initialize express
const app = express();
// Create HTTP server
const server = require('http').Server(app);
// Initialize socket.io on HTTP server
const io = require('socket.io')(server);

// Listen on port
server.listen(7777);

function Player(id, points = 0) {
	this.id = id;
	this.points = points;
}

let players = [],
    playerCount = 0;

// Set static file serving
app.use('/assets', express.static(path.join(__dirname, '../../assets')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../../index.html'));
});

io.on('connection', function (socket) {
	socket.on('disconnect', function () {
		console.log('player disconnected');
		players = [];
		playerCount = 0;
	});

	socket.emit('gameStart', {
		hello: 'world'
	});

	socket.on('playerJoin', function () {

		if (players.length <= 1) {
			players[playerCount] = new Player(playerCount);

			socket.emit('playerJoined', players[playerCount++]);
		} else {
			console.log('Room full');
		}

		console.log(JSON.stringify(players, null, 2));
	});

	socket.on('playerDisconnect', function (data) {
		console.log(data);
	});

	socket.on('playerMovement', function (data) {
		let playerMovement = {
			id: data.id,
			x: data.x,
			y: data.y
		};

		socket.emit('opponentMovement', playerMovement);
	});

	socket.on('playerPoint', function (data) {
		players.forEach((key, value) => {
			if (data.id === value) players[data.id].points++;
		});
	});

	socket.on('resetGame', function () {
		players.map(player => player.points = 0);
	});

	socket.on('ballMovement', function (data) {});
});

/////////////////////////////////////////////////////////////

/*
var socket = require('socket.io');
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
server.listen(7777, '127.0.0.1');

var io = socket.listen(server);

const path = require('path');

app.use('/assets', express.static(path.join(__dirname, './assets')));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	socket.emit('gameStart', {
		hello: 'world'
	});

	socket.on('playerMovement', function (data) {
		console.log(data);
	});
});
*/
//# sourceMappingURL=server.js.map