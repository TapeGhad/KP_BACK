const io = require("socket.io");

const sockets = (server, db) => {
    exports.socketIO = socketIO = io(server, {
        cors: {
          origin: '*',
        }
    });
	socketIO.on("connection", (socket) => {
        console.log("New user (socket.io) connected");
        socket.on('getChat', async () => {
            const messages = await db.chat.find({}, { _id: 0 });
            socketIO.emit('allChat', { messages });
        })
        socket.on('message', async (message, name) => {
            await db.chat.create({ name, message, date: new Date() });
            socketIO.emit('chatUpdate', { message, name });
        })
    });
};

exports.sockets = sockets;