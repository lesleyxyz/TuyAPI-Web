const express = require('express')
const { setLights, getLightState } = require('./device')
const app = express();

app.listen(3000, () => {});
app.use(express.static('views/static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.get('/set', (req, res) => {
    let first = req.query.first == "true" ? true : false;
    let second = req.query.second == "true" ? true : false;
    setLights(first, second);
    res.send(getLightState());
})

app.get('/get', (req, res) => {
    return res.send(getLightState());
})