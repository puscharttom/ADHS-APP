// Auto-load fields
const fields = [
    "task", "control", "adhdTrap", "response",
    "eveningGood", "eveningBullshit", "eveningPlan"
];

window.onload = () => {
    fields.forEach(loadField);
    loadHistory();
};

// Save & load
function saveField(id) {
    localStorage.setItem(id, document.getElementById(id).value);
}

function loadField(id) {
    const value = localStorage.getItem(id);
    if (value) document.getElementById(id).value = value;
}

// Save morning + history entry
document.getElementById("saveMorning").onclick = () => {
    fields.slice(0, 4).forEach(saveField);
    addHistoryEntry("morning");
    alert("Morgen gespeichert!");
};

document.getElementById("saveEvening").onclick = () => {
    fields.slice(4).forEach(saveField);
    addHistoryEntry("evening");
    alert("Abend gespeichert!");
};

function addHistoryEntry(type) {
    const date = new Date().toLocaleDateString();
    let history = JSON.parse(localStorage.getItem("history") || "[]");

    history.push({
        date,
        type,
        task: document.getElementById("task").value,
        good: document.getElementById("eveningGood").value
    });

    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    const history = JSON.parse(localStorage.getItem("history") || "[]");

    history.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.date} – ${entry.type}`;
        list.appendChild(li);
    });
}

// Tools
let timerInterval;

function startTimer(seconds) {
    clearInterval(timerInterval);
    let t = seconds;

    timerInterval = setInterval(() => {
        document.getElementById("timerDisplay").innerText = t + "s";
        if (t <= 0) clearInterval(timerInterval);
        t--;
    }, 1000);
}

function startCountdown() {
    startTimer(10);
}

function breath() {
    document.getElementById("timerDisplay").innerText = "Einatmen...";
    setTimeout(() => document.getElementById("timerDisplay").innerText = "Ausatmen...", 1500);
    setTimeout(() => document.getElementById("timerDisplay").innerText = "", 3000);
}

// Focus mode
document.getElementById("focusToggle").onclick = () => {
    document.body.classList.toggle("focus-mode");
};

// Export history
function exportHistory() {
    let history = localStorage.getItem("history");
    const blob = new Blob([history], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "adhs_stoic_history.json";
    a.click();
}