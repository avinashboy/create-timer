(() => {
  "use strict";
  const mainRoot = document.getElementById("mainRoot");

  function makeElement(text) {
    return document.createElement(`${text}`);
  }

  (() => {
    return mainRoot.append(
      makeAlertElement(),
      mainContent(),
      makePushBtn(),
      showDemo()
    );
  })();

  function creatingCol(label, id, type, help) {
    const div = makeElement("div");
    div.setAttribute("class", "col-sm-6 mt-3");
    div.innerHTML = `
        <div class="mb-3">
          <label for="${id}" class="form-label">${label}</label>
          <input type="${type}" class="form-control" id="${id}" required />
          ${helpText(help)}
        </div>
        `;
    return div;
  }

  function showDemo() {
    const div = makeElement("div");
    div.setAttribute("class", "showDemo mt-5 mb-4 subMain");
    return div;
  }

  function helpText(text) {
    if (!text) return "";
    return `
        <div id="emailHelp" class="form-text">${text}</div>
        `;
  }

  function showAdvance() {
    const div = makeElement("div");
    div.setAttribute("class", "col-sm-6 col mt-3");
    div.innerHTML = `
        <div class="mb-3">
          <label id="showAdvance" class="form-label text-primary advanced">Show Advance</label>
        </div>
        `;
    return div;
  }

  function showPreview() {
    const div = makeElement("div");
    div.setAttribute("class", "col-sm-6 col mt-3 hides");
    div.innerHTML = `
        <div class="mb-3">
          <label id="showPreview" class="form-label text-primary advanced">Show Preview</label>
          <div id="myModal" class="modal">
            <span class="close">&times;</span>
            <img class="modal-content" id="img01" />
            <div id="caption"></div>
          </div>
        </div>
        `;
    return div;
  }

  function preSetColor() {
    const div = makeElement("div");
    div.setAttribute("class", "col-sm-6 mt-3");
    const box = makeElement("div");
    box.setAttribute("class", "box d-flex justify-content-between");
    box.innerHTML = `
        <label for="background" class="form-label">Pre Set Color</label>
              <div class="swap">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                  <label class="form-check-label" for="flexCheckChecked">
                    Swap Color
                  </label>
                </div>
              </div>
        `;
    div.appendChild(box);
    const listOfColorName = [
      "Default",
      "Red & Black",
      "Black & White",
      "Black & Orange",
      "Violet & Blooming",
      "Blue & Mint",
      "Gray & Lime Punch",
      "Black & Blazing Yellow",
      "Black & Cherry Tomato",
      "Pink & Charcoal",
      "Mango & Terrarium",
      "Cherry & White",
      "Green & Purple",
      "Pink & Navy Blue",
      "Sweet Corn & Toffee",
      "Aspen Gold & Princess Blue",
      "Soybean & Eclipse",
      "Rose Pink & Purple",
      "Mellow Yellow & Verdant Green",
      "Dark Blue & Red",
    ];

    const select = makeElement("select");
    select.setAttribute("class", "form-select");
    select.setAttribute("id", "selectValueColor");
    select.setAttribute("aria-label", "Default select example");

    listOfColorName.forEach((value) => {
      const option = makeElement("option");
      if (!value.includes("&")) {
        option.selected = true;
        option.setAttribute("value", value);
        option.innerText = value;
      }

      let name = value.split("&").map(a=> {return a.trim().split(" ").join("")}).join("")
      option.setAttribute("value", name);
      option.innerText = value;
      select.appendChild(option);
    });

    div.appendChild(select);
    return div;
  }

  function showFeatures() {
    const div = makeElement("div");
    const row = makeElement("div");
    row.setAttribute("class", "row");
    row.appendChild(preSetColor());
    div.setAttribute("class", "hides py-2");

    const listOfElement = [
      {
        label: "Background color of your timer",
        id: "background",
        type: "color",
        help: null,
      },
      {
        label: "First Box Bg Color",
        id: "colorOne",
        type: "color",
        help: null,
      },
      {
        label: "Second Box Bg Color",
        id: "colorTwo",
        type: "color",
        help: null,
      },
      {
        label: "Third Box Bg Color",
        id: "colorThree",
        type: "color",
        help: null,
      },
      {
        label: "Four box Bg Color",
        id: "colorFour",
        type: "color",
        help: null,
      },
      {
        label: "Badge Bg Color",
        id: "badgeBgColor",
        type: "color",
        help: null,
      },
      {
        label: "Text Color",
        id: "textColor",
        type: "color",
        help: null,
      },
      {
        label: "Box Text Color",
        id: "boxTextColor",
        type: "color",
        help: null,
      },
      {
        label: "Number Color",
        id: "numberColor",
        type: "color",
        help: null,
      },
      {
        label: "Past Timer Text",
        id: "pastText",
        type: "text",
        help: "Text showing after timer completion.",
      },
      {
        label: "Pre Timer Text",
        id: "futureText",
        type: "text",
        help: "Text showing until timer completion.",
      },
      {
        label: "File Name",
        id: "fileName",
        type: "text",
        help: "You can change file name.",
      },
    ];

    listOfElement.forEach((value) => {
      let { id, type, label, help } = value;
      row.appendChild(creatingCol(label, id, type, help));
    });
    div.appendChild(row);
    return div;
  }

  function mainContent() {
    const div = makeElement("div");
    div.setAttribute("class", "row mt-3 main");

    const listOfElement = [
      {
        label: "Title",
        id: "title",
        type: "text",
        help: null,
      },
      {
        label: "Date",
        id: "date",
        type: "date",
        help: null,
      },
      {
        label: "Time",
        id: "time",
        type: "time",
        help: null,
      },
      {
        label: "Description",
        id: "descriptionHead",
        type: "text",
        help: null,
      },
    ];
    listOfElement.forEach((value) => {
      let { id, type, label, help } = value;
      div.appendChild(creatingCol(label, id, type, help));
    });

    div.appendChild(showAdvance());
    div.appendChild(showPreview());
    div.appendChild(showFeatures());

    return div;
  }

  function makePushBtn() {
    const div = makeElement("div");
    div.setAttribute("class", "mt-3");
    div.innerHTML = `<button type="button" id="pushBtn" class="btn btn-primary">Push</button>`;
    return div;
  }

  function makeAlertElement() {
    const div = makeElement("div");
    div.setAttribute("id", "alertMe");
    return div;
  }
})();
