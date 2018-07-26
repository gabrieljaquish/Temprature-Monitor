const ds18b20 = require('ds18b20');
const awsIot = require('aws-iot-device-sdk');

class Probe {
    constructor(probeID) {
        if (probeID.length !== 15) throw ('Probe ID invalid');
        this.id = probeID;
        this.temp = -999;
    }

    get id() { return this.id; }
    set id(id) {
        if (id.length !== 15) throw ('Probe ID invalid');
        this.id = id;
    }

    get Temp() {
        ds18b20.temperature(this.id, (err, value) => {
            if (err) throw (err);

            //Check if the temp has updated, if so set it
            if (value !== this.temp) this.temp = value;

            return this.temp;
        });
    };
}

const device = awsIot.device({
    keyPath: '/home/pi/certs/RasPi-3B.private.key',
    certPath: '/home/pi/certs/RasPi-3B.cert.pem',
    caPath: '/home/pi/certs/root-CA.crt',
    clientId: 'arn:aws:iot:us-east-1:362330095136:thing/RasPi-3B',
    host: 'a1tr1wnyi7qmy4.iot.us-east-1.amazonaws.com'
});

const probe1 = new Probe('28-0000071c6bd1');
const probe2 = new Probe('28-0000071cb3c6');


function publishTemp(topic, probe) {
    device.publish(topic, JSON.stringify({ probe.ID: probe.Temp }));
    console.log(`${probe.ID} : ${probe.Temp}`);
};
//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device.on('connect', () => {
    if (device.connected) {
        const now = new Date();
        console.log('Connnected to AWS IoT at ' + now)
    }

    device.subscribe('FV-Target-Temp');
    setInterval(publishTemp('FV-Current-Temp', probe1), 5000);
    console.log('probe1:' + probe1.Temp);
});

device.on('message', (topic, payload) => {
    console.log('message', topic, payload.toString());
});
