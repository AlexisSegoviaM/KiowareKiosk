function showError(str,rsp){
	if (str == "ExpiredCard"){
		safeChangeScreen("ExpiredCard");
		logEvent(getScreenName(),"EXPIRED_CREDIT_CARD");
	} else
	if (str == "LogOff"){
		safeChangeScreen("LogOff");
	} else
	if (str == "badLogin" && rsp == "badSecurityLevel"){
		changeScreen("BadSecurityLevel");
		logEvent(getScreenName(),"BAD_SECURITY_LEVEL");
	} else
	if (str == "badLogin"){
		changeScreen("BadLogin");
		logEvent(getScreenName(),"BAD_LOGIN");
	} else
	if (str == "tooManyTries"){
		changeScreen("TooManyTries");
		logEvent(getScreenName(),"TOO_MANY_TRIES");
	} else
	if (str == "loginError"){
		logEvent(getScreenName(),"LOGIN_ERROR");
		changeScreen("LoginError");
	} else
	if (str == "badLoginSec" && rsp == "inactiveUser"){
		changeScreen("InactiveUser");
		logEvent(getScreenName(),"INACTIVE_USER");
	} else
	if (str == "badLoginSec"){
		changeScreen("BadLoginSec");
		logEvent(getScreenName(),"BAD_LOGIN");
	} else
	if (str == "outOfService"){

		if (lastKioskUrl.indexOf("kioskShowTransfer") != -1) {
			logEvent(getScreenName(),"BCO_TRANSFER_ERROR");
		} else	if (lastKioskUrl.indexOf("OpcionesPago") != -1) {
			logEvent(getScreenName(),"BCO_CARDPAYMENT_ERROR");
		} else {
			logEvent(getScreenName(),"OUT_OF_SERVICE");
		}



		changeScreen("OutOfService");


	} else
	if (str == "tooManyClients"){
		changeScreen("TooManyClients");
		logEvent(getScreenName(),"TOO_MANY_CLIENTS");
	} else
	if (str == "noClients"){
		changeScreen("NoClients");
		logEvent(getScreenName(),"NO_CLIENTS");
	} else
	if (str == "noCreditCards"){
		changeScreen("NoCreditCards");
		logEvent(getScreenName(),"NO_CREDIT_CARDS");
	} else
	if (str == "noAccounts"){
		changeScreen("NoAccounts");
		logEvent(getScreenName(),"NO_ACCOUNTS");
	}else
	if (str == "statementError" && rsp == "006"){ // Estado de cuenta Invalido
		changeScreen("BadLastStatement");
		logEvent(getScreenName(),"STATEMENT_ERROR");
	}else
	if (str == "statementError"){
		changeScreen("OutOfService");
		logEvent(getScreenName(),"OUT_OF_SERVICE");
	}else
	if (str == "cardInvalidStatus"){ // Tarjeta con status invalido
		if (authenticated) {
			changeScreen("OutOfService");
		} else {
			changeScreen("InvalidCard");
		}
		logEvent(getScreenName(),"INVALID_CREDIT_CARD");
	}else
	if (str == "invalidCard"){
			changeScreen("InvalidCard");
			logEvent(getScreenName(),"UNKOWN_CREDIT_CARD");
	}else
	if (str == "unknownCard"){ // Tarjeta desconocida
		if (authenticated) {
			changeScreen("OutOfService");
		} else {
			changeScreen("InvalidCard");
		}
		logEvent(getScreenName(),"UNKOWN_CREDIT_CARD");
	}else
	if (str == "debitCardCreditBalance"){ // Consulta de Credito con tarjeta de credito
		changeScreen("BadComBalance");
		logEvent(getScreenName(),"DEBIT_CARD_CREDIT_BALANCE");
	}else
	if (str == "comBalanceError"){

		if (lastKioskUrl.indexOf("kioskComPago") != -1) {
			logEvent(getScreenName(),"BCO_CARDPAYMENT_ERROR");
		} else {
			logEvent(getScreenName(),"COM_BALANCE_ERROR");
		}

		changeScreen("OutOfService");

	}else
	if (str == "bcoBalanceError"){
		changeScreen("OutOfService");
		logEvent(getScreenName(),"BCO_BALANCE_ERROR");
	}else
	if (str == "bcoStatementError"){
		changeScreen("OutOfService");
		logEvent(getScreenName(),"BCO_STATEMENT_ERROR");
	}else
	if (str == "opcStatementError"){
		changeScreen("OutOfService");
		logEvent(getScreenName(),"BCO_OPCSTATEMENT_ERROR");
	}else
	if (str == "sfiStatementError"){
		changeScreen("OutOfService");
		logEvent(getScreenName(),"BCO_SFISTATEMENT_ERROR");
	}else
	if (str == "comOperationsError"){
		changeScreen("OutOfService");
		logEvent(getScreenName(),"COM_OPERATIONS_ERROR");
	}else
	if (str == "comStatementError"){
		changeScreen("OutOfService");
		logEvent(getScreenName(),"COM_STATEMENT_ERROR");
	}else
	if (str == "bcoTransferError"){
		changeScreen("OutOfService");
		logEvent(getScreenName(),"BCO_TRANSFER_ERROR");
	}else
	if (str == "duplicateTransfer"){
		changeScreen("RepeatedTransfer");
		logEvent(getScreenName(),"REPEATED_TRANSFER");
	}else
	if (str == "bcoCardPaymentError"){
		changeScreen("OutOfService");
		logEvent(getScreenName(),"BCO_CARDPAYMENT_ERROR");
	}else
	if (str == "duplicateCardPayment"){
		changeScreen("RepeatedPayment");
		logEvent(getScreenName(),"REPEATED_PAYMENT");
	}else
	if (str == "noTransferAccounts"){
		changeScreen("NoTransferAccounts");
		logEvent(getScreenName(),"NO_TRANSFER_ACCOUNTS");
	}else
	if (str == "noProducts"){
		changeScreen("NoProducts");
		logEvent(getScreenName(),"NO_PRODUCTS");
	}else
	if (str == "noClientData"){
		changeScreen("LoginError");
		logEvent(getScreenName(),"NO_DATA_FOR_CLIENT");
	}else
	if (str == "notAvailable"){
		changeScreen("NotAvailable");
		logEvent(getScreenName(),"SERVER_ERROR");
	}else
	if (str == "transferAmountWarning"){
		changeScreen("OutOfService");
		logEvent(str,"TRANSFER_AMOUNT_WARNING");
	}else
	if (str == "bcoPasswordChangeError"){
		changeScreen("OutOfService");
		logEvent(str,"BCO_PASSCHANGE_ERROR");
	}else
	if (str == "comPasswordChangeError"){
		changeScreen("OutOfService");
		logEvent(str,"COM_PASSCHANGE_ERROR");
	}



}



function logEvent(msg,msg2){
	try{
		window.external.Document.Log("Custom Script","INFO",msg,msg2,kioskCredential,kioskLoginType,kioskCountry);
	}
	catch(e){
		//alert(e.description);
	}
}
