let time = 1 * 60;
let interval = null;
let minuteElem = document.querySelector('#minutes');
let secondElem = document.querySelector('#seconds');
let startElem = null;
let pauseElem = null;
let resetElem = null;
let tick = new Howl({
  src: 'tick.mp3'
});
let tada = new Howl({
  src: 'tada.mp3'
});
function start($event) {
  startElem.setAttribute('disabled', 'disabled');
  interval = setInterval(startCountdown, 1000);
  pauseElem.removeAttribute('disabled');
  resetElem.removeAttribute('disabled');
}
window.addEventListener('load', () => {
  minuteElem.innerHTML = padding(Math.floor(time / 60));
  secondElem.innerHTML = padding(time - 60 * Math.floor(time / 60));
  startElem = document.querySelector('#start');
  pauseElem = document.querySelector('#pause');
  resetElem = document.querySelector('#reset');
  // interval = setInterval(startCountdown, 1000);
});

function startCountdown() {
  let minutes = padding(Math.floor(time / 60));
  let seconds = padding(time - 60 * minutes);
  minuteElem.innerHTML = minutes;
  secondElem.innerHTML = seconds;
  time -= 1;
  let tickId = tick.play();
  if (time === 0) {
    tick.stop();
    clearInterval(interval);
    tada.play();
  }
}

function padding(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}

function pause() {
  clearInterval(interval);
  startElem.removeAttribute('disabled');
  pauseElem.setAttribute('disabled', 'disabled');
}

function reset() {
  time = 25 * 60;
  clearInterval(interval);
  minuteElem.innerHTML = padding(Math.floor(time / 60));
  secondElem.innerHTML = padding(time - 60 * Math.floor(time / 60));
}

document.querySelector('#twenty-five-min').addEventListener('click', () => {
  time = 25 * 60;
  start();
});

function startCustomTimer($event, cTime) {
  time = cTime * 60;
  clearInterval(interval);
  start($event);
}
