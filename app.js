function init() {
	language = window.navigator.language ||
	           window.navigator.browserLanguage;
	localize(language);
	document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener("resize", onOrientationChanged, false);
	displayContacts(0);
}

function onOrientationChanged() {
	if(portrait()) {
		document.getElementById("mainButtons").style.bottom = "0px";
	} else {
		document.getElementById("mainButtons").style.bottom = "-85px";
	}
}

function onDeviceReady() {
	document.getElementById("loadingoverlay").style.visibility = "hidden";
}

function onBackKeyDown() {
	if(document.getElementById("message").style.visibility == "visible") {
	  hideMessage(); 
  	} else if(document.getElementById("addContactForm").style.visibility == "visible") {
	  clearAndHideAddForm();
  	}
}

function displayContacts(action) {
	var numberOfContacts = parseInt(window.localStorage.getItem("contacts")) + 1; 
	var list = document.getElementById("contacts");
	for(var i = 1;i < numberOfContacts;i++) {
		if(window.localStorage.getItem(i + "_description") != undefined) {
			addEntry(i, action);
		}
	}

	if(action == 1) {
		document.getElementById("editContactsImage").src = "res/edit_.png";
		document.getElementById("removeContactsImage").src = "res/empty.png";
		document.getElementById("copyContactsImage").src = "res/copy.png";
	} else if(action == 2) {
		document.getElementById("removeContactsImage").src = "res/empty_.png";
		document.getElementById("editContactsImage").src = "res/edit.png";
		document.getElementById("copyContactsImage").src = "res/copy.png";
	} else if(action ==3) {
		document.getElementById("removeContactsImage").src = "res/empty.png";
		document.getElementById("editContactsImage").src = "res/edit.png";
		document.getElementById("copyContactsImage").src = "res/copy_.png";
	} else {
		document.getElementById("editContactsImage").src = "res/edit.png";
		document.getElementById("removeContactsImage").src = "res/empty.png";
		document.getElementById("copyContactsImage").src = "res/copy.png";
	}
}

function displayAddForm(title) {
	document.addEventListener("backbutton", onBackKeyDown, false);
	var list = document.getElementById("contacts");
	list.innerHTML = "";
	displayContacts(0);
	document.getElementById("editContactsImage").src = "res/edit.png";
	document.getElementById("removeContactsImage").src = "res/empty.png";
	document.getElementById("addentry").innerHTML = title;
	document.getElementById("addContactForm").style.visibility = "visible";
    document.getElementById("mainButtons").style.visibility = "hidden";
}

function hideAddForm() {
	document.getElementById("addContactForm").style.visibility = "hidden";
	document.getElementById("mainButtons").style.visibility = "visible";
}

function clearAndHideAddForm() {
	document.getElementById("description").value = "";
	document.getElementById("number").value = "";
	document.getElementById("pin").value = "";
	document.getElementById("ID").value = "";
	document.getElementById("addContactForm").style.visibility = "hidden";
    document.getElementById("mainButtons").style.visibility = "visible";
    document.getElementById("message").style.visibility = "hidden";
	window.scrollTo(0,0);
    document.removeEventListener("backbutton", onBackKeyDown);
}

function getValueOf(id) {
	return document.getElementById(id).value;
}

function removeContact(id) {
	window.localStorage.removeItem(id + "_description");
	window.localStorage.removeItem(id + "_number");
	window.localStorage.removeItem(id + "_pin");
	var list = document.getElementById("contacts");
	list.innerHTML = "";
	displayContacts(2);
}

function editContact(id) {
	var description = window.localStorage.getItem(id + "_description");
	var number = window.localStorage.getItem(id + "_number");
	var pin = window.localStorage.getItem(id + "_pin");
	document.getElementById("description").value = description;
	document.getElementById("number").value = number;
	document.getElementById("pin").value = pin;
	document.getElementById("ID").value = id;
	displayAddForm(getMessage("editentry"));
}

function copyContact(id) {
	var description = window.localStorage.getItem(id + "_description");
	var number = window.localStorage.getItem(id + "_number");
	var pin = window.localStorage.getItem(id + "_pin");
	document.getElementById("description").value = description;
	document.getElementById("number").value = number;
	document.getElementById("pin").value = pin;
	document.getElementById("ID").value = "";
	displayAddForm(getMessage("addentry"));
}

function call(id) {
	var number = window.localStorage.getItem(id + "_number");
	var pin = window.localStorage.getItem(id + "_pin");
	if(pin == undefined || pin == null || pin == "") {
		window.location = "tel:" + window.localStorage.getItem(id + "_number");
	} else {
		window.location = "tel:" + window.localStorage.getItem(id + "_number")  + "," + window.localStorage.getItem(id + "_pin")  + "#";
	}
}

function saveContact(id, description, number, pin) {
	if(description == "" || number == "") {
		document.getElementById("messageText").innerHTML = getMessage("errormessage");
		document.getElementById("message").style.visibility = "visible";
		document.getElementById("addContactForm").style.visibility = "hidden";
	} else {
		if(id != "") {
			window.localStorage.setItem(id + "_description", description);
			window.localStorage.setItem(id + "_number", number);
			window.localStorage.setItem(id + "_pin", pin);	
			var list = document.getElementById("contacts");
			list.innerHTML = "";
			displayContacts(0);
		} else {
			if(!window.localStorage.getItem("contacts")) {
				window.localStorage.setItem("contacts", 0);
			}
			window.localStorage.setItem("contacts", parseInt(window.localStorage.getItem("contacts")) + 1);
			var index = window.localStorage.getItem("contacts");
			window.localStorage.setItem(index + "_description", description);
			window.localStorage.setItem(index + "_number", number);
			window.localStorage.setItem(index + "_pin", pin);
			addEntry(index, false);
		}
		clearAndHideAddForm();
	}
}

function addEntry(id, action) {
	var list = document.getElementById("contacts");
	var entry = document.createElement("li");
	var remove = false;
	var timeout = null;

	if(action == 1) {
		entry.onclick = function(event) {
			editContact(this.id);
		};
		entry.style.backgroundImage = "url(res/_edit.png)";	
	} else if(action == 2) {
		entry.onclick = function(event) {
			removeContact(this.id);
		};
		entry.style.backgroundImage = "url(res/_empty.png)";	
	} else if(action == 3) {
		entry.onclick = function(event) {
			copyContact(this.id);
		};
		document.getElementById("addentry").innerHTML = getMessage("addentry");
		entry.style.backgroundImage = "url(res/_copy.png)";	
	} else {
		entry.onclick = function(event) {
			call(this.id);
		};
	}
	entry.setAttribute("id", id);
	var number = document.createElement("span");
	var container = document.createElement("div");
	container.innerHTML = window.localStorage.getItem(id + "_description");
	number.innerHTML = "<br />" + getMessage("number") + ": " + window.localStorage.getItem(id + "_number");
	var pin = window.localStorage.getItem(id + "_pin");
	if(pin != undefined && pin != null && pin != "") {
		number.innerHTML = number.innerHTML + ", " + getMessage("pin") + ": " + pin;
	}
	number.className = "number";
	container.appendChild(number);
	entry.appendChild(container);
	list.appendChild(entry);
	window.scrollTo(0,0);
}

function toggleEditOption(toggle) {
	var list = document.getElementById("contacts");
	list.innerHTML = "";
	displayContacts(toggle ? 1 : 0);
}

function toggleDeleteOption(toggle) {
	var list = document.getElementById("contacts");
	list.innerHTML = "";
	displayContacts(toggle ? 2 : 0);
}

function toggleCopyOption(toggle) {
	var list = document.getElementById("contacts");
	list.innerHTML = "";
	displayContacts(toggle ? 3 : 0);	
}

function hideMessage() {
	document.getElementById("message").style.visibility = "hidden";
	document.getElementById("addContactForm").style.visibility = "visible";	
}

function onFieldFocus(id) {
	document.getElementById(id).className = "textbox active";
	var length = document.getElementById(id).value.length;
	document.getElementById(id).setSelectionRange(length, length);
}

function onFieldBlur(id) {
	document.getElementById(id).className = "textbox";
}

function portrait() {
	if(window.innerHeight > window.innerWidth) {
		return true;
	} else {
		return false;
	}
}