const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser} = require('./utils/users');
const botName = 'Pavel Durov';
const cors = require('cors');

// App setup
const app = express();
const PORT = process.env.PORT || 3000 ;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Socket setup
const io = socketio(server);

io.on('connection',(socket)=>{
    // console.log('new ws connection...');

    socket.on('joinRoom',({username}) => {

        const user = userJoin(socket.id, username);

        socket.join(user);

    //Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Telegram'));

    //Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName,'Welcome a new user'));

    //Run when client disconnects
    // socket.on('disconnect', () => {
    //     io.emit('message', formatMessage(botName,'A user has left the telegram :('));
    // });

    });


    //Listen for chat message
    socket.on('chatMessage', messageInput => {

        const user = getCurrentUser(socket.id);

        io.emit('ourmessage', formatMessage(user.username, messageInput));
    });
});