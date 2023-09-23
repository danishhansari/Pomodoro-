const startBtn = document.querySelector(".start");
const timer = document.querySelector(".timer");
const pause = document.querySelector(".pause");
const settingOpenBtn = document.querySelector(".setting-btn");
const settingPanel = document.querySelector(".setting");
const settingCloseBtn = document.querySelector(".setting-close");
const breakBtns = document.querySelectorAll(".break");
const submitForm = document.querySelector(".submit");
let workTimeInput = document.querySelector(".pomo-input input");
let shortBreakInput = document.querySelector(".short-input input");
let longBreakInput = document.querySelector(".long-input input");
let LONG_BREAK_COUNT = document.querySelector(".longBreakInterval input");
let WORK_TIME = Number(workTimeInput.value) * 60;
let SHORT_BREAK_TIME = Number(shortBreakInput.value) * 60;
let LONG_BREAK_TIME = Number(longBreakInput.value) * 60;
let remainingTime = WORK_TIME;
let cycle = 0;
let intervalId;
let interval = 0;

startBtn.addEventListener("click", () => {
  startBtn.setAttribute("disabled", true);
  startCountdown(
    WORK_TIME,
    SHORT_BREAK_TIME,
    LONG_BREAK_TIME,
    LONG_BREAK_COUNT
  );
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

function startCountdown(
  workTime,
  shortBreakTime,
  longBreakTime,
  longBreakCount
) {
  intervalId = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateTime();
    } else {
      startBtn.removeAttribute("disabled");
      if (interval < longBreakCount) {
        if (cycle === 0) {
          cycle = 1;
          remainingTime = shortBreakTime;
          addClass(1);
          clearInterval(intervalId);
          interval++;
          document.body.style.backgroundColor = '#38858a'
        } else {
          remainingTime = workTime;
          cycle = 0;
          clearInterval(intervalId);
          addClass(0);
          document.body.style.backgroundColor = '#ba4949'
        }
      } else {
        if (cycle === 0) {
          cycle = 1;
          addClass(2);
          remainingTime = longBreakTime;
          clearInterval(intervalId);
          interval = 0;
          document.body.style.backgroundColor = '#397097'
        } else {
          remainingTime = workTime;
          cycle = 0;
          clearInterval(intervalId);
          addClass(0);
          document.body.style.backgroundColor = '#ba4949'
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
  breakBtns.forEach((elem) => {
    elem.classList.remove("active");
  });
  breakBtns[element].classList.add("active");
}

submitForm.addEventListener("click", () => {
  workTimeInput = Number(workTimeInput.value)
  shortBreakInput = Number(shortBreakInput.value)
  longBreakInput = Number(longBreakInput.value)
  LONG_BREAK_COUNT = Number(LONG_BREAK_COUNT.value)
  WORK_TIME = workTimeInput * 60;
  SHORT_BREAK_TIME = shortBreakInput * 60;
  LONG_BREAK_TIME = longBreakInput * 60;
  remainingTime = WORK_TIME;
  settingPanel.classList.add("hidden");
  updateTime();
  timer.textContent = `${WORK_TIME / 60}: 00`;
  document.title = `${WORK_TIME / 60}: ${WORK_TIME % 60}0 - Time to Work`;
});
