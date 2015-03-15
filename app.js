var ACTIVE = "rgb(255,255,255)";
var INACTIVE = "rgb(100, 100, 100)";

function init() {
	language = window.navigator.language ||
	           window.navigator.browserLanguage;
	language = language.toLowerCase();
	localize(language);
	document.addEventListener("deviceready", onDeviceReady, false);
	window.addEventListener("resize", onOrientationChanged, false);
	displayContacts(0);
	onDeviceReady();
}

function onOrientationChanged() {
	if(portrait()) {
		document.getElementById("contacts").innerHTML = "";
		displayContacts(0);
		document.getElementById("mainbuttons").style.visibility = "visible";
		if(document.getElementById("mainbuttons").style.bottom == "0px") {
			document.getElementById("buttontable").style.visibility = "visible";
		}
	} else {
		clearAndHideAddForm();
		document.getElementById("contacts").innerHTML = "";	
		displayContacts(0);	
		document.getElementById("mainbuttons").style.visibility = "hidden";
		document.getElementById("buttontable").style.visibility = "hidden";
	}
}

function onDeviceReady() {
	document.getElementById("loadingoverlay").style.visibility = "hidden";
}

function onBackKeyDown() {
	if(document.getElementById("message").style.visibility == "visible") {
	  hideMessage(); 
  	} else if(document.getElementById("addcontactform").style.visibility == "visible") {
	  clearAndHideAddForm();
  	}
}

function displayContacts(action) {
	var numberOfContacts = parseInt(window.localStorage.getItem("contacts")) + 1; 

	for(var i = 1;i < numberOfContacts;i++) {
		if(window.localStorage.getItem(i + "_description") != undefined) {
			addEntry(i, action);
		}
	}

	sortList(document.getElementById("contacts"));

	var list = document.getElementById("contacts");
	var container = document.createElement("div");
	container.innerHTML = "<p>&nbsp;</p>";
	var entry = document.createElement("li");
	entry.appendChild(container);
	list.appendChild(entry);
	
	if(action == 1) {
		document.getElementById("editcontactsbutton").style.color = ACTIVE;
		document.getElementById("copycontactsbutton").style.color = INACTIVE;
		document.getElementById("deletecontactsbutton").style.color = INACTIVE;
		document.getElementById("editlabel").style.color = ACTIVE;
		document.getElementById("copylabel").style.color = INACTIVE;
		document.getElementById("deletelabel").style.color = INACTIVE;
	} else if(action == 2) {
		document.getElementById("editcontactsbutton").style.color = INACTIVE;
		document.getElementById("copycontactsbutton").style.color = INACTIVE;
		document.getElementById("deletecontactsbutton").style.color = ACTIVE;
		document.getElementById("editlabel").style.color = INACTIVE;
		document.getElementById("copylabel").style.color = INACTIVE;
		document.getElementById("deletelabel").style.color = ACTIVE;
	} else if(action ==3) {
		document.getElementById("editcontactsbutton").style.color = INACTIVE;
		document.getElementById("copycontactsbutton").style.color = ACTIVE;
		document.getElementById("deletecontactsbutton").style.color = INACTIVE;
		document.getElementById("editlabel").style.color = INACTIVE;
		document.getElementById("copylabel").style.color = ACTIVE;
		document.getElementById("deletelabel").style.color = INACTIVE;
	} else {
		document.getElementById("editcontactsbutton").style.color = INACTIVE;
		document.getElementById("copycontactsbutton").style.color = INACTIVE;
		document.getElementById("deletecontactsbutton").style.color = INACTIVE;
		document.getElementById("editlabel").style.color = INACTIVE;
		document.getElementById("copylabel").style.color = INACTIVE;
		document.getElementById("deletelabel").style.color = INACTIVE;
	}
}

function displayAddForm(title) {
	window.removeEventListener("resize", onOrientationChanged);
	document.addEventListener("backbutton", onBackKeyDown, false);
	var list = document.getElementById("contacts");
	list.innerHTML = "";
	displayContacts(0);
	document.getElementById("editcontactsbutton").style.color = INACTIVE;
	document.getElementById("deletecontactsbutton").style.color = INACTIVE;
	document.getElementById("copycontactsbutton").style.color = INACTIVE;
	document.getElementById("editlabel").style.color = INACTIVE;
	document.getElementById("copylabel").style.color = INACTIVE;
	document.getElementById("deletelabel").style.color = INACTIVE;
	document.getElementById("addentry").innerHTML = title;
	document.getElementById("addcontactform").style.visibility = "visible";
    document.getElementById("mainbuttons").style.visibility = "hidden";
    document.getElementById("buttontable").style.visibility = "hidden";
}

function hideAddForm() {
	document.getElementById("addcontactform").style.visibility = "hidden";
	document.getElementById("mainbuttons").style.visibility = "visible";
	document.getElementById("buttontable").style.visibility = "visible";
}

function clearAndHideAddForm() {
	document.getElementById("description").value = "";
	document.getElementById("number").value = "";
	document.getElementById("pin").value = "";
	document.getElementById("ID").value = "";
	document.getElementById("addcontactform").style.visibility = "hidden";
    document.getElementById("mainbuttons").style.visibility = "visible";
    document.getElementById("buttontable").style.visibility = "visible";
    document.getElementById("message").style.visibility = "hidden";
	window.scrollTo(0,0);
    document.removeEventListener("backbutton", onBackKeyDown);
    window.addEventListener("resize", onOrientationChanged, false);
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
	var numberToDial = "";
	if(pin == undefined || pin == null || pin == "") {
		numberToDial = window.localStorage.getItem(id + "_number");
	} else {
		numberToDial = window.localStorage.getItem(id + "_number")  + "," + window.localStorage.getItem(id + "_pin")  + "#";
	}
	
	phonedialer.dial(numberToDial, 
	  function(err) {
		if (err == "empty") { 
			alert("Unknown phone number"); 
		} else { 
			alert("Dialer Error:" + err);
		}
	  },
	  function(success) { }
	);
}

function saveContact(id, description, number, pin) {
	if(description == "" || number == "") {
		document.getElementById("messageText").innerHTML = getMessage("errormessage");
		document.getElementById("message").style.visibility = "visible";
		document.getElementById("messageoverlay").style.visibility = "visible";
		document.getElementById("addcontactform").style.visibility = "hidden";
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
			var list = document.getElementById("contacts");
			list.innerHTML = "";
			displayContacts(0);
		}
		clearAndHideAddForm();
	}
}

function addEntry(id, action) {
	var list = document.getElementById("contacts");
	var entry = document.createElement("li");
	entry.setAttribute("class", "call");
	
	if(action == 1) {
		entry.onclick = function(event) {
			editContact(this.id);
		};
	} else if(action == 2) {
		entry.onclick = function(event) {
			removeContact(this.id);
		};
	} else if(action == 3) {
		entry.onclick = function(event) {
			copyContact(this.id);
		};
		document.getElementById("addentry").innerHTML = getMessage("addentry");
	} else {
		entry.onclick = function(event) {
			call(this.id);
		};
	}
	entry.setAttribute("id", id);
	var number = "";
	var container = document.createElement("div");
	var icon = "pe-7s-call";
	if(action == 1) {
		icon = "pe-7s-note";
	} else if(action == 2) {
		icon = "pe-7s-close";
	} else if(action == 3) {
		icon = "pe-7s-copy-file";
	}
	
	number = getMessage("number") + ": " + window.localStorage.getItem(id + "_number");
	var pin = window.localStorage.getItem(id + "_pin");
	if(pin != undefined && pin != null && pin != "") {
		number = number + ", " + getMessage("pin") + ": " + pin;
	}
	
	container.innerHTML = 
		'<table><tr><td rowspan="2" class="call">' + '<span class="' + 
			icon + ' pe-va"></span></td><td class="description">' + 
			window.localStorage.getItem(id + "_description") + 
			'</td></tr><tr><td class="number">' + 
			number + '</td></tr></table>';
	
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
	document.getElementById("messageoverlay").style.visibility = "hidden";
	document.getElementById("addcontactform").style.visibility = "visible";	
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

function toggleButtons() {
	if(document.getElementById("mainbuttons").style.bottom == "-60px") {
		document.getElementById("mainbuttons").style.bottom = "0px";
		document.getElementById("buttontable").style.visibility = "visible";
	} else {
		document.getElementById('mainbuttons').style.bottom = "-60px";
		document.getElementById("buttontable").style.visibility = "hidden";
		document.getElementById("contacts").innerHTML = "";	
		displayContacts(0);	
	}
}

function sortList(ul){
    var new_ul = ul.cloneNode(false);
    var lis = [];
    for(var i = ul.childNodes.length; i--;){
        if(ul.childNodes[i].nodeName === "LI")
            lis.push(ul.childNodes[i]);
    }
    lis.sort(function(a, b){
        if(a.innerHTML.toUpperCase() > 
           b.innerHTML.toUpperCase()) {
          return 1;
        } else if(a.innerHTML.toUpperCase() < 
        		  b.innerHTML.toUpperCase()) {
          return -1;
        } else {
          return 0;
        }
    });
    for(var i = 0; i < lis.length; i++)
        new_ul.appendChild(lis[i]);
    ul.parentNode.replaceChild(new_ul, ul);
}
