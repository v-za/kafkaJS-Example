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

//  class Consumer {
//      constructor(topic, event){
//          this.topic = topic;
//          this.event = event
//          this.consumer = 
//      }

//      async consume() {

//      }
//  }

module.exports = Confluent;

