const kafka = require('./kafka');

const fs = require('fs');
const trucks = []

try {
    // read contents of the file
    const data = fs.readFileSync('truck_engine_sensors.json', 'UTF-8');
    // split the contents by new line
    const lines = data.split(/\r?\n/);
    // print all lines
    lines.pop();
    lines.forEach((line) => {
        // trucks.push(JSON.parse(line))
        trucks.push(line)
    });
} catch (err) {
    console.error(err);
}

// PRODUCER

const producer = kafka.producer()

const produce = async () => {
    await producer.connect();
    let idx = 0;

   const interval = setInterval( async () => {
        if(idx>=trucks.length-1) {
            console.log('in interval inside produce')
            console.log(idx)
            clearInterval(interval);
        }
        try {

            const responses = await producer.send({
                topic : process.env.TOPIC,
                messages : [
                    {
                        key : String(idx),
                        // value : String(trucks[idx].engine_temperature)
                        value: String(trucks[idx])
                    }
                ]
            })
        console.log("Published message ", trucks[idx]);
        // console.log('Published message, engine_temperature', trucks[idx].engine_temperature )
        idx++;
        }
        catch (err) {
            console.log("Error with producing: ", err);
        }

    }, 1000)
}

module.exports = produce;
// produce().catch(error => {
//     console.log(error);
//     process.exit(1);
// })

