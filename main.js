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
        console.log("Timer done. Seeing what to do next...")

        // see where to switch to stop if worked 4 times
        if (currentTimerMode === "Work") {
            workCount++;  // increment work count
            console.log(workCount);
            console.log("****************************************");
            if (workCount < 4){
                switchToBreak(shortBreakLength, "Short");
            } else if(workCount == 4){
                switchToBreak(longBreakLength, "Long");
            } else{
                console.log("borked here:");
                console.log(workCount);
                stopTimer();
            }
        } else if(currentTimerMode === "Break"){
            console.log("**************************************");
            if (workCount == 4){
                console.log("Session Complete!");
                stopTimer();
            } else{
                switchToWork();
            }
        }
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
    if (!timerOn) {
        if (workCount === 0){
            console.log("Starting timer");
            console.log(workCount);
        }
        timerOn = true;
        timer = setInterval(updateTimer, 250);  //for demoing switch back to 1000 for every second
    }
}
 
function pauseTimer() {
    console.log("Pause button pushed");
    if (timerOn) {
        clearInterval(timer);
        timerOn = false;
    }
}

function stopTimer() {
    console.log("Stop button pushed");
    if (timerOn){
        clearInterval(timer);
        timerOn = false;
        minutes = workLength;
        seconds = 0;
        document.getElementById("timer").innerHTML = formatTime(minutes, seconds);
    }
}

function restartTimer(){
    console.log("Restart button pushed");
    if (timerOn){
        stopTimer();
        startTimer();
    }
}

// switching functions
function switchToBreak(length, breakType){
    console.log("Switching to break");
    if (breakType === "Short"){
        console.log("Short break starting");
    } else if (breakType === "Long"){
        console.log("Long break starting");
    } else{
        console.log("u in trouble");
    }
    clearInterval(timer);
    timerOn = false;
    minutes = length;
    seconds = 0;
    currentTimerMode = "Break";
    document.getElementById("timer").innerHTML = formatTime(minutes, seconds);
    startTimer();
}

function switchToWork(){  
        console.log("Switching to work"); 
        console.log(workCount);
        clearInterval(timer);
        timerOn = false;
        minutes = workLength;
        seconds = 0;
        currentTimerMode = "Work";
        document.getElementById("timer").innerHTML = formatTime(minutes, seconds);
        startTimer();
}