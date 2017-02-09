
// rollover //

function buttonsubmit_onMouseDown(){
	document.all.buttonsubmit.src = "../img/ingresarbuttonsmall_pressed.jpg";
	return true;
}
function buttonsubmit_onMouseUp(){
	document.all.buttonsubmit.src = "../img/ingresarbuttonsmall_normal.jpg";
	return true;
}
	
function buttonExit_onMouseDown(){
	document.all.buttonExit.src = "../img/salirbuttonsmall_pressed.jpg";
}
function buttonExit_onMouseUp(proceed){
	document.all.buttonExit.src = "../img/salirbuttonsmall_normal.jpg";
	if (proceed){
		window.location.href = "login.html";
	}
}


function clearMe(inputUsed){
	if (submitUsed){
		inputUsed.value = "";
		submitUsed = false;
	}
}

function containsUpperCase(string)
{
	num="0123456789";

	for(i=0; i<= string.length;i++)
	{
		temp1=string.charAt(i);
		temp2=string.charAt(i);
		temp2=temp2.toUpperCase();

		if(num.indexOf(temp1,0) == -1){
			if(temp1 == temp2)
			{
				return true;
			}
		}
	}

	return false;
}

function isUpperCase(string_)
{
	a = string_;
	b = string_.toUpperCase();
	return (b == a);
}

function numericFilter(string)
{
	num="0123456789";
	strResult = "";	
	for(i=0; i<= string.length;i++)
	{
		temp=string.charAt(i);

		if(num.indexOf(temp,0) != -1)
		{
			strResult = strResult + temp;
		}
	}
	return strResult;
}




function isValidNumber(string)
{
	var num="0123456789"

	for(var i=0; i<= string.length;i++){
		temp=string.charAt(i)

		if(num.indexOf(temp) < 0){
			 return false;
		}
	}
	return true;
}

function ltrim ( s )
{
	return s.replace( /^\s*/, "" )
}

function rtrim ( s )
{
	return s.replace( /\s*$/, "" );
}

function trim ( s )
{
	return rtrim(ltrim(s));
}

function validateTextField(x)
{
	x = trim(x);
	if (x == '')
	{
		return false;
	}
	else return true;
}




function setError(err){
	document.all.error.innerHTML = "<font size=\"5\" face=\"TheSans BAC, Verdana, Arial, sans-serif\" color=\"#006600\"><strong>"+err+"</strong></font>"
}

function checkInput(field){
	field.value = numericFilter(field.value);
}

