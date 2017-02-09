	
	var currentUrl = "";
	var webPrintFatal = false;
	var currentPrintingWindow;
	var currentDocumentString = "";
	var documentNowPrinting = false;

	function getExchangeRemoval(oDocument) {
		try{
			oInputs2 = oDocument.all.tags("SELECT");

			for (i = 0; i < oInputs2.length; i++) {
				oInputs2(i).style.width = "0";
				oInputs2(i).style.height = "0";
			}

			oInputs2 = oDocument.all.tags("td");

			for (i = 0; i < oInputs2.length; i++) {
				if (oInputs2(i).innerHTML.indexOf("<B>TIPO DE CAMBIO</B>") != -1) {
					oInputs2(i).innerHTML = "";
					break;
				}
			}
		
		} catch(e){
			window.external.Document.Log("Custom Script","WARN","0","PRINTER_WEB","TRANSFORMATION_ERROR","","");
		}
	}

	
	function getPrintableVersion(oDocument,mod) {
		try{

			changeFont("FONT",oDocument);
			changeFont("font",oDocument);
			changeIMG("IMG", oDocument);
			changeIMG("img", oDocument);		
		
			changeTABLE("tr", oDocument, mod);
			changeTABLE("TR", oDocument, mod);
			changeTABLE("td", oDocument, mod);
			changeTABLE("TD", oDocument, mod);
			changeTABLE("TH", oDocument, mod);
			changeTABLE("th", oDocument, mod);
			changeTABLE("TABLE", oDocument, mod);
			changeTABLE("table", oDocument, mod);			
			
			changeBFS("SELECT", oDocument);
			changeBFS("select", oDocument);
			changeBFS("textarea", oDocument);
			changeBFS("TEXTAREA", oDocument);
			changeBFS("INPUT", oDocument);
			changeBFS("input", oDocument);
			changeBFS("INPUT", oDocument);
			changeBFS("input", oDocument);
			changeBFS("P", oDocument);
			changeBFS("p", oDocument);
			changeBFS("a", oDocument);
			changeBFS("A", oDocument);
			changeBFS("SPAN", oDocument);
			changeBFS("span", oDocument);
			changeApplet("applet",oDocument);
			changeApplet("APPLET",oDocument);

		} catch(e){
			window.external.Document.Log("Custom Script","WARN","0","PRINTER_WEB","TRANSFORMATION_ERROR","","");
		}

	}
	
	function removeTagContent(tagname, documento){
		oInputs2 = documento.all.tags(tagname);
		for (var i = 0; i < oInputs2.length; i++) {
			oInputs2(i).innerHTML = "";
		}	
	}	
	
	function changeFont(tagname, documento){
		oInputs2 = documento.all.tags(tagname);
		for (var i = 0; i < oInputs2.length; i++) {		
			oInputs2(i).size = "1";
			oInputs2(i).color = "#000000";
			oInputs2(i).style.color = "#000000";
			oInputs2(i).style.fontSize = "7";
			oInputs2(i).style.fontFamily = "Arial";
			oInputs2(i).style.fontWeight = "bold";
		}	
	}
	

	function changeBFS(tagname, documento) {

		oInputs2 = documento.all.tags(tagname);
		for (var i = 0; i < oInputs2.length; i++) {
			oInputs2(i).style.color = "#000000";
			oInputs2(i).style.backgroundColor = "#FFFFFF";
			oInputs2(i).style.fontSize = "7";
			oInputs2(i).style.fontFamily = "Arial";
			oInputs2(i).style.borderColor = "#FFFFFF";
			oInputs2(i).style.fontWeight = "bold";

		}
	}
	
	function changeApplet(tagname, documento) {
		oInputs2 = documento.all.tags(tagname);
		for (var i = 0; i < oInputs2.length; i++) {
			oInputs2(i).style.width = 0;
			oInputs2(i).style.height = 0;
			oInputs2(i).style.visibility = "hidden";
		}
	}
	
	function changeIMG(tagname, documento) {
		oInputs2 = documento.all.tags(tagname);
		for (var i = 0; i < oInputs2.length; i++) {
			oInputs2(i).src = "";
			oInputs2(i).width = 0;
			oInputs2(i).height = 0;
		}
	}

	function changeTABLE(tagname, documento, mod) {
		oInputs2 = documento.all.tags(tagname);
		for (var i = 0; i < oInputs2.length; i++) {

			oInputs2(i).border = 0;
			oInputs2(i).style.border = 0;
			
			if (mod == 1) {
				oInputs2(i).width = "380"; // consolidada
			}else if (mod == 2) {
				oInputs2(i).width = "100"; // pantallas de modulo bursatil
			}else if (mod == 3) {
				oInputs2(i).width = "40"; // Transacciones pendientes e inversiones
			} else {
				oInputs2(i).width = "";
			}
			
			if (tagname == "table" || tagname == "TABLE") {
				oInputs2(i).cellspacing = 0;
				oInputs2(i).cellpadding = 0;
				if (mod != 2) {
					oInputs2(i).width = "100%";	
				} 
			}
			oInputs2(i).style.color = "#000000";
			//oInputs2(i).height = "";
			//oInputs2(i).background = "";
			oInputs2(i).bgcolor = "#FFFFFF";
			oInputs2(i).style.backgroundColor = "#FFFFFF";
			oInputs2(i).style.fontSize = "7";
			oInputs2(i).style.fontFamily = "Arial";
			oInputs2(i).style.fontWeight = "bold";
			//oInputs2(i).style.textAlign = "right";
		}
	}
	
	
	function getEbacContents (documento) {
	
		tags = documento.all.tags("table");
		
		result = "";
		
		for (var i = 0; i < tags.length; i++) {

			if (tags(i).id == "mainContentTable"){	
			
				result = "<table width=\"0%\" height=\"0%\" cellpadding=\"0\" cellspacing=\"0\"  id=\"mainContentTable\">";
			
				result += tags(i).innerHTML;
				
				result += "</table>";
			}
			
		}
		
		return result;
	}
	
	
	var marginsSet =  false;
	

	function printPage(oDocument) {
		
		try {
			
			var url = oDocument.URL;

			var mod = 0;

			if (url.indexOf("consolidatedquery") != -1) {			
				mod = 1;				
			} else
			if (url.indexOf("showPendingTransactionList") != -1) {			
				mod = 3;				
			} else
			if (url.indexOf("showInvestmentList") != -1) {			
				mod = 3;				
			} else
			if (url.indexOf("misucursal") != -1) {
				mod = 2;
			}

			var strdoc = "";

			if (url.indexOf("/ebac/module/") != -1){

				strdoc = getEbacContents(oDocument);

			} else {

				strdoc = (oDocument.all.tags("HTML"))[0].innerHTML;

			}

			if ( strdoc.indexOf("OBJECT") != -1
				|| strdoc.indexOf("object") != -1){
				
				documentNowPrinting = false;
				currentDocumentString = "";
				alert('No es posible imprimir esta página');
				window.external.Document.Log("Custom Script","WARN","0","PRINTER_WEB_ERROR","UNABLE_TO_PRINT_OBJECTS","","");
				return;				
			}

			date = new Date();

			var newWindow = window.open(baseLocation + "screens/template.html", date.getTime(), "screenX=1800,screenY=1800,toolbar=no,scrollbars=no,resizable");

			currentPrintingWindow = newWindow;		

			currentDocumentString = strdoc;		

			setTimeout("continuePrinting("+mod+")",500);
		
		} catch (e) {		

			currentDocumentString = "";	
			currentUrl = "";			
			showBACPrintNotAvailable();			
			window.external.Document.Log("Custom Script", "ERROR", "0", "PRINTER_WEB_ERROR", "exception printPage()", "BACONLINE", kioskCountry);
		
		}			
			
	

	}
	
	
	function continuePrinting(mod) {

		try {

			if (marginsSet == false) {

				marginsSet = true;
				document.printerOcx.HtmlHeader = "";
				document.printerOcx.HtmlFooter = "";				
				document.printerOcx.MargemSuperior = 1;
				document.printerOcx.MargemInferior = 1;
				document.printerOcx.MargemEsquerda = 15;
				document.printerOcx.MargemDireita = 25;
				document.printerOcx.MargemHeader = 1;
			}
			

			

			try {				

				(currentPrintingWindow.document.all.tags("body"))[0].innerHTML = currentDocumentString;

				currentDocumentString = "";

			} catch(e) {

				//alert(e.description);

				window.external.Document.Log("Custom Script", "ERROR", "_", "PRINTER_WEB_ERROR", "error while creating printing document", "_", kioskCountry);

			}


			try {

				getPrintableVersion(currentPrintingWindow.document,mod);

			} catch(e) {

				window.external.Document.Log("Custom Script", "ERROR", "_", "PRINTER_WEB_ERROR", "error while creating printable version", "_", kioskCountry);

			}				


			// IMPRESION DEL DOCUMENTO

			var x = 99;

			x = document.printerOcx.PrintDoc(currentPrintingWindow.document, false, false);

			currentPrintingWindow.document.close();

			currentPrintingWindow.close();

			currentPrintingWindow = null;

			reasonFailure = getWebPrintErrorMessage(x);

			if (x == 0) {

				window.external.Document.Log("Custom Script", "INFO", "0", "PRINTER_WEB", reasonFailure, "_", kioskCountry);

				showNowPrintingDialog();


			} else {	

				currentUrl = "";					

				showBACPrintNotAvailable();

				window.external.Document.Log("Custom Script", "ERROR", reasonFailure, "PRINTER_WEB_ERROR", reasonFailure, "ERROR_CODE_" + x, kioskCountry);

			}


		} catch (e) {		

			webPrintFatal = true; //jvargasr: Cambio para evitar problemas en javascript por errores fatales
			currentDocumentString = "";	
			currentUrl = "";			
			showBACPrintNotAvailable();			
			window.external.Document.Log("Custom Script", "ERROR", "0", "PRINTER_WEB_ERROR", "exception continuePrinting()", "BACONLINE", kioskCountry);
		
		}
		
		


	}
	
	
	function showNowPrintingDialog() {	
		if (getScreenName() == "BACOnline") {		
			setTimeout("hideNowPrintingDialog()",3000);
			document.reader.showDialog('PRINDIALOG');
		}		
	}
	
	function hideNowPrintingDialog(){
	
		documentNowPrinting = false;
		currentDocumentString = "";		
		document.reader.hideDialog('PRINDIALOG');
	}
	
	
	function showBACPrintNotAvailable(){	
		if (getScreenName() == "BACOnline") {
			setTimeout("hideBACPrintNotAvailable()",3000);
			document.reader.showDialog('BOLDIALOG');
		}	
	}


	function hideBACPrintNotAvailable(){
	
		documentNowPrinting = false;
		currentDocumentString = "";		
		document.reader.hideDialog('BOLDIALOG');
	
	}
	
	
	function printBacOnLine() {
	
		try {
			
			if (!webPrintFatal) { //jvargasr: Cambio para evitar problemas en javascript por errores fatales			
				
				oDocument = getWebDocument();				
				url = oDocument.URL;
				
				if ( currentUrl != url && !documentNowPrinting) {
				
					//window.external.Document.Log("Custom Script","IMPRIMIENDO NUEVO DOCUMENTO","0","IMPRIMIENDO NUEVO DOCUMENTO","IMPRIMIENDO NUEVO DOCUMENTO","IMPRIMIENDO NUEVO DOCUMENTO","IMPRIMIENDO NUEVO DOCUMENTO");
				
					currentUrl = url;
				
					if (hasPaper()){
					
						documentNowPrinting = true;
					
						printPage(oDocument);	
						
					} else {
					
						showBACPrintNotAvailable();
						
					}
				
				}	

			} else {
			
				window.external.Document.Log("Custom Script", "ERROR", "Error impresion BacOnline", "PRINTER_WEB_ERROR", "fatal printBacOnLine()" , "BACONLINE", kioskCountry);

				showBACPrintNotAvailable();

			}
			
		} catch(e){
		
			window.external.Document.Log("Custom Script", "ERROR", "Error impresion BacOnline", "PRINTER_WEB_ERROR", "exception printBacOnLine()" , "BACONLINE", kioskCountry);
			
			showBACPrintNotAvailable();
		}
	
	}
	
	
	
	function getWebPrintErrorMessage(x){
	
		reasonFailure = ""
	
		switch (x) {
	
			case 0 :
				{
					reasonFailure = "Impresion OK";
					break;
				}
			case 1 :
				{
					reasonFailure = "TimeOut Spooler";
					break;
				}
			case 2 :
				{
					reasonFailure = "TimeOut Navegacion de Browser";
					break;
				}
			case 3 :
				{
					reasonFailure = "Error al ejecutar comandos de la impresora";
					break;
				}
			case 4 :
				{
					reasonFailure = "Error al verificar el documento html";
					break;
				}
			case 5 :
				{
					reasonFailure = "No se ha encontrado pagina";
					break;
				}
			case 6 :
				{
					reasonFailure = "Error al cargar web browser";
					break;
				}
			case 7 :
				{
					reasonFailure = "Erro ao ajustar event sink no IWebBrowser2";
					break;
				}
			case 8 :
				{
					reasonFailure = "Erro no hook de dialog";
					break;
				}
			case 9 :
				{
					reasonFailure = "Erro na chamada de impressao do web browser";
					break;
				}
			case 10 :
				{
					reasonFailure = "Erro ao acessar o registry";
					break;
				}
			case 11 :
				{
					reasonFailure = "Erro caso a versao do Internet Explorer for menor que a 5.5sp1";
					break;
				}
			case 12 :
				{
					reasonFailure = "Erro caso o componente nao consiga alterar o tipo de papel da impressora";
					break;
				}
			default :
				{
					reasonFailure = "Unknown failure reason";
					break;
				}
		}
					
					
		return reasonFailure;
	}
