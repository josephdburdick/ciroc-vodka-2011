var minYear=1890;


/*****************************************************************************************************
* Description : Loading the CountryAge mapping XML 
*
* Parameters : Path for the xml
*
* Return Value : void
********************************************************************************************************/
function loadXML(xmlFile) 
{ 
	try 
	{
		xmlDoc = new XMLHttpRequest();
		xmlDoc.open("GET", xmlFile, false);
		xmlDoc.send();
		xmlDoc=xmlDoc.responseXML;
		return(xmlDoc);
	}
	catch(e)
	{
		try 
		{
			xmlDoc=document.implementation.createDocument("","",null);
			xmlDoc.async=false;
			xmlDoc.load(xmlFile);  
			return(xmlDoc);
		}
		catch(e) 
		{
			alert("XML cannot be loaded. "+e.message);
			return(e.message);
		}
	}
}





/*****************************************************************************************************
* Description : reading the nodes (MinimumAgeLimit and Country) value from XML and putting in an array
*
* Parameters : String Date
*
* Return Value : void
********************************************************************************************************/
function parseXML(strAge,CountryStr, cookietime){
	var nodesAge = xmlDoc.getElementsByTagName('MinimumAgeLimit');	
	var legalPassingAge = new Array();
	var i = nodesAge.length;	
	var node;	
	do {
		i = i - 1;
		node = nodesAge[i];
		value = getNodeValue(node);
		legalPassingAge[i] = value;
	} while (i);
	
	var nodesCountry = xmlDoc.getElementsByTagName('Country');	
	var country = new Array();
	i = nodesCountry.length;
	var nodesCountrylength=i;
	
	do {
		i = i - 1;
		node = nodesCountry[i];		
		value = getNodeValue(node);		
		country[i] = value;
	} while (i);
	
	var nodesLink = xmlDoc.getElementsByTagName('Link');	
	var link = new Array();
	i = nodesLink.length;
	var nodesLinklength=i;
	
	do {
		i = i - 1;
		node = nodesLink[i];		
		value = getNodeValue(node);		
		link[i] = value;
	} while (i);
	
	return valCountry(nodesCountrylength, strAge, legalPassingAge, country, link, CountryStr, cookietime);
}

/*****************************************************************************************************
* Description : Getting the Permissible Age from XML corresponding to the country selected in JSP
*
* Parameters : Var nodesCountrylength, Var strAge, Var legalPassingAge, Array country
*
* Return Value : boolean
********************************************************************************************************/
function valCountry(nodesCountrylength, strAge, legalPassingAge, country, link, CountryStr, cookietime){	
	var idclient  = CountryStr.selectedIndex;		
	var passingage;
	if(idclient != 0){
		do{
			nodesCountrylength = nodesCountrylength - 1;			
			if(CountryStr == country[nodesCountrylength])
			{
				passingage = legalPassingAge[nodesCountrylength];		
				return validateAgeSuccess(strAge, passingage, link[nodesCountrylength], cookietime);				 
			}				
		} while (nodesCountrylength);
		errorMsg = "Invalid Country" ;
		
	}else{		
		errorMsg = "Please select a country" ;
	}
	
	alert(errorMsg);
}

function getNodeValue(node) {
	return node.firstChild ? node.firstChild.nodeValue : '';
}

/*****************************************************************************************************
* Description : Parsing the string date and checking if all characters are integer.
*
* Parameters : Var s
*
* Return Value : boolean
********************************************************************************************************/
function isInteger(s){
	var i;
	for (i = 0; i < s.length; i++){ 
		// Check that current character is a number or not.
		var c = s.charAt(i);
		if (((c < "0") || (c > "9"))) return false;
	}
	// All characters are numbers.
	return true;
}

/*****************************************************************************************************
* Description : Removing "-" from MM-DD-YYYY
*
* Parameters : Var date(MM-DD-YYYY), Var seperator 
*
* Return Value : Var (MMDDYYYY)
********************************************************************************************************/
function stripCharsInBag(dateStr){
	var i;
	var returnString = "";
//	Search through string's characters one by one.
//	If character is not in bag, append to returnString.
	for (i = 0; i < dateStr.length; i++){ 
		var c = dateStr.charAt(i);		
		returnString += c;
	}
	return returnString;
}

/*****************************************************************************************************
* Description : Check if the year is leap year or not.
*
* Parameters : Var year
*
* Return Value : Var
********************************************************************************************************/
function daysInFebruary (year){
	//February has 29 days in any year evenly divisible by four,
	//EXCEPT for centurial years which are not also divisible by 400.
	return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}

/*****************************************************************************************************
* Description : Returns no of days in a particular month
*
* Parameters : Var n (Here n =12)
*
* Return Value : var
********************************************************************************************************/
function DaysArray(n) {	
	for (var i = 1; i <= n; i++) {
		this[i] = 31;
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30;}
		if (i==2) {this[i] = 29;}
	} 
	return this;
}

/*****************************************************************************************************
* Description : Check if the Date given by the consumer is the valid date
*
* Parameters : Var dateStr
*
* Return Value : boolean
********************************************************************************************************/
function isDate(dateStr, CountryStr, cookietime){	
	var daysInMonth = DaysArray(12);
	var strYear=dateStr.substring(0,4);	
	var strMonth=dateStr.substring(4,6);	
	var strDay=dateStr.substring(6,8);	
	strYr=strYear;
	var errorMsg;
	today=new Date();
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1);
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1);
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1);
	}
	month=parseInt(strMonth);
	day=parseInt(strDay);
	year=parseInt(strYr);

	if (strMonth.length<1 || month<1 || month>12){
		errorMsg = "Invalid Month: Please enter a valid month" ;
		alert(errorMsg);
	return false;
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		errorMsg = "Invalid Date: Please enter a valid day" ;
		alert(errorMsg);
	return false;
	}
	if (strYear.length > 4 || year==0 || year>today.getFullYear()){
		errorMsg = "Invalid Year: Please enter a valid year" ;
		alert(errorMsg);
	return false;
	} else if (year<minYear){
		errorMsg = "Invalid Year: Please enter a valid year greater than " + minYear ;
		alert(errorMsg);
	return false;
	}
	if (isInteger(stripCharsInBag(dateStr))==false){
		errorMsg = "Invalid Date: Please enter a valid date" ;
		alert(errorMsg);
	return false;
	}
	
	
	strAge = CalculateAge(month,day,year);
	
	if(strAge!=null){
		return parseXML(strAge,CountryStr, cookietime);
	}else{
		return false;
	}		
	
	
}

/*****************************************************************************************************
* Description : Calculate age of consumer.
*
* Parameters : Var month, Var day, Var year
*
* Return Value : boolean
********************************************************************************************************/
function CalculateAge(month,day,year)
{
	today=new Date();	
	var age;
	age = today.getFullYear()- year;
	return age;	
}


/*****************************************************************************************************
* Description : Validate if consumer's age is permissible.
*
* Parameters : Var Consumer's age, Var passingage
*
* Return Value : boolean
********************************************************************************************************/

function validateAgeSuccess(age, passingage, link, cookietime)
{	
	today=new Date();
	var todayMonth = today.getMonth()+1;	
	if (passingage != 0 && (age>passingage)||(age == passingage && todayMonth > month) ||(age == passingage && todayMonth == month && today.getDate() > day)){		
		errorMsg = "Age is permissible" ;
		var date = new Date();
		date.setTime(date.getTime() + (60 * 60 * 3000));
		if (cookietime == 0)
		{
		 $.cookie('age','permissible', { expires: date });
		} else {
			$.cookie('age','permissible');
		}
		 LoadURLHash();
		 $('#agegate').css('display','none');
		
		/*
		
		$('#ajax-container').css('overflow','auto').animate({opacity: '0'},500, 'linear', function(){
					$('#ajax-container').height($(window).height()-140);
					$('#main').after('<footer> </footer>');

								
								$('footer').load('pages/footer.html');
								$('footer').height(140);
					$('#ajax-container').load('pages/index.html',
						function(){
							
							
							
							$.address.value("/index");
							$('#ajax-container').animate({opacity:'1'},500,'linear', function(){
								$('#loading_page').fadeOut(200);				
							});
						});
					});*/
		//return(errorMsg);		
	} else {		
		window.location = link;
		//return validateAgeFailure(passingage, link);	//commented out for the redirecting   2012-jan-23
	}
}

/***************************************************************************************************************
* Description : If consumer's age is not permissible then redirect to the website "http://www.centurycouncil.org/
*
* Parameters : Var passingage
*
* Return Value : void
*****************************************************************************************************************/
function validateAgeFailure(passingage, link){
	if(passingage == 0){		
		return ValidateAgeDry(passingage);		
	}else {
	errorMsg = "Age is not permissible" ;
	alert(errorMsg);
	}
}

/*****************************************************************************************************
* Description : Checking If permissible Age is 0
*
* Parameters : Var passingage
*
* Return Value : boolean
********************************************************************************************************/
function ValidateAgeDry(passingage){
	errorMsg = "It is a dry Country" ;
	alert(errorMsg);
}

/*****************************************************************************************************
* Description : Getting date from JSP
*
* Parameters : home
*
* Return Value : boolean
********************************************************************************************************/
/*function ValidateDate(Country,DateofBirth){	
	return isDate(DateofBirth.value, Country.value);
}
*/