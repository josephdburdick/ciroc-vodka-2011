$(document).ready(function(){


	
});


$(window).load(function(){
	//FOR THE FULLSCREEN BACKGROUND IMAGE
	var theWindow        = $(window),
	    $bg              = $("#bg"),
	    aspectRatio      = $bg.width() / $bg.height(),
	    $footer			 = $('footer'),
	    $winHeight		 = $(window).height(),
	    $winZone		 = $("#main");
	
	function resizeBg() {
		if ('#supersized'){
        	$('#supersized').height($(window).height()-$('footer').height());
        }
        if($('.center-container')){
      		if($('.center-container').height() > 550){
      			
      			$('#ajax-container').css('overflow','auto')
      		}
      		else {
      			$('#ajax-container').css('overflow','hidden')
      		} 
      	}
        
	if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
		$winZone.height($(window).height()-$('footer').height());
	    $bg
	        .removeClass()
	        .addClass('bgheight');
	} else {
		$winZone.height($(window).height()-$('footer').height());

	    $bg
	        .removeClass()
	        .addClass('bgwidth');
		}

	}
	    theWindow.resize(function() {
	    	resizeBg();
			//$winZone.height($(window).height()-140);
          	if ('#supersized'){
          		$('#supersized').height($(window).height()-$('footer').height());
          	}
          	 if ($('.center-container')){
      			if ($('.center-container').height() > 550){
      				$('#ajax-container').css('overflow','auto')
      			}
      			else {
      				$('#ajax-container').css('overflow','hidden')
      			} 
      		}
          	
          
	    }).trigger("resize");
	$bg.animate({opacity:'1'},100);   
});
