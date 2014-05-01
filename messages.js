var language = "en-US";
var messages = {
	"en-US" : [
	    {"key" : "apptitle", "value" : "my conferences"},
	    {"key" : "addentry", "value" : "ADD ENTRY"},
	    {"key" : "editentry", "value" : "EDIT ENTRY"},
	    {"key" : "entrydescription", "value" : "Description"},
	    {"key" : "entrynumber", "value" : "Number"},
	    {"key" : "entrypin", "value" : "Pin"},
	    {"key" : "savelabel", "value" : "save"},
	    {"key" : "backlabel", "value" : "back"},
	    {"key" : "addlabel", "value" : "add conference"},
	    {"key" : "copylabel", "value" : "toggle copy"},
	    {"key" : "editlabel", "value" : "toggle edit"},
	    {"key" : "deletelabel", "value" : "toggle delete"},
	    {"key" : "number", "value" : "number"},
	    {"key" : "pin", "value" : "pin"},
	    {"key" : "errormessage", "value" : "You must enter a description and a number to save the entry."},
	    {"key" : "okbutton", "value" : "ok"}
	],	
	"en-GB" : [
	    {"key" : "apptitle", "value" : "my conferences"},
	    {"key" : "addentry", "value" : "ADD ENTRY"},
	    {"key" : "editentry", "value" : "EDIT ENTRY"},
	    {"key" : "entrydescription", "value" : "Description"},
	    {"key" : "entrynumber", "value" : "Number"},
	    {"key" : "entrypin", "value" : "Pin"},
	    {"key" : "savelabel", "value" : "save"},
	    {"key" : "backlabel", "value" : "back"},
	    {"key" : "addlabel", "value" : "add conference"},
	    {"key" : "copylabel", "value" : "toggle copy"},
	    {"key" : "editlabel", "value" : "toggle edit"},
	    {"key" : "deletelabel", "value" : "toggle delete"},
	    {"key" : "number", "value" : "number"},
	    {"key" : "pin", "value" : "pin"},
	    {"key" : "errormessage", "value" : "You must enter a description and a number to save the entry."},
	    {"key" : "okbutton", "value" : "ok"}
	],
	"fi-FI" : [
   	    {"key" : "apptitle", "value" : "minun palaverit"},
   	    {"key" : "addentry", "value" : "LIS&Auml;&Auml; PALAVERI"},
   	    {"key" : "editentry", "value" : "MUOKKAA PALAVERIA"},
   	    {"key" : "entrydescription", "value" : "Kuvaus"},
   	    {"key" : "entrynumber", "value" : "Numero"},
   	    {"key" : "entrypin", "value" : "Pin-koodi"},
   	    {"key" : "savelabel", "value" : "tallenna"},
   	    {"key" : "backlabel", "value" : "takaisin"},
   	    {"key" : "addlabel", "value" : "lis&auml;&auml; palaveri"},
	    {"key" : "copylabel", "value" : "vaihda kopiointi"},
   	    {"key" : "editlabel", "value" : "vaihda muokkaus"},
   	    {"key" : "deletelabel", "value" : "vaihda poisto"},
   	    {"key" : "number", "value" : "numero"},
   	    {"key" : "pin", "value" : "pin-koodi"},
   	    {"key" : "errormessage", "value" : "Sinun on sy&ouml;tett&auml;v&auml; kuvaus ja numero tallentaaksesi palaverin."},
   	    {"key" : "okbutton", "value" : "ok"}
	],
	"sv-SE" : [
  	    {"key" : "apptitle", "value" : "mina m&ouml;ten"},
  	    {"key" : "addentry", "value" : "L&Auml;GG TILL"},
  	    {"key" : "editentry", "value" : "REDIGERA"},
  	    {"key" : "entrydescription", "value" : "Beskrivning"},
  	    {"key" : "entrynumber", "value" : "Nummer"},
  	    {"key" : "entrypin", "value" : "Pinkod"},
  	    {"key" : "savelabel", "value" : "spara"},
  	    {"key" : "backlabel", "value" : "tillbaka"},
  	    {"key" : "addlabel", "value" : "l&auml;gg till m&ouml;te"},
  	    {"key" : "copylabel", "value" : "kopieringsl&auml;ge"},
  	    {"key" : "editlabel", "value" : "&auml;ndringsl&auml;ge"},
  	    {"key" : "deletelabel", "value" : "raderingsl&auml;ge"},
  	    {"key" : "number", "value" : "nummer"},
  	    {"key" : "pin", "value" : "pinkod"},
  	    {"key" : "errormessage", "value" : "Du b&ouml;r mata en beskrivning och ett nummer f&ouml;r att kunna spara."},
  	    {"key" : "okbutton", "value" : "ok"}
  	]
};

function getMessage(key) {
	var message = "?" + key + "?";
	if(messages[language] == undefined) {
            language = "en-US";
        }
	for(i = 0;i < messages[language].length;i++) {
		if(messages[language][i].key == key) {
			message = messages[language][i].value;
			break;
		}
	}
	return message;
}

function localize(language) {
	if(messages[language] != undefined) {
		for(i = 0;i < messages[language].length;i++) {
			var element = document.getElementById(messages[language][i].key);
			if(element != null && element != undefined) {
				element.innerHTML = messages[language][i].value;
			}
		}
	}
}
