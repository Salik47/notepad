let inputTitle = document.querySelector(".inputTitle");
let noteInput = document.querySelector(".noteInput");
let contentBox = document.querySelector(".contentBox");
let addButton = document.querySelector(".addButton");
let saveButton = document.querySelector(".saveButton");
let tabGroup = document.querySelector(".tabGroup");
let maxId = 0;

notesObject = {};

addButton.addEventListener("click", function () {
	if (inputTitle.value === "") {
		alert("Please Enter a title..");
		return;
	}

	let tab = document.createElement("section");
	let text = document.createElement("p");
	text.innerText = inputTitle.value;
	tab.appendChild(text);
	tab.className = "tab";
	tabGroup.append(tab);

	let id = maxId++;
	let title = inputTitle.value;
	let singleNote = { title, content: "" };
	notesObject[id] = singleNote;
	console.log(notesObject);

	const save = document.createElement("button");
	let saveIcon = document.createElement("img");
	saveIcon.src = "https://img.icons8.com/material-outlined/24/000000/save.png";
	save.appendChild(saveIcon);
	save.style.display = "none";
	save.id = id;
	save.className = "save";
	tab.appendChild(save);

	tab.addEventListener("click", function (event) {
		let allTabs = document.querySelectorAll(".tab");
		allTabs.forEach((tab) => {
			tab.style.backgroundColor = "white";
		});

		let allSaveButtons = document.querySelectorAll(".tab .save");
		allSaveButtons.forEach((save) => {
			save.style.display = "none";
		});

		var saveB = document.getElementById(id);
		console.log(saveB);

		tab.style.backgroundColor = "blue";
		console.log(notesObject[id], 3443);
		noteInput.value = notesObject[id].content;
		saveB.style.display = "block";
	});

	save.addEventListener("click", function () {
		let content = noteInput.value;
		singleNote.content = content;
		notesObject[id] = singleNote;

		console.log(id);
		save.style.display = "none";

		console.log(notesObject);
	});

	inputTitle.value = "";
});
