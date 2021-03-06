const TEST_WRAPPER = document.querySelector(".test-wrapper");
const TEST_AREA = document.querySelector("#test-area");
const ORIGIN_TEXT = document.querySelector("#origin-text p").innerHTML;
const RESET_BUTTON = document.querySelector("#reset");
const THE_TIMER = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }

  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);

  THE_TIMER.innerHTML = currentTime;

  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = TEST_AREA.value;

  let originTextMatch = ORIGIN_TEXT.substring(0, textEntered.length);

  if (textEntered == ORIGIN_TEXT) {
    clearInterval(interval);
    TEST_WRAPPER.id = "success";
  } else {
    if (textEntered == originTextMatch) {
      TEST_WRAPPER.id = "typing-success";
    } else {
      TEST_WRAPPER.id = "fail";
    }
  }
}

// Start the timer:
function start() {
  let textEnteredLength = TEST_AREA.value.length;

  if (textEnteredLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;

  TEST_AREA.value = "";
  THE_TIMER.innerHTML = "00:00:00";
  TEST_WRAPPER.removeAttribute("id");
}

// Event listeners for keyboard input and the reset button:
TEST_AREA.addEventListener("keypress", start, false);
TEST_AREA.addEventListener("keyup", spellCheck, false);
RESET_BUTTON.addEventListener("click", reset, false);
