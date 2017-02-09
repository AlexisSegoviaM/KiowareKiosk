  var _kwRev= 0;
var _kwDotNetNS= "KioWareDotNet.KioWareDotNet";

KioWare =
{
	GetProperty: function(n)
	{
		return window.external.getKioProperty(n);
	},

	GetRev: function()
	{
		if(_kwRev)
			return _kwRev;
		try
		{
			_kwRev= this.GetProperty("SVNRev");
		}
		catch(err){}
		return _kwRev;
	},

	Is: function()
	{
		return (this.GetRev() > 0);
	},

	IsKioWare: function()
	{
		return this.Is();
	},
	//Remember to set up a scripting access list
	Execute: function(path)
	{
		window.external.Execute(path);
	},

	Print: function()
	{
		window.external.print();
	},

	LogOff: function()
	{
		window.external.logoff();
	},

	CloseAllPopups: function()
	{
		window.external.CloseAllPopups();
	},

	ShowKeyboard: function()
	{
		window.external.StartVirtualKeyboard();
	},

	LogSessionBegin: function()
	{
		window.external.SetSessionBegin();
	},

	LogPageStat: function(pageTitle, url)
	{
		window.external.WriteLogEntry(pageTitle, url);
	},

	LogSessionEnd: function()
	{
		window.external.WriteEndSessionRecord();
	},

	LogInfo: function(msg)
	{
		window.external.KioEventLog(0, msg);
	},

	LogWarn: function(msg)
	{
		window.external.KioEventLog(1, msg);
	},

	LogErr: function(msg)
	{
		window.external.KioEventLog(2, msg);
	},

	DialNumber: function(name, number, showDialPad)
	{
		window.external.KioDialNumber(name, number, showDialPad);
	},

	RecordVideo: function(seconds, filename)
	{
		window.external.KioCaptureVideo(0, filename, seconds);
	},

	TakePicture: function(filename)
	{
		window.external.KioCaptureVideo(0, filename, 0);
	},

	ScanImage: function(filename)
	{
		window.external.KioReadScan(0, filename);
	},

	GetDeviceStatus: function(deviceName)
	{
		var st;
		try {st= window.external.KioDeviceStatus(deviceName);}
		catch(ex) {st= 0xFFFF;}
		return st;
	},

	//nMonitorAfterFirst is optional (0 by default) and is used to add to the number of the first monitor to access other monitors
	SetSecondMonitorURL: function(url, nMonitorAfterFirst)
	{
		if(nMonitorAfterFirst==null) nMonitorAfterFirst= 0;
		window.external.Browser(2+nMonitorAfterFirst).parentWindow.location= url;
	},
	
	SetSecondMonitorURLTime: function(secondsToShow, nMonitorAfterFirst)
	{
		if(nMonitorAfterFirst==null) nMonitorAfterFirst= 0;
		window.external.Browser(2+nMonitorAfterFirst).parentWindow.external.SecondaryTimer(secondsToShow);
	},

	ShowMessage: function(msg)
	{
		window.external.KioCallObject(_kwDotNetNS, "MessageBox", msg);
	},

	IsUserPresent: function()
	{
		try
		{
			return window.external.KioCallObject(_kwDotNetNS, "get_UserPresent");
		}
		catch(ex){}
		return 0;
	},

	SetUserPresent: function(v)
	{
		window.external.KioCallObject(_kwDotNetNS, "set_UserPresent", (v ? true : false));
	},

	TLS_IsManual: function()
	{
		return window.external.KioCallObject(_kwDotNetNS, "TLSession.IsManualMode");
	},

	TLS_StartTimer: function(seconds)
	{
		return window.external.KioCallObject(_kwDotNetNS, "TLSession.StartTimer", seconds);
	},

	TLS_StopTimer: function()
	{
		window.external.KioCallObject(_kwDotNetNS, "TLSession.StopTimer");
	},

	TLS_GetTimeLeft: function()
	{
		return window.external.KioCallObject(_kwDotNetNS, "TLSession.GetCurrentSecondsRemaining");
	},

	IsLicenseValid: function()
	{
		return window.external.KioCallObject(_kwDotNetNS, "ValidateLicenseCode");
	},

	GetNewLicense: function(transNum, authCode, model, licType, expYear, expMonth, expDay, performRestart)
	{
		return window.external.KioCallObject(_kwDotNetNS, 'GetNewKWLicense', transNum, authCode, model, licType, expYear, expMonth, expDay, performRestart);
	},

	ShowFindDialog: function()
	{
		window.external.FindDialog();
	},

	ExitKioWare: function()
	{
		window.external.KioExit();
	},
	
	IsUrlBlocked: function(url)
	{
		return window.external.KioIsUrlBlocked(url);
	},
	
	GetSpeakerVolume: function()
	{
		return window.external.KioGetSpeakerVolume();
	},
	
	SetSpeakerVolume: function(percent)
	{
		window.external.KioSetSpeakerVolume(percent);
	},
	
	GetMicVolume: function()
	{
		return window.external.KioGetMicVolume();
	},
	
	SetMicVolume: function(percent)
	{
		window.external.KioSetMicVolume(percent);
	}
}
                    