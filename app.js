function getRequestParam(name) {
    var vars = [], hash;
    var hashes = window.location.href.slice(
        window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars[name];
}

function init() {
  displayContacts(0);
  var state = getRequestParam("state");
  if(state != undefined) {
	  if(state == 1) {
		  displayAddForm("ADD ENTRY");
	  } else if(state == 2) {
		  editContact(getRequestParam("id"));
	  } else if(state == 3) {
		  displayAddForm("ADD ENTRY");
		  var description = getRequestParam("description");
		  var number = getRequestParam("number");
		  var pin = getRequestParam("pin");
		  document.getElementById("description").value = description;
		  document.getElementById("number").value = number;
		  document.getElementById("pin").value = pin;
		  document.getElementById("messageText").innerHTML = "You must enter a description and a number to save the entry.";
		  document.getElementById("message").style.visibility = "visible";
		  document.getElementById("addContactForm").style.visibility = "hidden";
	  } else if(state == 4) {
		  window.history.go(-(window.history.length - 1));
	  }
  }
}

function displayContacts(action) {
	var numberOfContacts = parseInt(localStorage["contacts"]) + 1; 
	var list = document.getElementById("contacts");
	for(var i = 1;i < numberOfContacts;i++) {
		if(localStorage[i + "_description"] != undefined) {
			addEntry(i, action);
		}
	}
	
	if(action == 1) {
		document.getElementById("editContactsImage").src = "res/edit_.png";
		document.getElementById("removeContactsImage").src = "res/empty.png";
	} else if(action == 2) {
		document.getElementById("removeContactsImage").src = "res/empty_.png";
		document.getElementById("editContactsImage").src = "res/edit.png";
	} else {
		document.getElementById("editContactsImage").src = "res/edit.png";
		document.getElementById("removeContactsImage").src = "res/empty.png";
	}
}

function displayAddForm(title) {
	var list = document.getElementById("contacts");
	list.innerHTML = "";
	displayContacts(0);
	document.getElementById("editContactsImage").src = "res/edit.png";
	document.getElementById("removeContactsImage").src = "res/empty.png";
	document.getElementById("addFormTitle").innerHTML = title;
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
}

function getValueOf(id) {
	return document.getElementById(id).value;
}

function removeContact(id) {
	localStorage.removeItem(id + "_description");
	localStorage.removeItem(id + "_number");
	localStorage.removeItem(id + "_pin");
	var list = document.getElementById("contacts");
	list.innerHTML = "";
	displayContacts(2);
}

function editContact(id) {
	var description = localStorage[id + "_description"];
	var number = localStorage[id + "_number"];
	var pin = localStorage[id + "_pin"];
	document.getElementById("description").value = description;
	document.getElementById("number").value = number;
	document.getElementById("pin").value = pin;
	document.getElementById("ID").value = id;
	displayAddForm("EDIT ENTRY");
}

function call(id) {
	var number = localStorage[id + "_number"];
	var pin = localStorage[id + "_pin"];
	if(pin == undefined || pin == null || pin == "") {
		window.location = "tel:" + localStorage[id + "_number"];
	} else {
		window.location = "tel:" + localStorage[id + "_number"]  + "," + localStorage[id + "_pin"]  + "#";
	}
}

function saveContact(id, description, number, pin) {
	if(description == "" || number == "") {
		window.location = "index.html?state=3&description=" + description + "&number=" + number + "&pin=" + pin; 
	} else {
	
		if(id != "") {
			
			localStorage[id + "_description"] = description;
			localStorage[id + "_number"] = number;
			localStorage[id + "_pin"] = pin;	
			var list = document.getElementById("contacts");
			list.innerHTML = "";
			displayContacts(0);
			
		} else {
		
			if(!localStorage["contacts"]) {
				localStorage["contacts"] = 0;
			}
			localStorage["contacts"] = parseInt(localStorage["contacts"]) + 1;
			var index = localStorage["contacts"];
			localStorage[index + "_description"] = description;
			localStorage[index + "_number"] = number;
			localStorage[index + "_pin"] = pin;
			addEntry(index, false);
			
		}
		
		window.location = 'index.html?state=4';
	}
}

function addEntry(id, action) {
	var list = document.getElementById("contacts");
	var entry = document.createElement("li");
	var remove = false;
	var timeout = null;
	
	if(action == 1) {
		entry.onclick = function(event) {
			window.location = "index.html?state=2&id=" + this.id;
		};
		entry.style.backgroundImage = "url(res/edit.png)";	
	} else if(action == 2) {
		entry.onclick = function(event) {
			removeContact(this.id);
		};
		entry.style.backgroundImage = "url(res/empty.png)";	
	} else {
		entry.onclick = function(event) {
			call(this.id);
		};
	}
	
	entry.setAttribute("id", id);
	entry.appendChild(document.createTextNode(localStorage[id + "_description"]));
	list.appendChild(entry);
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

function hideMessage() {
	document.getElementById("message").style.visibility = "hidden";
	document.getElementById("addContactForm").style.visibility = "visible";	
}
