const POST_URL = 'https://spread-sheet-push-app.vercel.app/api/cors';
const GET_EXISTS_MAIL_ADDRESS_URL = 'https://script.google.com/macros/s/AKfycbzzO95N6DSIj_vibFx86ECr0ES2DZShFfJuGAj96qGFJHRrMcy5mLP4VEYL48eDBLkytA/exec';

async function getExistsEmail(email, questionNumber) {
  let params = new URLSearchParams({ questionNumber: questionNumber, email: email });
  console.log(`${GET_EXISTS_MAIL_ADDRESS_URL}?${params}`);
  let response = await fetch(`${GET_EXISTS_MAIL_ADDRESS_URL}?${params}`, { mode: 'no-cors' });

  let text = await response.text();
  text = text ? utf8Decoder.decode(text) : '';

  console.log(`response is ${text}`);

  const re = /not/gm;
  let result = re.exec(text);

  return !result;
}

document.getElementById("submit").onclick = async function sendResult(e) {
  let sheetName = document.getElementById('sheetName').value;
  let q1 = Array.from(document.getElementsByName("q1")).filter(function (o) { return o.checked; })[0].value;
  let q2 = Array.from(document.getElementsByName("q2")).filter(function (o) { return o.checked; })[0].value;
  let q3 = Array.from(document.getElementsByName("q3")).filter(function (o) { return o.checked; })[0].value;
  let q4 = Array.from(document.getElementsByName("q4")).filter(function (o) { return o.checked; })[0].value;
  let q5 = Array.from(document.getElementsByName("q5")).filter(function (o) { return o.checked; })[0].value;

  let email = document.cookie
    .split('; ')
    .find(function (row) { return row.startsWith('email'); })
    .split('=')[1];

  let emailExists = await getExistsEmail(email, sheetName);

  if (emailExists) {
    alert('すでに小テストに回答済みです。');
    e.preventDefault();
    return;
  }

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
  await fetch(POST_URL, {
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
};