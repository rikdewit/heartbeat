let messageFinished = false;
let clickedStart = false;
window.onload = (event) => {
    const heartcontainer = document.querySelector(".heartcontainer");
    const heart = document.querySelector(".heart");
    const button = document.querySelector(".button");
    const buttoncontainer = document.querySelector(".buttoncontainer");
    const message = document.querySelector(".message");
    const messagecontainer = document.querySelector(".messagecontainer");
    const polar = document.querySelector(".polarcontainer");
    const speaker = document.querySelector(".speakerbox");
    const cannon = document.querySelector(".cannon");


    heart.style.animationPlayState = "paused";
    messagecontainer.style.animationPlayState = "paused";
    buttoncontainer.style.animationPlayState = "paused";

    setTimeout(() => cannon.classList.add("big"), 4900);


    setTimeout(() => button.classList.add("visible"), 7000);
    setTimeout(() => heartcontainer.classList.add("visible"), 7000);
    setTimeout(() => cannon.classList.add("hidden"), 7000);

    setTimeout(() => heart.style.animationPlayState = "running", 7000);
    setTimeout(() => messagecontainer.style.animationPlayState = "running", 7000);
    setTimeout(() => buttoncontainer.style.animationPlayState = "running", 7000);

    setTimeout(() => polar.classList.add("visible"), 7200);
    setTimeout(() => speaker.classList.add("visible"), 7200);

    setTimeout(() => polar.classList.remove("visible"), 12000);
    setTimeout(() => speaker.classList.remove("visible"), 12000);


    button.addEventListener("click",
        function () {
            clickedStart = true;
            button.classList.remove("visible");
            polar.classList.remove("visible");
            speaker.classList.remove("visible");
            textSequence();
        });
};

function textSequence() {
    setTimeout(appear, 2000);
    setTimeout(disappear, 4000);
    setTimeout(function () { text("is") }, 5000);
    setTimeout(appear, 5000);
    setTimeout(disappear, 7000);
    setTimeout(function () { text("mijn") }, 8000);
    setTimeout(appear, 8000);
    setTimeout(disappear, 10000);
    setTimeout(function () { text("hartslag") }, 11000);
    setTimeout(appear, 11000);
    setTimeout(disappear, 14000);
    setTimeout(appear, 16000);
    setTimeout(function () {
        messageFinished = true;
        document.querySelector(".message").classList.add("numbers");
        updateTotalBeats();
    }, 16000)
}

function clicked() {
    document.querySelector(".button").classList.remove("visible");
}

function appear() {
    document.querySelector(".message").classList.add("visible");
}

function disappear() {
    document.querySelector(".message").classList.remove("visible");
}

function text(text) {
    document.querySelector(".message").innerText = text;
}

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01; //fix for mobile vh
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});