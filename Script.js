// Load data on start
window.onload = function () {
    loadField("task");
    loadField("control");
    loadField("adhdTrap");
    loadField("response");
    loadField("eveningGood");
    loadField("eveningBullshit");
    loadField("eveningPlan");
};

function saveField(id) {
    localStorage.setItem(id, document.getElementById(id).value);
}

function loadField(id) {
    const value = localStorage.getItem(id);
    if (value) document.getElementById(id).value = value;
}

document.getElementById("save").onclick = function () {
    saveField("task");
    saveField("control");
    saveField("adhdTrap");
    saveField("response");
    alert("Gespeichert!");
};

document.getElementById("saveEvening").onclick = function () {
    saveField("eveningGood");
    saveField("eveningBullshit");
    saveField("eveningPlan");
    alert("Evening Review gespeichert!");
};


// --------------------
// TIMER
// --------------------
let timerInterval;

function startTimer(seconds) {
    clearInterval(timerInterval);
    let remaining = seconds;

    timerInterval = setInterval(() => {
        document.getElementById("timerDisplay").innerText =
            remaining + "s";

        if (remaining <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timerDisplay").innerText = "Fertig!";
        }
        remaining--;
    }, 1000);
}

function startCountdown() {
    startTimer(10);
}

function breath() {
    document.getElementById("timerDisplay").innerText = "Einatmen...";
    setTimeout(() => {
        document.getElementById("timerDisplay").innerText = "Ausatmen...";
    }, 1500);
    setTimeout(() => {
        document.getElementById("timerDisplay").innerText = "";
    }, 3000);
}
