let counterButton = document.getElementById('counter');
let submit = document.getElementById('submit');
let email = document.getElementById('email');
let closeBeforeModalButton = document.getElementById('close-before-modal');
let beforeModal = document.getElementById('before-modal');
let afterModal = document.getElementById('after-modal');
let isCounterStarted = false;
let counterStart = false;
let countSec = 0;
let intervalId = null;

const SEND_TIME_COUNT_URL = 'https://spread-sheet-push-app.vercel.app/api/timeCount';
//const SEND_TIME_COUNT_URL = 'http://localhost:3000/api/timeCount';
counterButton.onclick = counterClickHandler;
closeBeforeModalButton.onclick = closeBeforeModalClickHandler;
submit.onclick = submitClickHandler;

function closeBeforeModalClickHandler() {
  beforeModal.setAttribute("class", "is-hidden");
  counterButton.removeAttribute("disabled");
}

function counterClickHandler() {
  counterStart = !counterStart;

  if (counterStart) {
    intervalId = window.setInterval(countUp, 1000);
    counterButton.textContent = 'Stop';
    submit.removeAttribute("disabled");
    isCounterStarted = true;
  } else {
    window.clearInterval(intervalId);
    counterButton.textContent = 'Start';
  }
}

async function submitClickHandler(e) {
  if (!isCounterStarted) {
    alert('時間計測を一度もしていません。時間計測を開始し、教材を学習した時間を保存してください');
    e.preventDefault();
    return;
  }
  if (email.value.length === 0) {
    alert('emailアドレスを入力してください。');
    e.preventDefault();
    return;
  }

  let sendPostData = {
    email: email.value,
    timeCount: countSec,
    sheetName: 'original'
  };
  let sendParams = Object.assign(sendPostData);

  await fetch(SEND_TIME_COUNT_URL, {
    method: 'POST',
    body: JSON.stringify(sendParams),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  afterModal.classList.remove("is-hidden");
  return;
}

function countUp() {
  countSec++;
  let minute = String(Math.floor(countSec / 60));
  let sec = String(countSec % 60);
  let countTime = document.getElementById('count_time');
  countTime.textContent = `${minute.padStart(3, '0')}:${sec.padStart(2, '0')}`;
}