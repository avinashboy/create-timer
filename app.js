document.getElementById("pushBtn").addEventListener('click', () => {
  const { descriptionHead = "", date, title, year, mainHead } = getInfo()
  const file = contentFile(date, year, mainHead, title, descriptionHead)
  console.log('file:', file)
  const filename = "index.html"
  download(filename, file)
  clearUs()
})

function cleanInput(message) {
  return validator.escape(message)
}

function clearUs() {
  $('#title').val("")
  $('#date').val("")
  $('#time').val("")
  $('#descriptionHead').val("")
  return
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getInfo() {
  const title = cleanInput($('#title').val())
  const date = $('#date').val().split("-")
  const time = $('#time').val()
  const descriptionHead = cleanInput($('#descriptionHead').val())
  const payLoad = { title, descriptionHead, date: `${months[(date[1] - 1)].slice(0, 3)} ${date[2]}, ${date[0]} ${time}:00`, mainHead: `${date[2]}<sup>${getOrdinal(date[2])}</sup> Of ${months[(date[1] - 1)]}`, year: `${months[(date[1] - 1)].slice(0, 3)} | ${date[0]}`, number: date[2] }
  return payLoad
}

function getOrdinal(day) {
  var a = day % 10;
  return (1 == ~~(day % 100 / 10) ? "th" : 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th")
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function contentFile(time, tabTitle, mainHead, title, descriptionHead) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="google" content="notranslate">
<meta name="og:description" content="Wait for it">
<meta name="og:url" content="">
<meta name="og:title" content="Count timer">
<meta name="og:image" content="https://i.ibb.co/kJSVKwx/iconfinder-stop-watch-time-count-2203547.png">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<link rel="shortcut icon" href="https://i.ibb.co/kJSVKwx/iconfinder-stop-watch-time-count-2203547.png" type="image/x-icon" />
<link href="https://fonts.googleapis.com/css?family=Lato|Montserrat|Rubik+Mono+One&display=swap" rel="stylesheet" />
<title>Your journey</title>
<script>
document.title = '${tabTitle}'
  const timer = '${time}'

  var countDownDate = new Date(timer).getTime();

  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      counter(~days, ~hours, ~minutes, ~seconds, "STARTED")
    } else {
      counter(days, hours, minutes, seconds, "LEFT")
    }

  }, 1000);

  function counter(days, hours, minutes, seconds, bool) {
  return document.getElementById("countdown").innerHTML = '<div class= "days" > \
            <div class="c-number">' +
    days +
    '</div>days</div> \
            <div class="hours"> \
          <div class="c-number">' +
    hours +
    '</div>hours</div> \
            <div class="minutes"> \
          <div class="c-number">' +
    minutes +
    '</div>minutes</div> \
            <div class="seconds"> \
          <div class="c-number">' +
    seconds +
    '</div>seconds</div>  \
    <div class="left">'+bool+'</div>\
</div>'
}



</script>

<style>
html {
display: grid;
min-height: 100%;
}

body {
display: grid;
background: #333;
}

.main {
position: relative;
margin: auto;
overflow: hidden;
width: 850px;
height: 480px;
}

.demo {
font-family: 'Montserrat', sans-serif;
text-align: center;
margin-top: .5em;
font-size: .75em;
text-transform: capitalize;
letter-spacing: 3px;
color: #f6f4f3;
align-items: center;
}

.addSpace{
margin-bottom: 1.5rem;
}

h1 {
font-family: 'Montserrat', sans-serif;
text-align: center;
margin-top: 2em;
font-size: 2em;
text-transform: uppercase;
letter-spacing: 3px;
color: #f6f4f3;
}
h1 sup {
text-transform: lowercase;
color: #ff3e41;
}

.yt{
background: #FF0000;
padding: 5px;
border-radius: 6px;
text-align: center;
line-height: 1;
font-weight: 700;
margin-right: 5px;
}

#countdown {
color: #f6f4f3;
text-align: center;
text-transform: uppercase;
font-family: 'Lato', sans-serif;
font-size: 0.7em;
letter-spacing: 5px;
margin-top: 5%;
}

.days,
.hours,
.minutes,
.seconds,
.left {
display: inline-block;
padding: 10px 20px;
width: 120px;
border-radius: 10px;
}

.days {
background: #d87200;
}

.hours {
background: #ff3e41;
}

.minutes {
background: #ffb20c;
}

.seconds {
background: #2186ff;
}

.left {
background: #e10a0a;
}
.c-number {
font-family: 'Montserrat', sans-serif;
color: #333;
font-size: 5em;
}

/* Add
*/
.demo a{
text-transform: uppercase;
font-size: 35px;
font-weight: 300;
color: #f6f4f3;
text-align: center;
text-decoration: none;
}

@media only screen and (max-width: 500px) {
body {
overflow: hidden;
}
.main {
width: 50%;
height: 100%;
display: flex;
flex-flow: column;
}

.days,
.hours,
.minutes,
.seconds,
.left {
margin: 5px;
padding: 10px 20px;
}
}

</style>
</head>

<body>
<div class="container">
<h1 class="mainLead">${mainHead}</h1>
<h4 class="demo addSpace">${title}</h4>
<h6 class="demo addSpace">${descriptionHead}</h6>
<div class="main" id="main">
  <div id="countdown"></div>
</div>
<h1 id="demo" class="demo"></h1>
</div>
</body>
</html>
`
}
