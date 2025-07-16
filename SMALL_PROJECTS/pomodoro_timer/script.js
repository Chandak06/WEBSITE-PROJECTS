const startEl=document.getElementById("start");
const stopEl=document.getElementById("stop");
const resetEl=document.getElementById("reset");
const timerEl=document.getElementById("timer");


let interval;
let timeleft=1500;
function updateTimer(){
    let min=Math.floor(timeleft/60);
    let sec=timeleft % 60;
    let formatedTime=`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
    timerEl.innerHTML=formatedTime;
}
function startTimer(){
    if(interval) return;
    interval=setInterval(()=>{
        timeleft--;
        updateTimer();
        if(timeleft==0){
            clearInterval(interval);
            interval=null;
            alert("Time's Up!");
            timeleft=1500;
            updateTimer();
        }
    },1000)
}
function stopTimer(){
    clearInterval(interval);
    interval=null;
}
function resetTimer(){
    clearInterval(interval);
    timeleft=1500;
    interval=null;
    updateTimer();
}
updateTimer()
startEl.addEventListener("click",startTimer);
stopEl.addEventListener("click",stopTimer);
resetEl.addEventListener("click",resetTimer);
