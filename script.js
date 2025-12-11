// ----------- Load Fields -----------
const fields = ["task","control","adhdTrap","response","eveningGood","eveningBullshit","eveningPlan"];

window.onload = () => {
    fields.forEach(loadField);
    loadHistory();
    setupChart();
};

// ----------- Local Storage ----------
function saveField(id) {
    localStorage.setItem(id, document.getElementById(id).value);
}

function loadField(id) {
    const v = localStorage.getItem(id);
    if (v) document.getElementById(id).value = v;
}

// Save Morning + Evening
document.getElementById("saveMorning").onclick = () => {
    fields.slice(0,4).forEach(saveField);
    addHistory("morning");
    alert("Morgen gespeichert!");
};

document.getElementById("saveEvening").onclick = () => {
    fields.slice(4).forEach(saveField);
    addHistory("evening");
    alert("Abend gespeichert!");
};

// ----------- History ----------
function addHistory(type) {
    let history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push({
        date: new Date().toLocaleDateString(),
        type: type,
        good: document.getElementById("eveningGood").value.length
    });
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
    updateChart();
}

function loadHistory() {
    return JSON.parse(localStorage.getItem("history") || "[]");
}

// ----------- Tools ----------
let timer;

function startTimer(sec) {
    clearInterval(timer);
    let t = sec;
    timer = setInterval(() => {
        document.getElementById("timerDisplay").innerText = t + "s";
        if (t <= 0) clearInterval(timer);
        t--;
    }, 1000);
}

function startCountdown() {
    startTimer(10);
}

function breath() {
    const el = document.getElementById("timerDisplay");
    el.innerText = "Einatmen...";
    setTimeout(() => el.innerText = "Ausatmen...", 1500);
    setTimeout(() => el.innerText = "", 3000);
}

// ----------- Focus Mode -----------
document.getElementById("focusToggle").onclick = () => {
    document.body.classList.toggle("focus-mode");
};

// ----------- Export ----------
function exportHistory() {
    const h = localStorage.getItem("history");
    const blob = new Blob([h], {type: "application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "adhs_history.json";
    a.click();
}

// ----------- Chart.js Visualization ----------
let chart;

function setupChart() {
    const ctx = document.getElementById('historyChart');
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Wie oft du stolz warst (Länge des Textes)",
                data: [],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.2)",
                tension: 0.3
            }]
        }
    });
    updateChart();
}

function updateChart() {
    const history = loadHistory();
    chart.data.labels = history.map(h => h.date);
    chart.data.datasets[0].data = history.map(h => h.good);
    chart.update();
}
