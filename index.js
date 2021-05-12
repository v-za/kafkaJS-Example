const express = require('express');
require('dotenv').config();
const port = process.env.PORT
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    //send to everyone, including the sender. For a chat, this makes the most sense
    console.log("message: ", msg)
    io.emit('chat message', msg);
    //send to everyone but the sender
    // socket.broadcast.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    // io.emit('chat message', "user disconnected");
    console.log('user disconnected');
  })
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});





// OLD CODE

// const express = require('express');
// require('dotenv').config();
// const port = process.env.PORT
// const path = require("path");
// const app = express();
// // const io = require('socket.io')(port);

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './index.html'));
// });

// const server = app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
//   });

// const io = require('socket.io')(server);

// io.on('connection', socket => {
//   console.log('user connected! :D');
// })

  
// io.on('connection', socket => { 
//     //send() method or emit() method w/custom event names
//     socket.send('Hello There!');
//     socket.emit('greetings', 'hello', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

//     //handle the event sent with socket.send()
//     socket.on('message', (data) => {
//         console.log(data)
//     })
// })