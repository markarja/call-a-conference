var language = "en-us";
var messages = {
	"en-us" : [
	    {"key" : "apptitle", "value" : "My conferences"},
	    {"key" : "addentry", "value" : "ADD ENTRY"},
	    {"key" : "editentry", "value" : "EDIT ENTRY"},
	    {"key" : "entrydescription", "value" : "Description"},
	    {"key" : "entrynumber", "value" : "Number"},
	    {"key" : "entrypin", "value" : "Pin"},
	    {"key" : "savelabel", "value" : "Save"},
	    {"key" : "backlabel", "value" : "Back"},
	    {"key" : "addlabel", "value" : "Add"},
	    {"key" : "copylabel", "value" : "Copy"},
	    {"key" : "editlabel", "value" : "Edit"},
	    {"key" : "deletelabel", "value" : "Delete"},
	    {"key" : "number", "value" : "number"},
	    {"key" : "pin", "value" : "pin"},
	    {"key" : "errormessage", "value" : "You must enter a description and a number to save the entry."},
	    {"key" : "okbutton", "value" : "OK"}
	],	
	"en-gb" : [
	    {"key" : "apptitle", "value" : "My conferences"},
	    {"key" : "addentry", "value" : "ADD ENTRY"},
	    {"key" : "editentry", "value" : "EDIT ENTRY"},
	    {"key" : "entrydescription", "value" : "Description"},
	    {"key" : "entrynumber", "value" : "Number"},
	    {"key" : "entrypin", "value" : "Pin"},
	    {"key" : "savelabel", "value" : "Save"},
	    {"key" : "backlabel", "value" : "Back"},
	    {"key" : "addlabel", "value" : "Add"},
	    {"key" : "copylabel", "value" : "Copy"},
	    {"key" : "editlabel", "value" : "Edit"},
	    {"key" : "deletelabel", "value" : "Delete"},
	    {"key" : "number", "value" : "number"},
	    {"key" : "pin", "value" : "pin"},
	    {"key" : "errormessage", "value" : "You must enter a description and a number to save the entry."},
	    {"key" : "okbutton", "value" : "OK"}
	],
	"fi-fi" : [
   	    {"key" : "apptitle", "value" : "Omat palaverit"},
   	    {"key" : "addentry", "value" : "LIS&Auml;&Auml; PALAVERI"},
   	    {"key" : "editentry", "value" : "MUOKKAA PALAVERIA"},
   	    {"key" : "entrydescription", "value" : "Kuvaus"},
   	    {"key" : "entrynumber", "value" : "Numero"},
   	    {"key" : "entrypin", "value" : "Pin-koodi"},
   	    {"key" : "savelabel", "value" : "Tallenna"},
   	    {"key" : "backlabel", "value" : "Takaisin"},
   	    {"key" : "addlabel", "value" : "Lis&auml;&auml;"},
	    {"key" : "copylabel", "value" : "Kopioi"},
   	    {"key" : "editlabel", "value" : "Muokkaa"},
   	    {"key" : "deletelabel", "value" : "Poista"},
   	    {"key" : "number", "value" : "numero"},
   	    {"key" : "pin", "value" : "pin"},
   	    {"key" : "errormessage", "value" : "Sinun on sy&ouml;tett&auml;v&auml; kuvaus ja numero tallentaaksesi palaverin."},
   	    {"key" : "okbutton", "value" : "OK"}
	],
	"sv-se" : [
  	    {"key" : "apptitle", "value" : "Mina m&ouml;ten"},
  	    {"key" : "addentry", "value" : "L&Auml;GG TILL"},
  	    {"key" : "editentry", "value" : "REDIGERA"},
  	    {"key" : "entrydescription", "value" : "Beskrivning"},
  	    {"key" : "entrynumber", "value" : "Nummer"},
  	    {"key" : "entrypin", "value" : "Pinkod"},
  	    {"key" : "savelabel", "value" : "Spara"},
  	    {"key" : "backlabel", "value" : "Tillbaka"},
  	    {"key" : "addlabel", "value" : "L&auml;gg till"},
  	    {"key" : "copylabel", "value" : "Kopiera"},
  	    {"key" : "editlabel", "value" : "&Auml;ndra"},
  	    {"key" : "deletelabel", "value" : "Radera"},
  	    {"key" : "number", "value" : "nummer"},
  	    {"key" : "pin", "value" : "pinkod"},
  	    {"key" : "errormessage", "value" : "Du b&ouml;r mata en beskrivning och ett nummer f&ouml;r att kunna spara."},
  	    {"key" : "okbutton", "value" : "OK"}
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
