let currentTime = new Promise((resolve, reject) => {
    fetch("http://" + window.location.host + '/time')
        .then(res => res.text())
        .then(data => resolve(data))

});


let data = new Promise((resolve, reject) => {
    fetch("http://" + window.location.host + '/data')
        .then(res => resolve(res.json()))
});



function useData(values) {
    let data = values[0]
    let currentTime = values[1];
    let prevMinutes = 0;
    for (let i = 1; i < data.length + 1; i++) {
        let currentHours = currentTime.split(":")[0];
        let currentMinutes = currentTime.split(":")[1];
        let hours = data[i]["time"].split(":")[0];
        let minutes = data[i]["time"].split(":")[1];


        if (hours == currentHours && minutes >= currentMinutes) {
            console.log(data[i - 1]["time"]);
            console.log(data[i - 1]["heartrate"]);
            return data[i - 1]["heartrate"];
        }

    }

}

Promise.all([data, currentTime]).then((values) => setHeartBeat(useData(values)));

function setHeartBeat(heartRate) {
    console.log(heartRate);
    document.querySelector("#heart").style.animationDuration = (60 / heartRate).toString() + "s";

}