const startBtn = document.querySelector(".start");
const timer = document.querySelector(".timer");
const pause = document.querySelector(".pause");
const WORK_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;
let LONG_BREAK_COUNT = 0;
let remainingTime = WORK_TIME;
let cycle = 0;

startBtn.addEventListener("click", () => {
  startBtn.setAttribute("disabled", true);
  startCountdown();
});

function stopCountdown() {
  startBtn.removeAttribute("disabled");
  clearInterval(intervalId);
  updateTime();
}

pause.addEventListener("click", stopCountdown);

function updateTime() {
  let minute = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  minute = minute >= 10 ? `${minute}` : `0${minute}`;
  seconds = seconds >= 10 ? `${seconds}` : `0${seconds}`;
  timer.textContent = `${minute}: ${seconds}`;
  document.title = `${minute}: ${seconds} - Time To Work`;
}

function startCountdown() {
  intervalId = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateTime();
    } else {
      startBtn.removeAttribute("disabled");
      if (LONG_BREAK_COUNT < 3) {
        if (cycle === 0) {
          cycle = 1;
          remainingTime = SHORT_BREAK_TIME;
          clearInterval(intervalId);
          LONG_BREAK_COUNT++;
        } else {
          remainingTime = WORK_TIME;
          cycle = 0;
          clearInterval(intervalId);
        }
      } else {
        if (cycle === 0) {
          cycle = 1;
          remainingTime = LONG_BREAK_TIME;
          clearInterval(intervalId);
          LONG_BREAK_COUNT = 0;
        } else {
          remainingTime = WORK_TIME;
          cycle = 0;
          clearInterval(intervalId);
        }
      }
      updateTime();
    }
  }, 1000);
}

