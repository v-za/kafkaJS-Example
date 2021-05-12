const express = require('express');
const port = process.env.PORT
const app = express();
const io = require('socket.io')(port);

const server = app.listen(port, () => {
    console.log(`Listening on port ${server.address().port}`);
  });




// io.on('connection', socket => { 
//     //send() method or emit() method w/custom event names
//     socket.send('Hello There!');
//     socket.emit('greetings', 'hello', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

//     //handle the event sent with socket.send()
//     socket.on('message', (data) => {
//         console.log(data)
//     })
// })