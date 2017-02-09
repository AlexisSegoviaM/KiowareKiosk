
		function showProgress(){

			element = document.getElementById("progressBar");
			flashString = "<object name=\"progreso\" id=\"progreso\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\"544\" height=\"58\">"
			flashString+= "<param name=\"movie\" value=\"../flash/printprogress.swf?totalTime=4\">";
			flashString+= "<param name=\"quality\" value=\"high\">";
			flashString+= "<param name=\"BGCOLOR\" value=\"#DEDEDE\">";
			flashString+= "<param name=\"SCALE\" value=\"exactfit\">";
			flashString+= "</object>";
			element.innerHTML = flashString;
		}

		function hideProgress(){
			element = document.getElementById("progressBar");
			element.innerHTML = "&nbsp;";
		}


		function button1_onMouseDown(){
			document.all.button1.src = "../img/comprobante_pressed.gif";
			printMe();
		}

		function button1_onMouseUp(){
			document.all.button1.src = "../img/comprobante_normal.gif";

		}

		function printMe(){
		
			if (getUtility().getPromotionPrintingEnabled()) {
				window.external.Document.Log("Custom Script","OPTION","0","PROMOTION",getUtility().getCredentialUsed(),getUtility().getRegistrationId(),"");
				getUtility().setPromotionPrintingEnabled(false);
				showProgress();
			} else {
				return;
			}

			receiptReset();
			receiptAddLine('BAC San José','BOLD_CENTER');
			receiptAddLine(getDateTime(),'BOLD_CENTER');
			receiptAddLine(' ','NORMAL');

			var nam = getUtility().getUserName();

			if (nam.length > 0){
				receiptAddLine('Nombre o Razón Social: |'+nam,'NAME_VALUE');
			}

			switch(getUtility().getCredentialType()){
				case 1: {
					receiptAddLine('Número de Cuenta: |'+getUtility().getCredentialUsed(),'NAME_VALUE');
					break;
				}
				case 2: {
					receiptAddLine('Número de Tarjeta: |'+briefCardString(getUtility().getCredentialUsed()),'NAME_VALUE');
					break;
				}
				case 3: {
					receiptAddLine('Usuario: |'+getUtility().getCredentialUsed(),'NAME_VALUE');
					break;
				}
			}
			receiptAddLine('Kiosko: | '+getUtility().getKioskName(),'NAME_VALUE');
			receiptAddLine('Ubicación: | '+getUtility().getKioskLocation(),'NAME_VALUE');
			receiptAddLine('Número asignado para esta promoción | '+getUtility().getRegistrationId(),'NAME_VALUE');
			receiptAddLine(' ','NORMAL');
			receiptAddLine('¡Felicidades!','NORMAL_CENTER');
			receiptAddLine(' ','NORMAL');
			receiptAddLine('Usted ha sido registrado en nuestra promoción','NORMAL_CENTER');
			receiptAddLine(' ','NORMAL');
			receiptAddLine('\"Gane con los kioscos de BAC San José\"','NORMAL_CENTER');
			receiptAddLine(' ','NORMAL');
			receiptAddLine('Cada día que realice una transacción en un kiosco usted queda','NORMAL_CENTER');
			receiptAddLine('participando en el sorteo del 24 de Noviembre del 2004.','NORMAL_CENTER');		  
			receiptAddLine(' ','NORMAL');
			receiptAddLine('Cualquier consulta adicional puede realizarla','NORMAL_CENTER');
			receiptAddLine('al teléfono 295-9797','NORMAL_CENTER');
			receiptAddLine(' ','NORMAL');
			receiptAddLine('aplican Restricciones','BOLD_CENTER');
			receiptAddLine(' ','NORMAL');
			receiptAddLine(' ','NORMAL');
			receiptAddLine(' *** Última Linea ***','BOLD_CENTER');
			receiptAddLine(' ','NORMAL');
			receiptAddLine('.','NORMAL');
			receiptPrint();
		}