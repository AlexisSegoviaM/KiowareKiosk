	
	var listenerSet = false;
	var listenerScreenName = "";
	var listenerBrowser = "";
	var cardStatus = 0;	

	var track1buffer="";
	var track2buffer="";
	var track3buffer="";

	function clearBuffers() {

		track1buffer="";
		track2buffer="";
		track3buffer="";
	
	}
	function isCardInserted() {
		clearBuffers();
		return cardStatus == 1;
	}
	function getReaderUserName(){
		nam = "";
		try{
			if (track1buffer.length > 0){

				nam = track1buffer.substring(track1buffer.indexOf('^')+1);
				nam = nam.substring(0,nam.indexOf('^'));
			}
		} catch(e){
			//alert(e.description);
		}
		return nam;
	}
	function getReaderExpDate(){	
		expdate = "";		
		try{
			if (track2buffer.length > 0) {
				expdate = track2buffer.substring(track2buffer.indexOf('=')+1,track2buffer.indexOf('=')+5);

			}
		} catch(e){
			//alert(e.description);
		}	
		return expdate;
	}
	function getReaderCard(){
		car = "";
		try{
			if (track2buffer.length > 0){
				car = track2buffer.substring(0,track2buffer.indexOf('='));
			}
		} catch(e){
			//alert(e.description);
		}
		return car;
	}
	
	function getListener(){
		return window.external.Document.Screens(listenerScreenName).Children(listenerBrowser).CurrentBrowser.WebDocument.parentWindow;
	}	
	
	function boundCardReaderListener(screenname,browser){	
	
		listenerSet = false;
		listenerScreenName = screenname;
		listenerBrowser = browser;
		listenerSet = true;
		
	}
	
	function unboundListener() {

		listenerSet = false;
		listenerScreenName = "";
		listenerBrowser = "";
		track1buffer="";
		track2buffer="";
		track3buffer="";		
	}
	
	function isValidScreen(){
	
		res = false;	
		try {
			res = window.external.Document.CurrentScreen.Name == listenerScreenName;
		} catch(e){
			//alert(e.description);
		}
		return res;
	}
	
	function changeToValidScreen(){
		try{
			if (listenerSet) {
			
				safeChangeScreen(listenerScreenName);

			}
		} catch(e){
			//alert(e.description);
		}
	}	


	function initializationError(str){
		window.external.Document.Log(logKey,"ERROR","Error de inicializacion de lector","READER_INITIALIZATIONERROR",str,"","");
	}
	
	function cantConnect(str){
		window.external.Document.Log(logKey,"ERROR","No es posible conectarse al lector de tarjeta","READER_CANTCONNECT",str,"","");
	}
	
	
	function onCardReaded(str,trk){
		try{
			
			track2buffer = str;
			
			if (listenerSet){
			
				if (!isValidScreen()){
					changeToValidScreen();
				} 
				
				
				getListener().onCardReaded(str,trk);
				
			}
		} catch(e){
			//alert(e.description);
		}
	}
	
	function onTracksReaded(str1,str2,str3){	
		try{
		 	track1buffer = str1;
			track2buffer = str2;
			track3buffer = str3;

			if (listenerSet){
				if (!isValidScreen()){
					changeToValidScreen();
				}				
				getListener().onTracksReaded(str1,str2,str3);				
			}
			
		} catch(e){
			//alert(e.description);
		}
	}

	function onCardInserted() {
        // Agregar WebStorage para 
		clearBuffers();
		cardStatus = 1;
		try {		
			if (listenerSet){
				if (!isValidScreen()){
					changeToValidScreen();
				} 
				
				getListener().onCardInserted();				
			}
			
		} catch(e){
			//alert(e.description);
		}
	}

	function onCardRemoved(){	
		cardStatus = 0;
		stopWarning();		
		try{
			if (listenerSet){
			
				if (!isValidScreen()){				
					changeToValidScreen();			
				}
				
				getListener().onCardRemoved();	
				
			}
		} catch(e){
			//alert(e.description);
		}
	}

	
	// Modificacion por parametro incorrecto
	function onCardReaderError(str){
		window.external.Document.Log(logKey,"ERROR","Error de lectura de tarjeta","READER_ERROR",str,"","");
	}

	function readerProcessInterrupted(str,str2){
		window.external.Document.Log(logKey,"ERROR","Proceso lectura de tarjeta Interrumpido","READER_PROCESS_INTERRUPTED",str,"CODIGO "+str2,"");
	}
	
	
	function startWarning(){
		try{
			document.reader.showDialog('REMOVECARD');
			document.reader.startSound();
			
		} catch(e){
			//alert(e.description);
		}
	
	}

	function stopWarning(){
		try{
			document.reader.hideDialog('REMOVECARD');
			document.reader.stopSound();
			
		} catch(e){
			//alert(e.description);
		}	
	}
	
	function connect(){}
	function disconnect(){}
	function startReader(){}
	function stopReader(){}
	