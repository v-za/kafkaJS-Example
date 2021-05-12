const kafka = require('./kafka');
require('dotenv').config();
const express = require('express');
const port = process.env.PORT
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chart.html')
});

const consumers = () => {
  io.on('connection', socket => {
    
    const consumer = kafka.consumer({
      groupId: 'truck-group'
    })

    const consume = async () => {
      console.log('in consume()')
      await consumer.connect()
    
      await consumer.subscribe({
        topic: process.env.TOPIC,
        // topic: process.env.TOPIC,
        fromBeginning: true
      })
    
     // let output;
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
        // output = message.value.toString();
        io.emit('truck message', truck)
       console.log('Received Message', 
            JSON.parse(message.value.toString()))
          // console.log('Received message', {
          //   topic,
          //   partition,
          //   key: message.key.toString(),
          //   value: JSON.parse(message.value.toString()),
          //   valueString: message.value.toString()
          // })
        }
      })
      //return output;
    }

    consume()
      .catch(async error => {
      console.error(error)
      try {
       await consumer.disconnect()
    } catch (e) {
        console.error('Failed to gracefully disconnect consumer', e)
    }
     process.exit(1)
})

  })
}

// consume method that connects, subscribes to a topic and consumes messages from that topic

server.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});


module.exports = consumers;

// consume().catch(async error => {
//   console.error(error)
//   try {
//     await consumer.disconnect()
//   } catch (e) {
//     console.error('Failed to gracefully disconnect consumer', e)
//   }
//   process.exit(1)
// })