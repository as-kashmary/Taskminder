const deg = 6;
const sec1 = document.querySelector('#sec1');
const ml = document.querySelector('#ml');

let intervalId; // Variable to hold the interval ID

function updateClock() {
     // Get total milliseconds since Unix epoch

    // let hh = (timeDifference / (60 * 60 * 1000)) % 12 * 360 / 12; // Convert milliseconds to degrees for hour hand
    let mm =180+  (minutes  * 6); // Convert minutes to degrees for minute hand
    let ss =180+ (seconds  * 6); // Convert seconds to degrees for second hand

    sec1.style.transform = `rotateZ(${mm}deg)`; // Minute hand rotation
    ml.style.transform = `rotateZ(${ss}deg)`; // Second hand rotation
}

// Function to start the clock
function startClock() {
    updateClock(); // Call updateClock initially to avoid delay in displaying time
    intervalId = setInterval(updateClock, 1); // Update every second
}

// Function to stop the clock
function stopClock() {
    clearInterval(intervalId);
    // Reset clock to initial state (if needed)
    sec1.style.transform = 'rotateZ(180deg)'; // Reset second hand
    ml.style.transform = 'rotateZ(180deg)';   // Reset minute hand
}



let hours = 0; // Set initial hours
let minutes = 0; // Set initial minutes
let seconds = 0; // Set initial seconds
let timer;





function startTimer(min,sec) {
    
    minutes=min;
    seconds=sec;
    if(min!=0 || sec!=0){
        startClock();
        timer = setInterval(decrementTimer, 1000);
    }else{
        alert("Set a time");
    }
    
}

function stopTimer() {
  
  clearInterval(timer);
}

function resetTimer() {
    stopClock()
    
    hours = 0;
    minutes = 0;
    seconds = 0;
    clearInterval(timer);
    displayTime();
}

function decrementTimer() {
    if (seconds === 0 && minutes === 0 ) {
        Music();
        clearInterval(timer);
        
        // Timer has reached zero, you can perform any action here when the timer ends.
       
        
        return;
    }
    if (seconds === 0) {
        if (minutes !== 0) {
        seconds = 59;
        minutes--;
        } else {
        if (hours !== 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        }
        }
    } else {
        seconds--;
    }
    displayTime();
}

function displayTime() {
   
    document.getElementById('minutes').innerText = formatTime(minutes);
    document.getElementById('seconds').innerText = formatTime(seconds);
    
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function Music(){
    let audio = new Audio("a.mp3");
    audio.play();
}