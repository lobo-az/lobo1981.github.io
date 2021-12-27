let state = { materialOne: '1' , materialTwo: '2', materialThree: '3'};
let currentState = 'startTest';
let timer = document.getElementById('timer');
let email = document.getElementById('email');
let countSec = 0;
let intervalId = null;
const SEND_TIME_COUNT_URL = 'https://spread-sheet-push-app.vercel.app/api/timeCount';
const TEST_RESULT_POST_URL = 'https://spread-sheet-push-app.vercel.app/api/cors';

window.addEventListener('beforeunload', handleBeforeUnload);

function handleBeforeUnload(e) {
  e.preventDefault();
  e.returnValue = 'リロードを行うと全ての内容が破棄されます。よろしいですか?';
}

/* 教材開始時間を計測 */
function countUp() {
  countSec++;
  let minute = String(Math.floor(countSec / 60));
  let sec = String(countSec % 60);
  timer.textContent = `${minute.padStart(3, '0')}:${sec.padStart(2, '0')}`;
}

let materialContentOne = document.getElementById('material-content-1');
let materialContentTwo = document.getElementById('material-content-2');
let materialContentThree = document.getElementById('material-content-3');
let contentName = document.getElementById('content-name');
let startTestButton = document.getElementById('start-test');
let testStartModal = document.getElementById('test-start-modal');

/* 教材 1 */
let buttonMaterialOneFix = document.getElementById('fix-q-1');
let buttonMaterialOneContinue = document.getElementById('close-test-1');
let buttonMaterialOneTestStart = document.getElementById('start-test-1');
let materialTestOneBeforeModal = document.getElementById('test-1-before-modal');
let materialTestOneAfterModal = document.getElementById('test-1-after-modal');
let materialQ1 = document.getElementById('q-1');
let materialTest1 = document.getElementById('test-1');
let submitTest1 = document.getElementById('submit-test-1');
let endTest1 = document.getElementById('end-test-1');
let continueTest1 = document.getElementById('continue-test-1');

/* 教材 2 */
let buttonMaterialTwoFix = document.getElementById('fix-q-2');
let buttonMaterialTwoContinue = document.getElementById('close-test-2');
let buttonMaterialTwoTestStart = document.getElementById('start-test-2');
let materialTestTwoBeforeModal = document.getElementById('test-2-before-modal');
let materialTestTwoAfterModal = document.getElementById('test-2-after-modal');
let materialQ2 = document.getElementById('q-2');
let materialTest2 = document.getElementById('test-2');
let submitTest2 = document.getElementById('submit-test-2');
let endTest2 = document.getElementById('end-test-2');
let continueTest2 = document.getElementById('continue-test-2');

/* 教材 3 */
let buttonMaterialThreeFix = document.getElementById('fix-q-3');
let buttonMaterialThreeContinue = document.getElementById('close-test-3');
let buttonMaterialThreeTestStart = document.getElementById('start-test-3');
let materialTestThreeBeforeModal = document.getElementById('test-3-before-modal');
let materialTestThreeAfterModal = document.getElementById('test-3-after-modal');
let materialQ3 = document.getElementById('q-3');
let materialTest3 = document.getElementById('test-3');
let submitTest3 = document.getElementById('submit-test-3');
let endTest3 = document.getElementById('end-test-3');
let continueTest3 = document.getElementById('continue-test-3');

let materialOfFixModal = document.getElementById('material-of-fix-modal');

/* 教材の小テストの結果をサーバに送信 */
async function sendTestResult(questionNumber) {
  let email = document.cookie
    .split('; ')
    .find(row => row.startsWith('email'))
    .split('=')[1];

  console.log('send test result');
  console.log(document.getElementsByName(`q1-${questionNumber}`));
  console.log(document.getElementsByName(`q2-${questionNumber}`));
  console.log(document.getElementsByName(`q3-${questionNumber}`));
  console.log(document.getElementsByName(`q4-${questionNumber}`));
  console.log(document.getElementsByName(`q5-${questionNumber}`));

  let q1 = Array.from(document.getElementsByName(`q1-${questionNumber}`)).filter(function (o) { return o.checked; })[0].value;
  let q2 = Array.from(document.getElementsByName(`q2-${questionNumber}`)).filter(function (o) { return o.checked; })[0].value;
  let q3 = Array.from(document.getElementsByName(`q3-${questionNumber}`)).filter(function (o) { return o.checked; })[0].value;
  let q4 = Array.from(document.getElementsByName(`q4-${questionNumber}`)).filter(function (o) { return o.checked; })[0].value;
  let q5 = Array.from(document.getElementsByName(`q5-${questionNumber}`)).filter(function (o) { return o.checked; })[0].value;

  let sheetName = `Q${questionNumber}`;

  let sendPostData = {
    'questionNumber': sheetName,
    'email': email,
    'selectValue_0': q1,
    'selectValue_1': q2,
    'selectValue_2': q3,
    'selectValue_3': q4,
    'selectValue_4': q5,
  };

  let sendParams = Object.assign(sendPostData);
  await fetch(TEST_RESULT_POST_URL, {
    method: 'POST',
    body: JSON.stringify(sendParams),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
}

/* 教材の学習を開始 */
startTestButton.onclick = function (e) {
  if (currentState !== 'startTest') {
    e.preventDefault();
    return;
  }
  if (email.value.length == 0) {
    alert('emailが設定されていません。emailを入力してください。');
    e.preventDefault();
    return;
  }
  document.cookie = `email=${email.value}`;
  testStartModal.classList.add('is-hidden');
  intervalId = window.setInterval(countUp, 1000);

  currentState = 'materialOne';
};

/* 教材 1 続ける */
buttonMaterialOneContinue.onclick = function (e) {
  if (currentState !== 'materialOne') {
    e.preventDefault();
    return;
  }

  materialTestOneBeforeModal.classList.add('is-hidden');
};
/* 教材 1 終了 */
buttonMaterialOneFix.onclick = function (e) {
  if (currentState !== 'materialOne') {
    e.preventDefault();
    return;
  }
  materialTestOneBeforeModal.classList.remove('is-hidden');
};
/* 教材 1 テスト開始 */
buttonMaterialOneTestStart.onclick = function (e) {
  if (currentState !== 'materialOne') {
    e.preventDefault();
    return;
  }

  materialTestOneBeforeModal.classList.add('is-hidden');
  materialQ1.classList.add('is-hidden');
  materialTest1.classList.remove('is-hidden');

  window.scroll({ top: 0, behavior: 'smooth' });
};
/* 教材 1 テスト終了 */
submitTest1.onclick = function (e) {
  if (currentState !== 'materialOne') {
    e.preventDefault();
    return;
  }

  materialTestOneAfterModal.classList.remove('is-hidden');
};
/* 教材 1 テストを引き続き行う */
continueTest1.onclick = function (e) {
  if (currentState !== 'materialOne') {
    e.preventDefault();
    return;
  }

  materialTestOneAfterModal.classList.add('is-hidden');
};
/* 教材 1 小テストを終了し、結果をサーバに送信する */
endTest1.onclick = async function (e) {
  if (currentState !== 'materialOne') {
    e.preventDefault();
    return;
  }

  await sendTestResult(1);

  materialTest1.classList.add('is-hidden');
  materialTestOneAfterModal.classList.add('is-hidden');
  materialQ2.classList.remove('is-hidden');
  materialContentOne.classList.remove('material-current');
  materialContentOne.classList.add('material-other');
  materialContentTwo.classList.remove('material-other');
  materialContentTwo.classList.add('material-current');
  contentName.innerHTML = '教材 2';

  window.scroll({ top: 0, behavior: 'smooth' });

  currentState = 'materialTwo';
};

/* 教材 2 終了 */
buttonMaterialTwoFix.onclick = function (e) {
  if (currentState !== 'materialTwo') {
    e.preventDefault();
    return;
  }

  materialTestTwoBeforeModal.classList.remove('is-hidden');
};

/* 教材 2 続ける */
buttonMaterialTwoContinue.onclick = function (e) {
  if (currentState !== 'materialTwo') {
    e.preventDefault();
    return;
  }

  materialTestTwoBeforeModal.classList.add('is-hidden');
};

/* 教材 2 テスト開始 */
buttonMaterialTwoTestStart.onclick = function (e) {
  if (currentState !== 'materialTwo') {
    e.preventDefault();
    return;
  }

  materialTestTwoBeforeModal.classList.add('is-hidden');
  materialQ2.classList.add('is-hidden');
  materialTest2.classList.remove('is-hidden');
};
/* 教材 2 テスト終了 */
submitTest2.onclick = function (e) {
  if (currentState !== 'materialTwo') {
    e.preventDefault();
    return;
  }

  materialTestTwoAfterModal.classList.remove('is-hidden');
};
/* 教材 2 テストを引き続き行う */
continueTest2.onclick = function (e) {
  if (currentState !== 'materialTwo') {
    e.preventDefault();
    return;
  }

  materialTestTwoAfterModal.classList.add('is-hidden');
};
/* 教材 2 小テストを終了し、結果をサーバに送信する */
endTest2.onclick = async function (e) {
  if (currentState !== 'materialTwo') {
    e.preventDefault();
    return;
  }

  await sendTestResult(2);

  materialTest2.classList.add('is-hidden');
  materialTestTwoAfterModal.classList.add('is-hidden');
  materialQ3.classList.remove('is-hidden');
  materialContentTwo.classList.remove('material-current');
  materialContentTwo.classList.add('material-other');
  materialContentThree.classList.remove('material-other');
  materialContentThree.classList.add('material-current');
  contentName.innerHTML = '教材 3';

  currentState = 'materialThree';
};

/* 教材 3 終了 */
buttonMaterialThreeFix.onclick = function (e) {
  if (currentState !== 'materialThree') {
    e.preventDefault();
    return;
  }

  materialTestThreeBeforeModal.classList.remove('is-hidden');
};

/* 教材 3 続ける */
buttonMaterialThreeContinue.onclick = function (e) {
  if (currentState !== 'materialThree') {
    e.preventDefault();
    return;
  }

  materialTestThreeBeforeModal.classList.add('is-hidden');
};

/* 教材 3 テスト開始 */
buttonMaterialThreeTestStart.onclick = function (e) {
  if (currentState !== 'materialThree') {
    e.preventDefault();
    return;
  }

  materialTestThreeBeforeModal.classList.add('is-hidden');
  materialQ3.classList.add('is-hidden');
  materialTest3.classList.remove('is-hidden');
};
/* 教材 3 テスト終了 */
submitTest3.onclick = function (e) {
  if (currentState !== 'materialThree') {
    e.preventDefault();
    return;
  }

  materialTestThreeAfterModal.classList.remove('is-hidden');
};
/* 教材 3 テストを引き続き行う */
continueTest3.onclick = function (e) {
  if (currentState !== 'materialThree') {
    e.preventDefault();
    return;
  }

  materialTestThreeAfterModal.classList.add('is-hidden');
};
/* 教材 3 小テストを終了し、結果をサーバに送信する */
endTest3.onclick = async function (e) {
  if (currentState !== 'materialThree') {
    e.preventDefault();
    return;
  }

  await sendTestResult(3);

  window.clearInterval(intervalId);

  let sendPostData = {
    email: email.value,
    timeCount: countSec,
    sheetName: 'improved'
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

  materialTest3.classList.add('is-hidden');
  materialTestThreeAfterModal.classList.add('is-hidden');
  materialOfFixModal.classList.remove('is-hidden');

  currentState = 'materialOfFix';
};