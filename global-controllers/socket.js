const io = require("socket.io");

const sockets = (server, db) => {
    exports.socketIO = socketIO = io(server, {
        cors: {
          origin: '*',
        }
    });
    let usersOnline = 0;
	socketIO.on("connection", (socket) => {
        usersOnline++;
        console.log('USERS ONLINE:', usersOnline);
        socketIO.emit('usersOnline', usersOnline);
        socket.on('getChat', async () => {
            const messages = await db.chat.find({}, { _id: 0 });
            socketIO.emit('allChat', messages);
        });
        socket.on('usersOnlineCheck', () => {
            socketIO.emit('usersOnline', usersOnline);
        });
        socket.on('message', async (message, name) => {
            const messageNew = await db.chat.create({ name, message, date: new Date() });
            socketIO.emit('chatUpdate', messageNew);
        })
        socket.on('disconnect', () => {
            usersOnline--;
            console.log('USERS ONLINE:', usersOnline);
            socketIO.emit('usersOnline', usersOnline);
        })
    });
};

exports.sockets = sockets;