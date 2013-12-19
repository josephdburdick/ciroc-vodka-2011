

$(document).ready(function(){
	//Sniff for browsers
	if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
	 var ffversion=new Number(RegExp.$1) // capture x.x portion and store as a number
	 if (ffversion>=7)
	  $('html').addClass('ff');
	}
});
