function fetchHeartbeat() {
    let currentTime = new Promise((resolve, reject) => {
        fetch(location.protocol + '/time')
            .then(res => res.text())
            .then(data => resolve(data))

    });


    let data = new Promise((resolve, reject) => {
        fetch(location.protocol + '/data')
            .then(res => resolve(res.json()))
    });

    let beats = new Promise((resolve, reject) => {
        fetch(location.protocol + '/beats')
            .then(res => resolve(res.json()))
            .catch(totalBeats = 893399454);
    });

    return [data, currentTime, beats]
}



let totalBeats;

function selectData(values) {
    let data = values[0]
    let currentTime = values[1];
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
setInterval(() => {
    Promise.all(fetchHeartbeat()).then((values) => setHeartBeat(selectData(values)));
}, 3 * 1000 * 60);

Promise.all(fetchHeartbeat()).then((values) => setHeartBeat(selectData(values))).catch(setHeartBeat(heartRate));

function setHeartBeat(rate) {
    heartRate = rate;
    let heart = document.querySelector(".heart");
    let message = document.querySelector(".messagecontainer");
    let button = document.querySelector(".buttoncontainer");
    heart.style.animationDuration = (60 / heartRate).toString() + "s";
    message.style.animationDuration = (60 / heartRate).toString() + "s";
    button.style.animationDuration = (60 / heartRate).toString() + "s";
    heart.addEventListener("animationiteration", heartStartAnimation, false);

}

function heartStartAnimation(event) {
    let sound = new Howl({
        src: ['heartbeat.wav'],
        preload: true,
    });
    if (clickedStart) {

        beat = sound.play();
        sound.rate(0.4 + heartRate / 90, beat);
    }

    totalBeats += 1;
    if (messageFinished) {
        updateTotalBeats(totalBeats);
    }
}

function updateTotalBeats() {
    document.querySelector(".message").innerText = totalBeats.toString();
}