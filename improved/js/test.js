var POST_URL = 'https://spread-sheet-push-app.vercel.app/api/cors';

document.getElementById("submit").onclick = async function sendResult(e) {
  var sheetName = document.getElementById('sheetName').value;
  var q1 = _.filter(document.getElementsByName("q1"), function (o) { return o.checked; })[0].value;
  var q2 = _.filter(document.getElementsByName("q2"), function (o) { return o.checked; })[0].value;
  var q3 = _.filter(document.getElementsByName("q3"), function (o) { return o.checked; })[0].value;
  var q4 = _.filter(document.getElementsByName("q4"), function (o) { return o.checked; })[0].value;
  var q5 = _.filter(document.getElementsByName("q5"), function (o) { return o.checked; })[0].value;

  var email = document.cookie
    .split('; ')
    .find(function (row) { return row.startsWith('email'); })
    .split('=')[1];

  var sendPostData = {
    'questionNumber': sheetName,
    'email': email,
    'selectValue_0': q1,
    'selectValue_1': q2,
    'selectValue_2': q3,
    'selectValue_3': q4,
    'selectValue_4': q5,
  };

  var params = Object.assign(sendPostData);

  console.dir(params);
  await fetch(POST_URL, {
    method: 'POST',
    body: JSON.stringify(params),
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