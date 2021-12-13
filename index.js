const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});


let connections = [];

io.sockets.on('connection', (socket) => {
    console.log('Подключено!');
    connections.push(socket);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Выход');
    });

    socket.on('send mess', (data) => {
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});
});