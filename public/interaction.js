let messageFinished = false;
let clickedStart = false;
window.onload = (event) => {
    setTimeout(() => {
        document.querySelector("#polarcontainer").classList.remove("visible");
    }, 2000);
    let button = document.querySelector("#button");
    button.addEventListener("click",
        function () {
            clickedStart = true;
            button.classList.remove("visible");
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
        updateTotalBeats();
        document.querySelector("#message").classList.add("numbers");
    }, 16000)
}

function clicked() {
    document.querySelector("#button").classList.remove("visible");
}

function appear() {
    document.querySelector("#message").classList.add("visible");
}

function disappear() {
    document.querySelector("#message").classList.remove("visible");
}

function text(text) {
    document.querySelector("#message").innerText = text;
}