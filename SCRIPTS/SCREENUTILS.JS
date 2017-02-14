function getUtility(){
	return window.external.Document.Screens("Attract Loop Start Screen").Children("Generic_Utility").CurrentBrowser.WebDocument.parentWindow;
}

function getUserName(){
	return getUtility().getUserName();
}

function goToMenu(){
	return getUtility().goToMenu();
}

function isLogged(){
	return getUtility().isLogged();
}

function getLogOffDelay(){
	return getUtility().getLogOffDelay();
}

function getScreenName(){
	return window.external.Document.CurrentScreen.Name;
}

function changeScreen(screenname){
	window.external.Document.CurrentScreen = window.external.Document.Screens(screenname);	
}

function getFormAction(){
	
	return getUtility().getBaseUrl()+"login.do";
}

function getCountry(){
	return getUtility().getCountry();
}

function stopReader(){
	getUtility().stopReader();

}

function startReader(){
	getUtility().startReader();
}

function connect(){
	getUtility().connect();
}

function setTryingUser(str){
	getUtility().setTryingUser(str);
}

function setTryingLoginType(str){
	getUtility().setTryingLoginType(str);
}


function writeLog(logintype,user,country){
	window.external.Document.Log("Custom Script","INFO","0","LOGIN_START",user,logintype,country);
}

function isKiosk(){
	
	result = false;
	
	try {
		result = window.external.Application.Name == "Kiosk Pro";
	}catch(e){}
	
	return result;
}

function receiptAddLine(msg,type){
	getUtility().receiptAddLine(msg,type);
}
function receiptAddRow(table,msg){
	getUtility().receiptAddRow(table,msg);
}

function receiptAddColumnDefinition(table,msg){
	getUtility().receiptAddColumnDefinition(table,msg);
}
function receiptReset(){
	getUtility().receiptReset();
}
function receiptPrint(){
	getUtility().receiptPrint();
}

function briefCardString(cardstr) {
	result = "";	
	if (cardstr.length == 0) return "";	
	if (cardstr.length == 16){
		result = "************" + cardstr.substr(12,4);
	}else
	if (cardstr.length == 15){
		result = "**********" + cardstr.substr(10,5);
	}else {
		result = "**********" + cardstr.substr( (cardstr.length - 4) ,4);
	}
	return result;
}

function getDateTime(){
	today = new Date();
	minutos = today.getMinutes();
	horas = today.getHours();	
	ampm = "a.m.";
	if ( horas > 12 ){
		horas = horas - 12;
		ampm = "p.m.";
	}
	if ((horas == 12) && (minutos == 0)){
		ampm = "";
	}	
	if (minutos < 10) {
		minutos = '0'+minutos 
	}
	mes = today.getMonth() + 1;	
	if (mes < 10) {
		mes = "0"+mes; 
	}
	return 'Fecha: '+today.getDate()+'/'+(today.getMonth() + 1)+'/'+today.getFullYear()+'  Hora: '+horas+':'+minutos+' '+ampm;
}