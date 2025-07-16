const timerEl = document.getElementById("timer");
const startButtonEl = document.getElementById("start");
const stopButtonEl = document.getElementById("stop");
const resetButtonEl = document.getElementById("reset");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function formatTime(elapsedTime) {
    const milliSec = Math.floor((elapsedTime % 1000) / 10);
    const sec = Math.floor(((elapsedTime / 1000) % 60));
    const min = Math.floor(((elapsedTime / 1000) / 60));
    const hour = Math.floor((elapsedTime / 1000) / 3600);
    return (hour ? (hour > 9 ? hour : "0" + hour) : "00") + ":" +
        (min ? (min > 9 ? min : "0" + min) : "00") + ":" +
        (sec ? (sec > 9 ? sec : "0" + sec) : "00") + "." +
        (milliSec > 9 ? milliSec : "0" + milliSec)
}
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timerEl.textContent = formatTime(elapsedTime);
    }, 10)
    startButtonEl.disabled = true;
    stopButtonEl.disabled = false;
}

function stopTimer() {
    startButtonEl.disabled = false;
    clearInterval(timerInterval);
    timeInterval = null;
    stopButtonEl.disabled = true
}

function resetTimer() {
     startButtonEl.disabled = false;
     stopButtonEl.disabled = false;
    timerEl.textContent = "00:00:00";
    clearInterval(timerInterval);
}

startButtonEl.addEventListener("click", startTimer);
stopButtonEl.addEventListener("click", stopTimer);
resetButtonEl.addEventListener("click", resetTimer);