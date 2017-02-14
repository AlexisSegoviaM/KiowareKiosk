document.write("<script type='text/javascript' src='../scripts/common.js'></script>");
document.write("<script type='text/javascript' src='../scripts/cardreader.js'></script>");
document.write("<script>");
	// Variables de configuracion de la interface
	var kioskCountry;
	var baseurl;
	var sucurl;
	var baseLocation;
	var debug;
	var promotionEnabled; // verificar su uso

	function Initialize() {

	    kioskCountry = "CR";
	    baseurl = "https://#.kioskos.redbac.com/kiosk/";
	    sucurl = "https://www.sucursalmovil.com/secm/index.go";
	    debug = false;
	    promotionEnabled = false;
	    baseLocation = "";
	    sessionStorage.clear();
	    try {
            /*
	        Pendiente Información en JSON para el puerto: 
            'P03'= Puerto 03 de la impresora -- <param name="comPort" value="COM3">
            */
	        // La configuracion fundamental del kiosco se obtiene del nombre de la interface

	        // Nombre de la interface
	        strFileNamePath = window.external.Document.FullName;

	        // Pais del kiosco
	        kioskCountry = strFileNamePath.substring(strFileNamePath.lastIndexOf('\\')+1);
	        kioskCountry = kioskCountry.substring(kioskCountry,kioskCountry.indexOf('_'));
	        kioskCountry = kioskCountry.toUpperCase();

	        // Almacena el pais del kiosco en sessionStorage
	        sessionStorage.setItem('kioskCountry', kioskCountry);

	        // Url de datos del kiosco
	        urlCountry = strFileNamePath.substring(strFileNamePath.lastIndexOf('\\')+1);
	        urlCountry = urlCountry.substring(urlCountry.indexOf('_')+1);
	        urlCountry = urlCountry.substring(0,urlCountry.indexOf('_'));
	        urlCountry = urlCountry.toLowerCase(); // Se extrae el nombre del país.
	        // baseurl = baseurl.substring(0,baseurl.indexOf('#')) + urlCountry + baseurl.substring(baseurl.indexOf('#')+1); 
	        baseurl = "https://reg.kioskos.redbac.com/kiosk/";
	        // Url de sucursal electronica.
	        sucurl = sucurl + kioskCountry;
	        // Url base para los documentos locales
	        loc = window.location.href;
	        baseLocation = loc.substring(0,loc.lastIndexOf('/')+1);
	    } catch (e) {
	        window.external.Document.Log("Custom Script","ERROR","0","INITIALIZATION_ERROR","Error while initializing constants","","");
	    }
	    try {
	        boundLoginListener(); 
	    }
	    catch(e){
	        window.external.Document.Log("Custom Script","ERROR","0","INITIALIZATION_ERROR","Error while binding initial card listener","","");
	    }
	} // Fin Initialize()
document.write("</script>");
// SE RELACIONA CON APPCARDREADER.JS PARA EL APPLET DE LA LECTORA DE LA TARJETA A NIVEL DE FRAGMENTO DE HTML
