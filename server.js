const APP_JOIN_CHANNEL  = 'join_channel';
const APP_PUSH_SOCKET   = 'push-socket';
const APP_DISCONNECT    = 'disconnect';
const APP_FRONTEND_URL  = 'http://127.0.0.1:8080';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969);
var io = require('socket.io')(server, {  
    allowEIO3: true,
    cors: {
        origin: APP_FRONTEND_URL,
        credentials: true
    }
});
server.listen(port, () => console.log('Server running in port ' + port));
io.on('connection', socket => {
    socket.on(APP_JOIN_CHANNEL, join => {
        console.log('Join channel: ' + join);
        socket.join(join);
    })
    socket.on(APP_PUSH_SOCKET, package => {
        console.log('Push data to channel: ' + package.channel +' with event: ' + package.event);
        io.to(package.channel).emit(package.event, package.data);
    });
    socket.on(APP_DISCONNECT, function() {});
});

app.get('/', (req, res) => {
    res.send("Server running okay.");
})