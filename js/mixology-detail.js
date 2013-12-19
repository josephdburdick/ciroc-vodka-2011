function arrControl(){
	if ((!$('html').hasClass('oldie')) && ($('span.arr-mixology').length > 0)){
		//$(this).animate({"backgroundColor":"rgba(255,255,255,.0)"},50).find('a').fadeTo(50, 0.85);
		$('span.arr-mixology a').hover(function(){
			$(this).stop().fadeTo(500, 1);
		},function(){
			$(this).stop().fadeTo(500, 0.35);
		});
		
		$("span.arr-mixology a").find("span").hide().end()

			.hover(function() {
			
			$(this).find("span").stop(true, true).fadeIn(200);
			
			}, function() {
			
			$(this).find("span").stop(true, true).fadeOut(200);
			
			});
		}
	

}


$(document).ready(function(){
	arrControl();
	/*if($('p.shareicons').length > 0){
		$('p.shareicons').delay(500).animate({opacity:'1'},500);
	}*/
	
	//$('.urllink').val(location).attr('disabled', true);
	function SelectAll(id)
		{
		    document.getElementById(id).focus();
		    document.getElementById(id).select();
		}
});
