window.onload = (event) => {
    let element = document.querySelector("#message");
    setTimeout(appear, 1000);
    setTimeout(disappear, 3000);
    setTimeout(function() { text("is") }, 4000);
    setTimeout(appear, 4000);
    setTimeout(disappear, 6000);
    setTimeout(function() { text("mijn") }, 7000);
    setTimeout(appear, 7000);
    setTimeout(disappear, 9000);
    setTimeout(function() { text("hartslag") }, 10000);
    setTimeout(appear, 10000);
    setTimeout(disappear, 13000);





};



function appear() {
    document.querySelector("#message").classList.add("visible");
}

function disappear() {
    document.querySelector("#message").classList.remove("visible");
}

function text(text) {
    document.querySelector("#message").innerText = text;
}