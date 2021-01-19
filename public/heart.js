let currentTime = new Promise((resolve, reject) => {
    fetch("http://" + window.location.host + '/time')
        .then(res => res.text())
        .then(data => resolve(data))

});


let data = new Promise((resolve, reject) => {
    fetch("http://" + window.location.host + '/data')
        .then(res => resolve(res.json()))
});

let beats = new Promise((resolve, reject) => {
    fetch("http://" + window.location.host + '/beats')
        .then(res => resolve(res.json()))
});

let totalBeats;

function selectData(values) {
    let data = values[0]
    let currentTime = values[1];
    totalBeats = values[2];
    let prevMinutes = 0;
    for (let i = 1; i < data.length + 1; i++) {
        let currentHours = parseInt(currentTime.split(":")[0]);
        let currentMinutes = parseInt(currentTime.split(":")[1]);
        let hours = parseInt(data[i]["time"].split(":")[0]);
        let minutes = parseInt(data[i]["time"].split(":")[1]);



        if (hours == currentHours && minutes >= currentMinutes) {

            console.log(data[i - 1]["time"]);
            console.log(data[i - 1]["heartrate"]);
            return parseInt(data[i - 1]["heartrate"]);
        }

    }

}
let heartRate = 60;

Promise.all([data, currentTime, beats]).then((values) => setHeartBeat(selectData(values)));

function setHeartBeat(rate) {
    heartRate = rate;
    let heart = document.querySelector("#heart");
    let message = document.querySelector("#messagecontainer");
    let button = document.querySelector("#buttoncontainer");
    heart.style.animationDuration = (60 / heartRate).toString() + "s";
    message.style.animationDuration = (60 / heartRate).toString() + "s";
    button.style.animationDuration = (60 / heartRate).toString() + "s";
    heart.addEventListener("animationiteration", heartStartAnimation, false);

}

function heartStartAnimation(event) {
    var sound = new Howl({
        src: ['heartbeat.wav']
    });
    beat = sound.play();
    // let rate = 0;
    // if (heartRate > 60) {
    //     rate = heartRate / 60;
    // } else {
    //     rate = heartRate
    // }
    sound.rate(0.4 + heartRate / 80, beat);
    totalBeats += 1;
    if (messageFinished) {
        document.querySelector("#message").innerText = totalBeats.toString();
    }

}