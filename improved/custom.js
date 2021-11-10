let button = document.getElementById('counter');
let counterStart = false;
let countSec = 0;
let intervalId = null;

button.onclick = clickHandler;

function clickHandler() {
  counterStart = !counterStart;

  if (counterStart) {
    intervalId = window.setInterval(countUp, 1000);
    button.textContent = 'Stop';
  } else {
    window.clearInterval(intervalId);
    button.textContent = 'Start';
  }
}

function countUp() {
  countSec++;
  let minute = String(Math.floor(countSec / 60));
  let sec = String(countSec % 60);
  let countTime = document.getElementById('count_time');
  countTime.textContent = `${minute.padStart(3, '0')}:${sec.padStart(2, '0')}`;
}