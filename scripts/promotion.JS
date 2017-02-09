
	var kioskId = "";
	var kioskName = "";
	var kioskDescription = "";
	var kioskLocation = "";
	var kioskCustomer = "";
	var requestKioskInfo = true;
	var registrationSent = false;
	var registrationReceived = false;
	var userRegistered = false;
	var registrationId = "";
	var registrationError = false;
	var allreadyRegistered = false;
	var errorMessage = "";
	var credentialUsed = "";
	var credentialType = 0;
	var promotionloginType = "";
	var promotionPrintingEnabled = false;	
	var intLoginTraces = 0;
	var loggedInBacOnline = false;	
	var previousCredential = "";
	
	var timesLoggedIn = 0;
	
		
	function getPromotionPrintingEnabled(){
		return promotionPrintingEnabled;	
	}
	
	function setPromotionPrintingEnabled(str){
		promotionPrintingEnabled = str;
	}
		
	function setKioskDescription(str){
		kioskDescription = str;
	}
	
	function getKioskDescription(){
		return kioskDescription;	
	}
	
	function setKioskName(str){
		kioskName = str;
	}

	function getKioskName(){
		return kioskName;	
	}
	
	function setKioskLocation(str){
		kioskLocation = str;
	}

	function getKioskLocation(){
		return kioskLocation;	
	}
	
	function setKioskCustomer(str){
		kioskCustomer = str;
	}

	function getKioskCustomer(){
		return kioskCustomer;	
	}
	
	function setRequestKioskInfo(str){
		requestKioskInfo = str;	
	}
	
	function getRequestKioskInfo(){
		return requestKioskInfo;
	}
	
	function setRegistrationReceived(str){
		registrationReceived = str;
	}
	
	function getRegistrationReceived(){
		return registrationReceived;
	}
	
	function setUserRegistered(str){
		if (str){
			promotionPrintingEnabled = true;
		}
		userRegistered = str;
	}

	function getUserRegistered(){
	
		return userRegistered;
	}
	
	function setRegistrationId(str){
		registrationId = str;	
	}
	
	function getRegistrationId(){
		return registrationId;	
	}
	
	function setRegistrationError(str){		
		registrationError = str;		
		if (str){
			window.external.Document.Log("Custom Script","ERROR","0","PROMOTION_ERROR",errorMessage,credentialUsed,"L:"+promotionloginType);
		}		
	}
	
	function getRegistrationError(){
		return registrationError;
	}
	
	function setErrorMessage(str){
		errorMessage = str;
	}

	function getErrorMessage(){
		return errorMessage;
	}
	
	function setAllreadyRegistered(str){
		allreadyRegistered = str;
	}
	
	function getAllreadyRegistered(){
		return allreadyRegistered;
	}
	
	function setCredentialUsed(str){
		credentialUsed = str;	
	}
	
	function getCredentialUsed(){
		return credentialUsed;	
	}
	
	function setCredentialType(str){
		credentialType = str;	
	}	

	function getCredentialType(){
		return credentialType;	
	}
	


	function promotionReset(reload) {
	
		registrationSent = false;
		registrationReceived = false;
		userRegistered = false;
		registrationId = "";
		registrationError = false;
		allreadyRegistered = false;
		promotionloginType = "";
		errorMessage = "";		
		credentialType = 0;
		promotionPrintingEnabled = false;	
		intLoginTraces = 0;
		loggedInBacOnline = false;
		previousCredential = "";
	
		if (reload && promotionEnabled) {
			credentialUsed = "";
			window.external.Document.Screens("Attract Loop Start Screen").Children("userRegistration").CurrentBrowser.WebBrowser.Navigate2(baseurl+"kioskUserRegistration.do");
		}	
	}
	
	function detectLiteLoggedIn(oDocument) {
		try{
			var myEL = oDocument.all.tags("select");
			indicios = 0;
			for (var i = 0; i < myEL.length; i++) {			
				var e =  myEL[i];
				nm = e.name.toLowerCase();
				if (nm == "producto" || nm == "accion"){
					indicios++;
				}
			}
			if (indicios == 2) { 
				return true;
			} else { 
				return false;
			}
		
		} catch(e){
			window.external.Document.Log("Custom Script","WARN","0","PROMOTION","TRANSFORMATION_ERROR",e.description,"");
		}
		return false;
	}
	
	
	function getRegistrationBrowser(){
		return window.external.Document.Screens("Attract Loop Start Screen").Children("userRegistration").CurrentBrowser.WebDocument;
	}
	
	
	function userRegistration(){
		if (!registrationSent) {
			
			registrationSent = true;
			
			promotionloginType = "1";
			credentialUsed = "";				
			if (kioskLoginType == "SEC_LOGIN") {				
				promotionloginType = "1";
			} else if (kioskLoginType == "DEBIT_CARD_LOGIN")  {				
				promotionloginType = "2";

			} else if (kioskLoginType == "CREDIT_CARD_LOGIN")  {				
				promotionloginType = "3";				
			}
			credentialUsed = kioskCredential;
			credentialType = 1;				
			if (kioskLoginType == "SEC_LOGIN") {				
				credentialType = 3;					
			} else 
			if (kioskCardUsed.length <= 9)  {				
				credentialType = 1;				
			} else {				
				credentialType = 2;				
			}

			postNewRegistration();
		}	
	}

	// Realiza un post asyncronico de la promocion	
	function postNewRegistration(){
		try{		
			getRegistrationBrowser().kioskRegistrationForm.credential.value 	= credentialUsed;
			getRegistrationBrowser().kioskRegistrationForm.credentialType.value  	= ""+credentialType;
			getRegistrationBrowser().kioskRegistrationForm.loginType.value  	= promotionloginType;				
			getRegistrationBrowser().kioskRegistrationForm.name.value  		= kioskUserName;			
			getRegistrationBrowser().kioskRegistrationForm.bcoClient.value  	= kioskUserBcoClient;
			getRegistrationBrowser().kioskRegistrationForm.comClient.value  	= kioskUserComClient;
			getRegistrationBrowser().kioskRegistrationForm.bcoSource.value		= kioskBcoClientSource;
			getRegistrationBrowser().kioskRegistrationForm.comSource.value		= kioskComClientSource;
			getRegistrationBrowser().kioskRegistrationForm.kioskCountry.value	= kioskCountry;			
			getRegistrationBrowser().kioskRegistrationForm.posted.value  = "true";
			getRegistrationBrowser().kioskRegistrationForm.kioskId.value = document.printer.getKioskId();
			if (getRequestKioskInfo()) { 					
				getRegistrationBrowser().kioskRegistrationForm.requestKioskInfo.value = "true";	
			}else{
				getRegistrationBrowser().kioskRegistrationForm.requestKioskInfo.value = "false";	
				getRegistrationBrowser().kioskRegistrationForm.kioskName.value = kioskName;
				getRegistrationBrowser().kioskRegistrationForm.kioskLocation.value = kioskLocation;
				getRegistrationBrowser().kioskRegistrationForm.kioskDescription.value = kioskDescription;
				getRegistrationBrowser().kioskRegistrationForm.customer.value = kioskCustomer;
			}
			getRegistrationBrowser().kioskRegistrationForm.submit();
		}catch(e){
			window.external.Document.Log("Custom Script","ERROR","0","PROMOTION_ERROR",e.description,"","");
		}
	}

	// Determina si el cliente esta participando al momento de hacer LOGOFF
	function checkTicketPrint(){
		if (registrationReceived){
			registrationReceived = false;
			if (allreadyRegistered){			
				changeScreen("LogOffPromotionNoTicket");				
			} else if (userRegistered){			
				changeScreen("LogOffPromotionTicket");				
			} 	
		} else {
			
			
			goToExit();

		}

	}
	
	// Determina si el cliente esta participando al momento de hacer switch a BACONLINE
	function checkTicketPrintBac(){	
		if (registrationReceived  && timesLoggedIn < 2){		
			registrationReceived = false;
			if (allreadyRegistered){			
				changeScreen("LogOffPromotionNoTicketBac");				
			} else if (userRegistered){			
				changeScreen("LogOffPromotionTicketBac");				
			} 	
		} else {


			goToBacOnline();
		}
	
	}	

	// Captura los valores para la pagina de sucursal lite
	function catchValuesLite(oDocument){		
		credentialUsed = oDocument.forma.producto.value;
		if (oDocument.forma.ingreso.value == "BCO"){
			promotionloginType = "5";			
			if (credentialUsed.length <= 9)  {				
				credentialType = 1;				
			} else {				
				credentialType = 2;				
			}
			
		} else{		
			promotionloginType = "6";			
			credentialType = 2;				
		}
		kioskUserName = "";
		kioskUserBcoClient = "";
		kioskUserComClient = "";		
		kioskBcoClientSource = "";
		kioskComClientSource = "";
	}
	
	
	// Captura los valores para la pagina de sucursal electronica
	function catchValuesNormal(oDocument){	
		credentialUsed = oDocument.login.usuario.value;		
		credentialType = 3;
		promotionloginType = "4";
		kioskUserName = "";
		kioskUserBcoClient = "";	
		kioskUserComClient = "";
		kioskBcoClientSource = "";
		kioskComClientSource = "";
	}	

	//Determina si el cliente esta ingresando
	function promotionStart(oFrame , sURL , Flags , TargetFrameName , PostData , Headers , oResponse) {
		try{
			// form submiting via post ///
			if (!loggedInBacOnline && intLoginTraces == 0 && Headers.indexOf("application/x-www-form-urlencoded") != -1){
				if (sURL.indexOf("/servlet/suclite?pais=") != -1){
					promotionReset(false);
					intLoginTraces = 1;					
					previousCredential = credentialUsed;					
					catchValuesLite(getWebDocument());					
					if (previousCredential == credentialUsed){
						intLoginTraces = 0;
					}
				}else
				if (sURL.indexOf("/sucursal/usuario/accion/login") != -1){
					promotionReset(false);	
					intLoginTraces = 1;					
					previousCredential = credentialUsed;					
					catchValuesNormal(getWebDocument());
					if (previousCredential == credentialUsed){
						intLoginTraces = 0;
					}
				}else{
					intLoginTraces == 0;
				}
			}
		} catch(e){
			window.external.Document.Log("Custom Script","ERROR","0","PROMOTION",e.description,"","");
			intLoginTraces = 0;
		}	
	}
	
	// Determina si el cliente ingreso satisfactoriamente
	function promotionCheck(oFrame,sURL){			
		if (!registrationSent && intLoginTraces == 1){
			registrationSent = true;
			if (sURL.indexOf("/accion/principal") != -1 && sURL.indexOf("/sucursal/usuario/") != -1){
				timesLoggedIn++;
				loggedInBacOnline = true;					
				postNewRegistration();
				
			}else
			if (detectLiteLoggedIn(getWebDocument())){
				timesLoggedIn++;
				loggedInBacOnline = true;
				postNewRegistration();
			}else{
				intLoginTraces = 0; // bad login
				registrationSent = false;
			}
		}		
		
	}
	
	
	
	