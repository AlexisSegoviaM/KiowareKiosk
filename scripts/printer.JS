//Printer Functions

var printerEvent = "Printer Scripting Error";
var printerEventInfo = "PRINTER_SCRIPT_ERROR";
var printerDocumentId = "";
var scriptConstant = "Custom Script";

var PAPERSTATUS_NORMAL = 0;
var PAPERSTATUS_NEAREND = 1;
var PAPERSTATUS_NOPAPER = 2;
var PAPERSENSOR_ERROR = 3;

var printerWarningAlarmCount = 0;
var printerWarningFirstAlarm = 100;
var printerWarningSecondAlarm = 200;
var printerWarningFurtherAlarms = 100;

function setPrinterDocumentId(str){
	printerDocumentId = str;
}

function getPrinterDocumentId(){
	return printerDocumentId;
}

/**
 * Obtiene el status del papel segun el sensor de impresion.
 */
function getPaperStatus(){

	try{
		return document.printer.getPaperStatus();
	}catch(e){
		window.external.Document.Log(scriptConstant,"INFO",printerEvent,printerEventInfo,"getPaperStatus()","_",kioskCountry);
	}
	return 0;	
}

/**
 * Agrega una nueva linea al recibo
 */
function receiptAddLine(msg,type){
	try{
		document.printer.receiptAddLine(msg,type);
			
	}catch(e){
		window.external.Document.Log(scriptConstant,"INFO",printerEvent,printerEventInfo,"receiptAddLine()","_",kioskCountry);
	}
}

/**
 * Agrega una fila a una tabla del recibo
 */
function receiptAddRow(table,msg){
	try{
		
			document.printer.receiptAddRow(table,msg);
			
	}catch(e){
		window.external.Document.Log(scriptConstant,"INFO",printerEvent,printerEventInfo,"receiptAddRow()","_",kioskCountry);
	}
}


/**
 * Agrega una columna
 */
function receiptAddColumnDefinition(table,msg){
	try{
		
			document.printer.receiptAddColumnDefinition(table,msg);
			
	}catch(e){
		window.external.Document.Log(scriptConstant,"INFO",printerEvent,printerEventInfo,"receiptAddColumnDefinition()","_",kioskCountry);
	}
}

/**
 * Prepara la creacion de un nuevo recibo
 */
function receiptReset(){
	try{
		
		printerDocumentId = "";
		document.printer.resetPrinter();

	}catch(e){
		window.external.Document.Log(scriptConstant,"INFO",printerEvent,printerEventInfo,"receiptReset()","_",kioskCountry);
	}
}

/**
 * Determina si existe papel y almacena alertas en los logs de kioscos
 */
function hasPaper(){

	result = false;

	try {
	
		status = getPaperStatus();

		switch(parseInt(status)){
		
		
			case PAPERSTATUS_NORMAL : {
			
			
				//alert('PAPEL NORMAL');

				printerWarningAlarmCount = 0;

				result = true; // SI HAY PAPEL

				break;
				
			}
		
			case PAPERSTATUS_NEAREND : {
			

				//alert('CERCA DE ACABARSE');

				result = true; // SI HAY PAPEL				

				alertLowPaper();
				
				break;
			
			}
			
			case PAPERSENSOR_ERROR : {			

				//alert('ERROR DE SENSOR');

				window.external.Document.Log(scriptConstant,"INFO"+ printerWarningAlarmCount,"Error en Sensor de Papel","PAPER_SENSOR_ERROR",kioskCredential,kioskLoginType,kioskCountry);	

				//jvargasr: Si existe un trabajo pendiente el sensor falla, pero el trabajo de impresion queda encolado
				result = true; // SI HAY PAPEL
				
				// si existe almenos una alarma de poco papel se realiza la verificacion
				if (printerWarningAlarmCount > 0) {
					alertLowPaper();
				}

				break;
			
			}
			
			case PAPERSTATUS_NOPAPER : {

				//alert('SIN PAPEL');		
			
				// No hay Papel del todo

				window.external.Document.Log(scriptConstant,"INFO"+ printerWarningAlarmCount,"Impresora no tiene papel","PRINTER_NO_PAPER",kioskCredential,kioskLoginType,kioskCountry);	
				
				break;			
			}
			
			default : { 
			
				break;
			}
		
		}
		

	} catch(e) {
		window.external.Document.Log(scriptConstant,"INFO"+ printerWarningAlarmCount,printerEvent,printerEventInfo,"hasPaper()","",kioskCountry);
	}

	return result;

}

/**
 * Determina si debe realizar alertas por baja cantidad de papel en la impresora
 */
function alertLowPaper(){

	printerWarningAlarmCount++;

	switch(printerWarningAlarmCount){


		case printerWarningFirstAlarm : {


			window.external.Document.Log(scriptConstant,"WARN"+ printerWarningAlarmCount,"Poco Papel Primera Alerta","PRINTER_LOW_PAPER",kioskCredential,kioskLoginType,kioskCountry);		
			break;

		}

		case printerWarningSecondAlarm : {

			window.external.Document.Log(scriptConstant,"WARN"+ printerWarningAlarmCount,"Poco Papel Segunda Alerta","PRINTER_LOW_PAPER",kioskCredential,kioskLoginType,kioskCountry);	
			break;

		}

		default : {

			if ((printerWarningAlarmCount > printerWarningSecondAlarm) && 
				((printerWarningAlarmCount % printerWarningFurtherAlarms) == 0)) {				
				window.external.Document.Log(scriptConstant,"ERROR"+ printerWarningAlarmCount,"Kiosco con Poco Papel","PRINTER_LOW_PAPER",kioskCredential,kioskLoginType,kioskCountry);	
			}

			break;


		}
	}
}


/**
 * Imprime un nuevo recibo
 */
function receiptPrint(){
	try{
	
	
		if (hasPaper()){
		
			// Realiza la impresion

			document.printer.printReceipt();

			if (printerDocumentId.length == 0){
				window.external.Document.Log(scriptConstant,"INFO"+ printerWarningAlarmCount,"Impresion de Documento","PRINTER_NEWPRINTJOB",kioskCredential,kioskLoginType,kioskCountry);	
			} else {
				window.external.Document.Log(scriptConstant,"INFO"+ printerWarningAlarmCount,printerDocumentId,printerDocumentId,kioskCredential,kioskLoginType,kioskCountry);	
			}		
		
		} else {
		
			safeChangeScreen("NoPaper");
		
		}
	
	}catch(e){
		window.external.Document.Log(scriptConstant,"INFO"+ printerWarningAlarmCount,printerEvent,printerEventInfo,"receiptPrint()","",kioskCountry);
	}
}


/**
 * Metodo a ejecutar en caso de error de impresion
 */
function onPrinterError(msg,ext){
	window.external.Document.Log(scriptConstant,"INFO"+ printerWarningAlarmCount,printerEvent,printerEventInfo,"onPrinterError()",msg,kioskCountry);
}


/**
 *   Prueba de Impresion
 */
function printTest(){

	try {
	
	receiptReset();

	today = new Date();
	minutos = today.getMinutes();
	if (minutos < 10) {
		minutos = '0'+minutos
	}
	datestr = today.getDate()+'/'+(today.getMonth() + 1)+'/'+today.getFullYear()+'  -  '+today.getHours()+':'+minutos;

	receiptAddLine('Documento de Pruebas','BOLD_CENTER');
	receiptAddLine('Fecha y hora del kiosco | '+datestr,'NAME_VALUE');
	receiptAddLine('------------------------------','BOLD_CENTER');
	receiptAddLine('------------------------------','NORMAL_CENTER');
	receiptAddLine('Imagen:','BOLD_CENTER');
	receiptAddLine('img/baconline_normal.jpg','IMAGE');

	receiptAddLine(' ','BOLD_CENTER');
	receiptAddLine('------------------------------','NORMAL_CENTER');
	
	receiptAddLine(' ','NORMAL');
	
	receiptAddLine('Prueba de Documento:','BOLD_CENTER');
	receiptAddLine('Estado de Cuenta - Mes Anterior' ,'BOLD_CENTER');

	receiptAddLine(' ','NORMAL');
	receiptAddLine('Numero de Cliente: | 1319393','NAME_VALUE');
	receiptAddLine('Nombre o Razón Social: |nombre del cliente','NAME_VALUE');
	receiptAddLine('No. Cuenta: |xxxxxxxx','NAME_VALUE');
	receiptAddLine(' ','NORMAL');
	receiptAddLine('Moneda: | CRC','NAME_VALUE');


	receiptAddLine('Saldo Inicial: | 5xxxxxx','NAME_VALUE');
	receiptAddLine('Balance en Libros: | xxxxxxx','NAME_VALUE');
	receiptAddLine('Fondos Retenidos: | 0xxxxxxx','NAME_VALUE');
	receiptAddLine('Saldo Disponible: | xxxxxxx','NAME_VALUE');
	
	receiptAddLine(' ','NORMAL');
	
	receiptAddColumnDefinition('T1','LEFT|LEFT');
	receiptAddColumnDefinition('T1','RIGHT|RIGHT');
	receiptAddColumnDefinition('T1','LEFT|LEFT');
	receiptAddColumnDefinition('T1','RIGHT|RIGHT');


	receiptAddRow('T1','bold_Fecha|bold_Referencia|bold_Descripción|bold_Monto');
	receiptAddRow('T1','24/10/2003|xxxxxxxxx|TEF DE: 90xxxxxx|xxxxxxxx');
	receiptAddRow('T1','25/10/2003|xxxxxxxxx|INTERESES|4.14');
	receiptAddRow('T1','26/10/2003|xxxxxxxxx|INTERESES|4.14');
	receiptAddRow('T1','27/10/2003|xxxxxxxxx|INTERESES|4.14');
	receiptAddRow('T1','28/10/2003|xxxxxxxxx|INTERESES|4.14');
	receiptAddRow('T1','29/10/2003|xxxxxxxxx|INTERESES|4.14');
	receiptAddRow('T1','30/10/2003|xxxxxxxxx|INTERESES|4.15');
	receiptAddRow('T1','31/10/2003|xxxxxxxxx|INTERESES|4.15');
	receiptAddRow('T1','31/10/2003|xxxxxxxxx|PAGO 53ccccccccccc|4.16');



	receiptAddLine('T1','TABLE');
	
	receiptAddLine(' *** Última Linea ***','BOLD_CENTER');
	
	receiptAddLine(' ','NORMAL');
	
	receiptAddLine('.','NORMAL');

	document.printer.printReceipt();
	
	
	}catch(e){
		//alert(e.description);
	}
}