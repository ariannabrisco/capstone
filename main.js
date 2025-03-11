// lengths for demoing
workLength = 2;
shortBreakLength = 1;
longBreakLength = 3;

let timer;
let minutes = workLength; // allows for dif lengths
let seconds = 0;
let timerOn = false;
let workCount = 0;
let currentTimerMode = "Work"

// formatting function
function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// encompassing timer function
function updateTimer() {
    // when timer reaches 0:00
    if (minutes === 0 && seconds === 0){
        clearInterval(timer);
         timerOn = false;
         workCount++;
         console.log(workCount);
         console.log("Timer done")
         if (currentTimerMode === "Work") {
            if (workCount < 4){
                switchToBreak(shortBreakLength, "Short Break");
            } else{
                switchToBreak(longBreakLength, "Long Break");
            }
    } else{
        switchToWork();
    }
    return;
    }

    // when timer reaches n:00
    if (seconds === 0) {
        seconds = 59;
        minutes--;
    } 

    // when timer !0 seconds or minutes
    else {
        seconds--;
    }
    document.getElementById("timer").innerHTML = formatTime(minutes, seconds);
}
// button functions
function startTimer() {
    console.log("Start button pushed");
    if (!timerOn) {
        timerOn = true;
        timer = setInterval(updateTimer, 1000);
    }
}

// switching functions


