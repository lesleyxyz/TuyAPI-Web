const TuyAPI = require('tuyapi');
const sleep = require('util').promisify(setTimeout);

let device = new TuyAPI({
    id: 'xxxxxxx',
    key: 'xxxxxxx',
});
let lastLightState = null;

module.exports = {
    getLightState() {
        return lastLightState;
    },
    setLights(first, second) {
        device.set({ dps: 1, set: first });
        device.set({ dps: 2, set: second });
    }
};

device.find().then(() => {
    device.connect();
});

device.on('connected', (e) => {
    console.log('CONN');
});

device.on('disconnected', async() => {
    console.error('DISC');

    while (!device.isConnected()) {
        console.log("Retrying connection...");
        await device.find();
        device.connect();
        await sleep(30000);
    }
});

device.on('error', error => {
    console.error('ERR ', error);
});

device.on('data', data => {
    console.log('RECV ', data);
    lastLightState = {...lastLightState, ...data.dps };
});