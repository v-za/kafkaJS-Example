const { Kafka } = require('kafkajs')

class Confluent {
    constructor(key, secret, server){
        this.key = key;
        this.secret = secret;
        this.server = server;
    }

    create(client) {
        const sasl = this.key && this.secret ? { username : this.key, password : this.secret , mechanism: 'plain' } : null
        const ssl = !!sasl
        return new Kafka({
            clientId: client,
            brokers: [this.server],
            ssl,
            sasl
          })
    }
 }

 class Consumer {

     constructor(consumer,topic, event, io){
         this.consumer = consumer;
         this.topic = topic;
         this.event = event;  
         this.io = io;
     }

     async run() {
        await this.consumer.connect()
    
        await this.consumer.subscribe({
          topic: this.topic,
          // topic: process.env.TOPIC,
          fromBeginning: true
        })
      
        await this.consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
          this.io.emit(this.event, message.value.toString())
         console.log('Received Message', 
              JSON.parse(message.value.toString()))
          }
        })
         

     }
 }

module.exports = {
  Confluent,
  Consumer
};

