var io_callee = require('socket.io-client');
// var io = require('socket.io');
sock = io_callee.connect('http://192.168.1.12:80/', { reconnection: true });
console.log(sock);