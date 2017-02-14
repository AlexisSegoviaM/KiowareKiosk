
var logKey = "Custom Script";
var focus = false;

//	   Variables de la sesion del usuario //
var transaction = false;
var kioskUserName = "";
var kioskUserBcoClient = "";
var kioskUserComClient = "";
var kioskBcoClientSource = "";
var kioskComClientSource = "";
var kioskLoginType = "";
var justLogged = false;
var inLoginProcess = false;
var bacSessionTimer = 0;
var kioskLegalType = "";
var kioskCredential = "";
var marchamoStatus = "";
var authenticated = false;
var temporaryCredential = "";

function playSound() {
	document.sound.Play();
}

function startBacSessionTimer() {
	var bacSessionTime = new Date();
	bacSessionTimer = bacSessionTime.getTime();
}
function stopBacSessionTimer() {
	var bacSessionTime = new Date();
	return bacSessionTime.getTime() - bacSessionTimer;
}

function setCountry(country) {
	kioskCountry = country;
}
function getCountry() {
	if (kioskCountry != undefined){
	return kioskCountry;		
	}
	else
	{
		// Nombre de la interface
		strFileNamePath = window.external.Document.FullName;
		// Pais del kiosco
		kioskCountry = strFileNamePath.substring(strFileNamePath.lastIndexOf('\\')+1);
		kioskCountry = kioskCountry.substring(kioskCountry,kioskCountry.indexOf('_'));
		kioskCountry = kioskCountry.toUpperCase();
		return kioskCountry;
	}
}
function isLogged() {
	return justLogged;
}
function setName(name) {
	kioskUserName = name;
}
function getUserName() {
	return kioskUserName;
}
function setBcoClient(client) {
	kioskUserBcoClient = client;
}
function setComClient(client) {
	kioskUserComClient = client;
}
function setLoginType(type) {
	kioskLoginType = type;
}
function setSecUser(user) {
	kioskCredential = user;
}
function setCardUsed(card) {
	kioskCredential = card;
}
function getBaseUrl() {
	return baseurl;
}

function setTryingUser(str) {
	tryingUser = str;
}
function getTryingUser() {
	return tryingUser;
}

function setTryingLoginType(str) {
	tryingLoginType = str;
}
function getLoginType() {
	return kioskLoginType;
}

function getKioskCardUsed() {
	return kioskCredential;
}

function setKioskCardUsed(str) {
	kioskCredential = str;
}

function setKioskBcoClientSource(str) {
	kioskBcoClientSource = str;
}

function getKioskBcoClientSource() {
	return kioskBcoClientSource;
}

function setKioskComClientSource(str) {
	kioskComClientSource = str;
}

function getKioskComClientSource() {
	return kioskComClientSource;
}

function setCredential(credential) {
	kioskCredential = credential;
}

function getCredential() {
	return kioskCredential;
}

function setLegalType(legal) {
	kioskLegalType = legal;
}

function getLegalType() {
	return kioskLegalType;
}

function setAuthenticated(auth) {
	authenticated = auth;
}

function getAuthenticated() {
	return authenticated;
}

function setTemporaryCredential(tc) {
	temporaryCredential = tc;
}

function getTemporaryCredential() {
	return temporaryCredential;
}

function setMarchamoStatus(status) {
	marchamoStatus = status;
}

function getMarchamoStatus() {
	return MarchamoStatus;
}

function onLogin() {

	unboundListener();

	justLogged = true;

	goToMenu();

	playSound();

}

function onEnterBacOnline() {
	unboundListener();
	startBacSessionTimer();
}
function onExitBacOnline() {
	boundLoginListener();
	window.external.Document.Log(logKey, "INFO", stopBacSessionTimer(), "BACONLINE_STOP", " ", " ", kioskCountry);
}

function boundWebListener() {
	boundCardReaderListener("KioskPantallaNormal", "KioskPantallaNormal_browser");
}

function boundLoginListener() {
	boundCardReaderListener("SecureLoginPage", "SecureLoginPage_browser");
}

//	   Cambia la pantalla al menu actual

function goToMenu() {

	try {
		if (justLogged) {

			setTemporaryCredential("");

			if (authenticated) {

				if (getScreenName().indexOf("LogOff") == -1 && getScreenName().indexOf("KioskSecureMenu") == -1) {

					result = "KioskSecureMenu";
					
					result = result + ((kioskLoginType == "CREDIT_CARD_LOGIN") ? "COM" : "BCO");

					result = result + ((marchamoStatus == "true") ? "_Marchamo" : "");
					
					if (kioskLoginType == "DEBIT_CARD_LOGIN") {
					    result = result + "_CC";
					}
					

					changeScreen(result);
				}

			} else {

				reLogin();
			}
		}

	} catch (e) {
		//alert(e.description);
	}
}

function quickLogin() {
	try {
		if (getScreenName() != "KioskPantallaNormal") {

			setTemporaryCredential("");

			if (justLogged == false) {

				playSound();

				justLogged = true;
			}

			changeScreen("KioskPantallaNormal");
		}
	} catch (e) {
		//alert(e.description);
	}
}

//	   Metodo para volver a la pagina de inicio
//	   (LECTURA DE TARJETA EN SALDO)

function goToLoginScreen() {

	scrn = "SecureLoginPage";

	if (getScreenName().indexOf(scrn) == -1) {

		changeScreen(scrn);

		loc = window.external.Document.Screens(scrn).Children(scrn + "_browser").CurrentBrowser.WebBrowser.locationURL;

		if (loc.indexOf("screens/login.html") == -1) {

			try {
				window.external.Document.Screens(getScreenName()).Children(getScreenName() + "_browser").CurrentBrowser.WebBrowser.Navigate2(baseLocation + "screens/login.html");
			} catch (e) {
				// alert(e.description);
			}
		}

	}

}

//	   Metodo para solicitar la clave (MENU SIN CLAVE, TARJETA DE DEBITO)

function reLogin() {

	// La credencial debe ser indicada

	setTemporaryCredential(kioskCredential);

	scrn = "SecureLoginPage";

	loc = window.external.Document.Screens(getScreenName()).Children(getScreenName() + "_browser").CurrentBrowser.WebBrowser.locationURL;

	if (loc.indexOf("screens/cardlogin.html") == -1) {

		try {
			window.external.Document.Screens(getScreenName()).Children(getScreenName() + "_browser").CurrentBrowser.WebBrowser.Navigate2(baseLocation + "screens/cardlogin.html");
		} catch (e) {
			// alert(e.description);
		}
	}

	setTimeout("safeChangeScreen(\"" + scrn + "\")", 10);

}

//	   Procedimiento para mostrar la pantalla de logoff.

function goToExit() {

	try {
		scrn = "LogOff";

		if (getScreenName().indexOf(scrn) == -1) {

			try {
				window.external.Document.Screens(getScreenName()).Children(getScreenName() + "_browser").CurrentBrowser.WebBrowser.Navigate2(baseurl + "logout.do");
			} catch (e) {
				// alert(e.description);
			}

			safeChangeScreen(scrn);

			justLogged = false;
		}

	} catch (e) {
		//alert(e.description);
	}

}

// Cambia a la pantalla de BacOnline

function goToBacOnline() {
	try {
		scrn = "BACOnline";

		cleanUp();	

		if (getScreenName().indexOf(scrn) == -1) {

			try {
				window.external.Document.Screens(getScreenName()).Children(getScreenName() + "_browser").CurrentBrowser.WebBrowser.Navigate2(sucurl);
			} catch (e) {
				// alert(e.description);
			}

			safeChangeScreen(scrn);

		}

	} catch (e) {
		//alert(e.description);
	}

}

function safeChangeScreen(scrn) {
	if (getScreenName() != scrn) {
		changeScreen(scrn);
	}
}

function getWebDocument() {

	return window.external.Document.Screens("BACOnline").Children("BACOnline_browser").CurrentBrowser.WebDocument;
}

//	   Revision de navegacion por la pantalla normal

function preCheck(sURL) {
	transaction = true;
}

function check(sURL) {
	transaction = false;
}

//	   Revision de navegacion por BacOnline

function preCheckBacOnline(oFrame, sURL, Flags, TargetFrameName, PostData, Headers, oResponse) {
	if (promotionEnabled) {
		promotionStart(oFrame, sURL, Flags, TargetFrameName, PostData, Headers, oResponse);
	}
}

function checkBacOnline(oFrame, sURL) {
	currentUrl = "";
	if (promotionEnabled) {
		promotionCheck(oFrame, sURL);
	}
}

//	   Revision de navegacion por la pantalla de login

function onTransactionComplete() {
	if (promotionEnabled) {
		userRegistration();
	}
}

function onScreenSwitch(name1, name2) {

	if (name1 == "Attract Loop Start Screen") {
		boundLoginListener();

		// Verifica si la tarjeta esta dentro si aparece el attract loop
		if (isCardInserted()) {
			startWarning();
		}

	}

	if (name1 == "SecureLoginPage") {
		cleanUp(); // Realizar limpieza de Buffers
		boundLoginListener();
		stopWarning();
	}

	// Se deshabilita la tarjeta en la pantalla de despedida
	if (name1.indexOf("LogOff") != -1) {
		unboundListener();

		// Verifica si la tarjeta esta dentro mientras se muestra la pantalla de despedida
		if (isCardInserted()) {
			startWarning();
		}
	}

	// Verifica si la tarjeta esta dentro si aparece la pantalla de timeout mientras el usuario esta logueado
	if (name1 == "Timeout" && justLogged && isCardInserted()) {
		startWarning();
	}

	// Detecta la entrada a la pantalla de BacOnline
	if (name1 == "BACOnline") {
		onEnterBacOnline();
	}

	// Detecta la salida de la pantalla de BacOnline
	if (name2 == "BACOnline") {
		onExitBacOnline();
	}

	// Actualiza el nombre del cliente en todas las pantallas
	if (containsScreen(getUserNameScreens(), name1)) {
		setAllHeaderNames(kioskUserName);
	}

}

function onExitButtonPressed() {

	if (promotionEnabled) {
		checkTicketPrint();
	} else {
		goToExit();
	}
}

function onBacOnlineButtonPress() {
	if (promotionEnabled) {
		checkTicketPrintBac();
	} else {
		goToBacOnline();
	}

}

function getUserNameScreens() {
	return new Array("KioskSecureMenuBCO", "KioskSecureMenuCOM", "KioskSecureMenuBCO_Marchamo", "KioskSecureMenuCOM_Marchamo", "KioskPantallaNormal","KioskSecureMenuBCO_CC","KioskSecureMenuBCO_Marchamo_CC");
}

function containsScreen(array, str) {
	for (i = array.length - 1; i >= 0; i--) {
		if (str == array[i]) {
			return true;
		}
	}
	return false;
}

function setAllHeaderNames(name_) {

	array = getUserNameScreens();
	for (i = array.length - 1; i >= 0; i--) {
		setHeaderName(array[i], name_);
	}

}

function setHeaderName(screenName, name) {
	try {
		window.external.Document.Screens(screenName).Children("userName").CurrentBrowser.WebDocument.parentWindow.setName(name);
	} catch (e) {
		//alert(e.description);
	}
}

// Limpia los valores antes definidos por el usuario
function cleanUp() {

	kioskUserName = "";
	kioskUserBcoClient = "";
	kioskUserComClient = "";
	kioskLoginType = "";
	kioskCredential = "";
	kioskBcoClientSource = "";
	kioskComClientSource = "";
	marchamoStatus = "";
	focus = false;
	justLogged = false;
	authenticated = false;

	// Limpiar el nombre de las pantallas
	setAllHeaderNames("");

	// Promociones en kiosco
	try {
		timesLoggedIn = 0;
		if (promotionEnabled) {
			promotionReset(true);
		}	
	} catch (e) {
		//alert(e.description);
	}
	//////////////////////////////////////////////

}

function changeScreen(screenname) {
	try {
		window.external.Document.CurrentScreen = window.external.Document.Screens(screenname);
	} catch (e) {
		window.external.Document.Log(logKey, "ERROR", "0", "CHANGE_SCREEN_ERROR", "", "", "");
	}
}



function getScreenName() {
	return window.external.Document.CurrentScreen.Name;
}