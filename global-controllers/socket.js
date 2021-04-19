const io = require("socket.io");

const sockets = (server) => {
    exports.socketIO = socketIO = io(server, {
        cors: {
          origin: '*',
        }
    });
	socketIO.on("connection", (socket) => {
        console.log("New user (socket.io) connected");
        socket.on('message', (message) => {
            socketIO.emit('chatUpdate', message);
        })
    });
};

exports.sockets = sockets;