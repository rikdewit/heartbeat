const express = require('express')
const csv = require('csv-parser');
const fs = require('fs');
// const csv = require('csvtojson')

process.env.TZ = 'Europe/Amsterdam'

const app = express()
const port = 3000
app.use(express.static('public'))
app.get('/data', (req, res) => {
    getCurrentHeartRate().then(data => res.send(data));
})

app.get('/time', (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours().toString();
    let minutes = date_ob.getMinutes().toString();
    let time = hours + ":" + minutes;

    res.send(time);
});

app.get('/beats', (req, res) => {
    let now = new Date();
    let birthDate = new Date("06/21/1997");
    timeDifference = Math.abs(now.getTime() - birthDate.getTime());
    beats = (1.2 * timeDifference / 1000).toFixed();

    res.send(beats);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function getCurrentHeartRate() {

    var csvData = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream('./data1.csv')
            .pipe(csv({ delimiter: ',' }), columns = false)
            .on('data', function(csvrow) {
                //console.log(csvrow);
                //do something with csvrow
                csvData.push(csvrow);
            })
            .on('end', function() {
                //do something with csvData
                // console.log(csvData);
                resolve(csvData);
            });
    });
}