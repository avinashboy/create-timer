(() => {
  "use strict";
  let colorName = "Default",
    tempText = "",
    tempFileName = "";

  document.getElementById("pushBtn").addEventListener("click", () => {
    const {
      descriptionContent = "",
      date,
      subContent,
      tabTitle,
      mainContent,
      uiPart,
    } = getInfo();

    const file = contentFile(
      date,
      tabTitle,
      mainContent,
      subContent,
      descriptionContent,
      uiPart
    );
    const filename = uiPart.text.fileName;
    tempText = file;
    tempFileName = filename;
    forIframe(file);
    clearUs();
    $(".main,#pushBtn").fadeOut();
    $(".subMain").fadeIn();
  });

  document
    .getElementById("showAdvance")
    .addEventListener("click", hideOrUnhide);

  function hideOrUnhide() {
    $(".hides").is(":visible")
      ? ($("#showAdvance").text("Show Advance"),
        $(".hides").css("display", "none"))
      : ($("#showAdvance").text("Show Less"),
        $(".hides").css("display", "block"));
  }

  document.getElementById("showPreview").onclick = () => {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    if (screen.width < 512) modalImg.src = "./preview/phone view.png";
    else modalImg.src = "./preview/web view.png";
    document.getElementsByClassName("close")[0].onclick = () => {
      modal.style.display = "none";
    };
  };

  document
    .getElementById("selectValueColor")
    .addEventListener("change", selectValue);

  document
    .getElementById("flexCheckChecked")
    .addEventListener("click", changerColor);

  function selectValue() {
    const text = $("#selectValueColor").find(":selected").val();
    sendTheColorInfo(text.toLowerCase());
  }

  function changerColor(e) {
    if (e.checked) sendTheColorInfo(colorName);
    else sendTheColorInfo(colorName);
  }

  function sendTheColorInfo(value) {
    console.log("value:", value);
    colorName = value;
    let swap = document.getElementById("flexCheckChecked").checked;
    const colorInfo = {
      redblack: {
        color: "#FF0000",
        bg: "#090E11",
      },
      blackwhite: {
        color: "#F1F1F1",
        bg: "#494949",
      },
      blackorange: {
        color: "#555A60",
        bg: "#F2C080",
      },
      default: {
        color: "#000000",
        bg: "#000000",
      },
      violetblooming: {
        color: "#8B7DAB",
        bg: "#E9B5AC",
      },
      bluemint: {
        color: "#C2F1DB",
        bg: "#496076",
      },
      graylimepunch: {
        color: "#8C8C8C",
        bg: "#DFEF5A",
      },
      blackblazingyellow: {
        color: "#545B60",
        bg: "#FBEA58",
      },
      pinkcharcoal: {
        color: "#F9DAD5",
        bg: "#969695",
      },
      blackcherrytomato: {
        color: "#EC7E74",
        bg: "#686664",
      },
    };

    for (const property in colorInfo) {
      if (property === value) {
        let { bg, color } = colorInfo[property];
        if (swap) invertColorChanger(bg, color);
        else colorChanger(bg, color);
      }
    }

    function colorChanger(bg, color) {
      $("#badgeBgColor").val(color);
      $("#background").val(bg);
      $("#colorOne").val(color);
      $("#colorTwo").val(color);
      $("#colorThree").val(color);
      $("#colorFour").val(color);
      $("#textColor").val(color);
      $("#boxTextColor").val(bg);
      $("#numberColor").val(bg);
    }
  }

  function invertColorChanger(bg, color) {
    $("#badgeBgColor").val(bg);
    $("#background").val(color);
    $("#colorOne").val(bg);
    $("#colorTwo").val(bg);
    $("#colorThree").val(bg);
    $("#colorFour").val(bg);
    $("#textColor").val(bg);
    $("#boxTextColor").val(color);
    $("#numberColor").val(color);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function cleanInput(message) {
    return validator.escape(message);
  }

  function clearUs() {
    $("#title").val("");
    $("#date").val("");
    $("#time").val("");
    $("#descriptionHead").val("");
    $("#pastText").val("");
    $("#futureText").val("");
    $("#fileName").val("");
    $("#badgeBgColor").val("#000000");
    $("#background").val("#000000");
    $("#colorOne").val("#000000");
    $("#colorTwo").val("#000000");
    $("#colorThree").val("#000000");
    $("#colorFour").val("#000000");
    $("#textColor").val("#000000");
    $("#boxTextColor").val("#000000");
    $("#numberColor").val("#000000");
    return;
  }

  function alert(className, message) {
    return (
      $("#alertMe").fadeIn(),
      $("#alertMe").html(
        `<div class="alert alert-${className}" role="alert">${message}</div>`
      ),
      setTimeout(() => {
        $("#alertMe").fadeOut(1000).empty();
      }, 4000)
    );
  }

  function getInfo() {
    try {
      const subContent = cleanInput($("#title").val());

      const date = $("#date").val().split("-");

      const time = $("#time").val();

      const descriptionContent = cleanInput($("#descriptionHead").val());

      const backgroundColor = assignValue(
        "backgroundColor",
        $("#background").val()
      );

      const colorOne = assignValue("colorOne", $("#colorOne").val());

      const colorTwo = assignValue("colorTwo", $("#colorTwo").val());

      const colorThree = assignValue("colorThree", $("#colorThree").val());

      const colorFour = assignValue("colorFour", $("#colorFour").val());

      const badgeBgColor = assignValue(
        "badgeBgColor",
        $("#badgeBgColor").val()
      );

      const textColor = assignValue("textColor", $("#textColor").val());

      const boxTextColor = assignValue(
        "boxTextColor",
        $("#boxTextColor").val()
      );

      const numberColor = assignValue("numberColor", $("#numberColor").val());

      const pastText = cleanInput($("#pastText").val()) || "started";

      const futureText = cleanInput($("#futureText").val()) || "left";

      let fileName = cleanInput($("#fileName").val()) || "index.html";

      if (!fileName.endsWith(".html")) fileName += ".html";

      const payLoad = {
        subContent,
        descriptionContent,
        date: `${months[date[1] - 1].slice(0, 3)} ${date[2]}, ${date[0]} ${
          time ? time : "00:00"
        }:00`,
        mainContent: `${date[2]}<sup>${getOrdinal(date[2])}</sup> Of ${
          months[date[1] - 1]
        }`,
        tabTitle: `${months[date[1] - 1].slice(0, 3)} | ${date[0]}`,
        uiPart: {
          color: {
            textColor,
            boxTextColor,
            badgeBgColor,
            colorFour,
            colorThree,
            colorTwo,
            colorOne,
            backgroundColor,
            numberColor,
          },
          text: {
            fileName,
            futureText,
            pastText,
          },
        },
      };

      return payLoad;
    } catch (error) {
      console.log("error:", error);
      alert("danger", "Try again later");
    }
  }

  function assignValue(element, value) {
    const listOfColor = {
      backgroundColor: "#333;",
      colorOne: "#d87200;",
      colorTwo: "#ff3e41;",
      colorThree: "#ffb20c;",
      colorFour: "#2186ff;",
      badgeBgColor: "#e10a0a;",
      textColor: "#f6f4f3;",
      numberColor: "#333;",
      boxTextColor: "#ffffff;",
    };

    if (value === "#000000") {
      for (const property in listOfColor)
        if (element === property) {
          return listOfColor[property];
        }
    } else {
      return `${value};`;
    }
  }

  function getOrdinal(day) {
    var a = day % 10;
    return 1 == ~~((day % 100) / 10)
      ? "th"
      : 1 === a
      ? "st"
      : 2 === a
      ? "nd"
      : 3 === a
      ? "rd"
      : "th";
  }

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function forIframe(text) {
    const linkData = "data:text/html;charset=utf-8," + encodeURIComponent(text);
    const iframe = document.createElement("iframe");
    iframe.src = `${linkData}`;
    iframe.setAttribute("class", "iframe");
    const otherDiv = document.createElement("div");
    otherDiv.setAttribute("class", "col-sm-1 mt-3 mb-4");
    otherDiv.innerHTML = `
    <button type="button" id="backBtn" class="btn btn-primary">
      Back
    </button>
  `;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="col-sm-6 mt-3">
      <div class="mb-3">
        <label for="background" class="form-label d-block">Choose </label>
        <div class="box">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="file">
            <label class="form-check-label" for="inlineRadio1">File</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="link">
            <label class="form-check-label" for="inlineRadio2">Link</label>
          </div>
        </div>
        <div id="pasteHere">
        </div>
      </div>
    </div>
    `;
    div.setAttribute("class", "mt-2 mb-3");
    document
      .getElementsByClassName("showDemo")[0]
      .append(otherDiv, iframe, div);
    document.getElementById("backBtn").onclick = () => {
      $(".main,#pushBtn").fadeIn();
      $(".subMain").empty();
    };
    $("input[type='radio'][name='inlineRadioOptions']").click(function () {
      const value = $(this).val();
      if (value === "file") download(tempFileName, tempText);
      if (value === "link")
        link(tempFileName, tempText)
          .then((res) => {
            const { url } = res;
            const div = document.createElement("div");
            div.innerHTML = `
            <input id="foo" value="${url}">
            <button class="btn btn-primary" data-clipboard-action="copy" data-clipboard-target="#foo">copy</button>
            `;
            document.getElementById("pasteHere").appendChild(div);
            var clipboard = new ClipboardJS(".btn");

            clipboard.on("success", function (e) {
              e.clearSelection();
            });

            clipboard.on("error", function (e) {
              // console.error('Action:', e.action);
              // console.error('Trigger:', e.trigger);
            });
          })
          .catch((error) => {
            alert("danger", error);
          });
    });
  }

  async function link(fileName, text) {
    const ipfs = IpfsHttpClient.create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });
    const { path } = await ipfs.add(text);
    return { url: `https://ipfs.io/ipfs/${path}`, fileName };
  }

  function contentFile(
    date,
    tabTitle,
    mainContent,
    subContent,
    descriptionContent,
    uiPart
  ) {
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
    const timer = '${date}'
    const started = '${uiPart.text.pastText}'
    const left = '${uiPart.text.futureText}'
  
    var countDownDate = new Date(timer).getTime();
  
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        counter(~days, ~hours, ~minutes, ~seconds, started)
      } else {
        counter(days, hours, minutes, seconds, left)
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
  :root {
    --bg: ${uiPart.color.backgroundColor}
    --textColor: ${uiPart.color.textColor}
    --firstBox:${uiPart.color.colorOne}
    --secondBox: ${uiPart.color.colorTwo}
    --thirdBox: ${uiPart.color.colorThree}
    --fourBox: ${uiPart.color.colorFour}
    --lastBox: ${uiPart.color.badgeBgColor}
    --numberColor : ${uiPart.color.numberColor}
    --boxTextColor: ${uiPart.color.boxTextColor}
  }
  html {
    display: grid;
    min-height: 100%;
  }
  
  body {
    display: grid;
    background: var(--bg);
  }
  
  .main {
    position: relative;
    margin: auto;
    overflow: hidden;
    width: 850px;
    height: 480px;
  }
  
  .demo {
    font-family: "Montserrat", sans-serif;
    text-align: center;
    margin-top: 0.5em;
    font-size: 0.75em;
    text-transform: capitalize;
    letter-spacing: 3px;
    color: var(--textColor);
    align-items: center;
  }
  
  .addSpace {
    margin-bottom: 1.5rem;
  }
  
  h1 {
    font-family: "Montserrat", sans-serif;
    text-align: center;
    margin-top: 2em;
    font-size: 2em;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--textColor);
  }
  h1 sup {
    text-transform: lowercase;
    color: var(--secondBox);
  }
  
  #countdown {
    color: var(--textColor);
    text-align: center;
    text-transform: uppercase;
    font-family: "Lato", sans-serif;
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
    color: var(--boxTextColor);
  }
  
  .days {
    background-color: var(--firstBox);
  }
  
  .hours {
    background-color: var(--secondBox);
  }
  
  .minutes {
    background-color: var(--thirdBox);
  }
  
  .seconds {
    background-color: var(--fourBox);
  }
  
  .left {
    background-color: var(--lastBox);
  }
  .c-number {
    font-family: "Montserrat", sans-serif;
    color: var(--numberColor);
    font-size: 5em;
  }
  
  /* Add
  */
  .demo a {
    text-transform: uppercase;
    font-size: 35px;
    font-weight: 300;
    color: var(--textColor);
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
  <h1 class="mainLead">${mainContent}</h1>
  <h4 class="demo addSpace">${subContent}</h4>
  <h6 class="demo addSpace">${descriptionContent}</h6>
  <div class="main" id="main">
    <div id="countdown"></div>
  </div>
  <h1 id="demo" class="demo"></h1>
  </div>
  </body>
  </html>
  `;
  }
})();
