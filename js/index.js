let inputTitle = document.querySelector(".inputTitle");
let noteInput = document.querySelector(".noteInput");
let addButton = document.querySelector(".addButton");
const copyToClipboardButton = document.querySelector("#cpy-btn");
const boldBtn = document.querySelector("#bold-btn");
const italicBtn = document.getElementById("italic-btn");
let tabGroup = document.querySelector(".tabGroup");
let maxId = 0;

notesObject = {};

inputTitle.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addNote();
  }
});

if (!tabGroup.hasChildNodes()) {
  tabGroup.style.display = "none";
  noteInput.setAttribute("disabled", "true");
}

addButton.addEventListener("click", function () {
  addNote();
  if (tabGroup.hasChildNodes()) {
    tabGroup.style.display = "flex";

    noteInput.removeAttribute("disabled");
    noteInput.setAttribute("placeholder", "Start writing here...");
    noteInput.classList.remove("startNote");
    copyToClipboardButton.addEventListener("click", () => {
      let selectedText = window.getSelection();
      if (selectedText.type === "Range") {
        navigator.clipboard.writeText(selectedText.toString()); //! Search for it later
        selectedText.type = "Caret";
      } else {
        noteInput.select();
        noteInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(noteInput.value); //! Search for it later
      }
    });

    /*
    boldBtn.addEventListener("click", () => {
      document.execCommand("bold");
    });

    italicBtn.addEventListener("click", () => {
      document.execCommand("italic");
    });
    boldBtn.addEventListener("click", () => {
      console.log("clicked bold button");
      const boldElem = document.createElement("strong");
      let selectedText = window.getSelection();
      let selectedTextRange = selectedText.getRangeAt(0);
      selectedTextRange.surroundContents(boldElem);
    });

    italicBtn.addEventListener("click", () => {
      const italicElem = document.createElement("em");
      let selectedText = window.getSelection();
      let selectedTextRange = selectedText.getRangeAt(0);
      selectedTextRange.surroundContents(italicElem);
    });
    */
  }
});

function addNote() {
  if (inputTitle.value === "") {
    alert("invalid input");
    return;
  }

  let id = maxId++;
  let title = inputTitle.value;
  let singleNote = { title, content: "" };
  notesObject[id] = singleNote;

  let tab = document.createElement("section");
  let text = document.createElement("p");
  text.innerText = inputTitle.value;
  text.style.display = "inline-block";
  tab.appendChild(text);
  tab.className = "tab";
  tabGroup.append(tab);

  const save = document.createElement("button");
  let saveIcon = document.createElement("img");
  saveIcon.src = "https://img.icons8.com/ios-glyphs/24/ffffff/save--v1.png";
  save.appendChild(saveIcon);
  save.style.display = "none";
  save.id = id;
  save.className = "save";
  tab.appendChild(save);

  tab.addEventListener("click", function (event) {
    unhiglightTabs(document.querySelectorAll(".tab"));

    let allSaveButtons = document.querySelectorAll(".tab .save");

    hideAll(allSaveButtons);
    highlightTab(tab, id);

    noteInput.addEventListener("input", function () {
      if (noteInput.value !== notesObject[id].content) {
        hideAll(allSaveButtons);
        showSaveButton(save);
      } else {
        hide(save);
      }
    });
  });

  save.addEventListener("click", function () {
    let content = noteInput.value;
    singleNote.content = content;
    notesObject[id] = singleNote;
    hide(save);
  });

  tab.click();
  inputTitle.value = "";
}

function hideAll(list) {
  list.forEach((element) => {
    element.style.display = "none";
  });
}

function hide(element) {
  element.style.display = "none";
}

function displaySaveButton(save) {}

function highlightTab(tab, id) {
  tab.style.backgroundColor = "#a069e2";
  tab.style.color = "white";
  tab.style.fontWeight = "bold";
  noteInput.value = notesObject[id].content;
}

function unhiglightTabs(allTabs) {
  console.log(878);
  allTabs.forEach((tab) => {
    tab.style.backgroundColor = "#ffdbff";
    tab.style.color = "black";
  });
}

function showSaveButton(save) {
  save.style.display = "inline-block";
  save.style.float = "left";
  save.style.margin = "10px";
  // save.style.width = 'fit-content';
}
