	// Variables de configuracion de la interface

	var kioskCountry;	//Pais del Kiosco
	var baseurl;			//URL base de la aplicacion del kiosco
	var sucurl;				//URL base de la sucursal electrónica
	var baseLocation;
	var debug;
	var promotionEnabled;

	//Obtiene el Id del kisco
	function getKioskId(){
		var kioskId = "";
		try {
		// Obtiene el ID del Kiosco
			kioskId = window.external.KioCallObject(_kwDotNetNS, "AddinRegistryKey", "kioskId");
		}catch(e){
			console.log("getKioskId: There was a problem getting kioskId from Windows Registry.");
		}
		return kioskId;
	}

	//Obtiene el Pais del Kiosco
	function getKioskCountry(){
		var kioskCountry = "";
		try {
		// Obtiene el ID del Kiosco
			kioskCountry = window.external.KioCallObject(_kwDotNetNS, "AddinRegistryKey", "kioskCountry");
		}catch(e){
			console.log("getKioskCountry: There was a problem getting kioskCountry from Windows Registry");
		}
		return kioskCountry;
	}

	//Inializa el entorno del kisco
	function Initialize() {

		kioskCountry = "CR";
		baseurl = "https://reg.kioskos.redbac.com/kiosk/";
		sucurl = "https://www.sucursalelectronica.com/redir/showLogin.go?country=";
		debug = false;
		promotionEnabled = false;
		baseLocation = "";

		try {

			// Obtiene el nombre del Kiosco para configurar el Pais
			kioskCountry = getKioskCountry();

			// Url de sucursal electronica.
			sucurl = sucurl + kioskCountry;

		} catch(e) {
			console.log("Initialize: There was a problem Initializing the utilityFile.js");
		}


	} // Initialize
