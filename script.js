const startBtn = document.querySelector(".start");
const timer = document.querySelector(".timer");
const pause = document.querySelector(".pause");
const settingOpenBtn = document.querySelector(".setting-btn");
const settingPanel = document.querySelector(".setting");
const settingCloseBtn = document.querySelector('.setting-close')
const breakBtns = document.querySelectorAll('.break');
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
  document.title = `${minute}: ${seconds} - Time to Work`;
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
          addClass(1)
          clearInterval(intervalId);
          LONG_BREAK_COUNT++;
        } else {
          remainingTime = WORK_TIME;
          cycle = 0;
          clearInterval(intervalId);
          addClass(0)
        }
      } else {
        if (cycle === 0) {
          cycle = 1;
          addClass(2)
          remainingTime = LONG_BREAK_TIME;
          clearInterval(intervalId);
          LONG_BREAK_COUNT = 0;
        } else {
          remainingTime = WORK_TIME;
          cycle = 0;
          clearInterval(intervalId);
          addClass(0)
        }
      }
      updateTime();
    }
  }, 1);
}

settingOpenBtn.addEventListener("click", () => {
  settingPanel.classList.toggle("hidden");
});
settingCloseBtn.addEventListener("click", () => {
  settingPanel.classList.add("hidden");
});


function addClass(element) {
  breakBtns.forEach((elem, index) => {
    elem.classList.remove('active');  
  });
  breakBtns[element].classList.add('active')
}
