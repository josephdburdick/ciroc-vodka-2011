function ClickURLHash(o,i){
	var urlHash = o.attr("id");
	$.address.value(urlHash); 
}

function LoadURLHash(){
	var ajaxSplit, ajaxMajor, ajaxMinor, urlHash;
	urlHash = location.hash;
	urlHash = urlHash.replace(/^#!\//,"");

	if ((urlHash == "/") || (urlHash == "") || (urlHash == "index") || (urlHash == "index.html")){
			$('#loading_page').show();
			var _images = ["img/index/bg_AgeGate-noRepeat.png",
			"img/flavors/bg_flavors-noRepeat.png",
			"img/flavors/bg_flavors-noRepeat2.png",
			"img/flavors/bg_flavorslanding-noRepeat.png",
			"img/mixology/detail_ciroc-diddy.png", 
			"img/mixology/detail_ciroc-skinnycosmo.png", 
			"img/mixology/detail_ciroc-blu.png", 
			"img/mixology/detail_ciroc-cocohavana.png", 
			"img/mixology/detail_ciroc-lola.png", 
			"img/mixology/detail_ciroc-hotmama.png", 
			"img/mixology/detail_ciroc-georgia.png", 
			"img/mixology/detail_ciroc-razzledazzle.png", 
			"img/about/img_about-ciroc.png",
			"img/about/img_about-seanjohn.png",
			"img/about/img_about-jsr.png",
			"img/about/img_about-distillation.png",
			"img/flavors/img_flavor-snapfrost.png",
			"img/flavors/img_flavor-redberry.png",
			"img/flavors/img_flavor-coconut.png",
			"img/flavors/img_flavor-peach.png",
			"img/flavors/bg_circleLearnMore-noRepeat.png"
			];
			var gotime = _images.length;
		 	
			$.each(_images,function(e) {
				//console.log(_images);
				$(new Image()).load(function() {
					
					if (--gotime < 1)
					{
					$('#ajax-container').css('overflow','hidden').animate({opacity: '0'},500, 'linear', function(){
					$('#ajax-container').load('pages/index.html',
						function(){
							$('#ajax-container').animate({opacity:'1'},500,'linear', function(){
								$('#loading_page').fadeOut(200);				
							});
						});
					});
					 	
					}
				}).attr('src',this);
			});
			$.address.value("/");
			

} else if (urlHash.search("-") != (-1)){

		$('#loading_page').show();
		ajaxSplit = urlHash.split('-');
		ajaxMajor = ajaxSplit[0];
		ajaxMinor = ajaxSplit[1];
		
		if ((ajaxMajor == 'mixology') && (ajaxMinor != 'flavors')) 
		{
			ajaxMixo = ajaxMinor.split('ciroc');
			mixoCiro = ajaxMixo[0];
			mixoPage = ajaxMixo[1];
		}
		
		
			if ($('div.center-container').hasClass(urlHash))
				{
					//console.log('Data already loaded!');
					$('#ajax-container .section-header a').each(function(){
					   var myHref = $(this).attr('href');
					   if(myHref == ('#!/'+urlHash)) {
					        $(this).animate({color:'#305078'},500).addClass('active');
					        //console.log('Activated the link in the Section Header that matched the URL.');
					   }
					   else
					   {
						   	$(this).animate({color:'#2c2c2c'},500).removeClass('active');
						   	//console.log('Did not activate.');
						}
					});
				}
			else if ($('.section-header').hasClass(ajaxMajor)){
				
				//console.log('Fade out current detail page first.')	
				if (ajaxMajor == 'mixology')
			    {
					$('.center-container').animate({opacity:'0'},200,function(){ //New 12/20/11
					
						$('#ajax-inner').css('overflow','hidden').animate({opacity: '0'},500, 'linear', function(){ //NEW
						$('#ajax-inner').load('pages/'+ urlHash +'.html',
						function(){
							
							if (ajaxMajor == 'mixology' && (ajaxMinor != 'flavors'))
							{
								if (mixoPage == undefined)
								{		
									$('#ajax-inner').height($(window).height()-$('footer').height());
								}	
								else
								{
									$('#ajax-inner').height($('.'+mixoPage).height());
									//alert('----');
								}
							}
						}).animate({opacity:'1'},500,'linear'); //NEW
							if (urlHash == 'mixology-flavors')
								$('#ajax-inner').height($('.flavor-container').height());
							 
							$('#ajax-inner').waitForImages(function(){ 
   
								$.address.value("/"+urlHash); //KEEP HERE
								
								$('.center-container').animate({opacity:'1'},500, 'linear',
								function(){
									//If there is a link in the section header that matches urlHash then activate
									if ($('#ajax-container > div.section-header').length > 0){
										//console.log('#!/'+urlHash +' has a Section Header. Moving along...');
										$('#ajax-container .section-header a').each(function(){
											var myHref = $(this).attr('href');
											if(myHref == ('#!/'+urlHash)) {
												$(this).animate({color:'#305078'},500).addClass('active');
												//console.log('Activated the link in the Section Header that matched the URL.');
											}
											else{
												if((urlHash.search('about-ciroc') == 0) && (myHref != ('#!/about-ciroc')))
													$(this).animate({color:'#2c2c2c'},500).removeClass('active');
												if((urlHash.search('mixology-ciroc') == (-1)) && (urlHash.search('about-ciroc') == (-1)) && (urlHash.search('about-grapes') == (-1)) && (urlHash.search('about-distillation') == (-1)))
													$(this).animate({color:'#2c2c2c'},500).removeClass('active');
											}
										});
									}			
									$('#loading_page').fadeOut(200);
									 if ($('.urllink').length > 0){
										$('.urllink').val(location); //.attr('disabled', true); // CHANGED 1/26/12
									 }
									
									if (ajaxMajor == 'mixology' && (ajaxMinor != 'flavors'))
									{
										if (mixoPage == undefined)
										{		
											$('#ajax-inner').height($(window).height()-$('footer').height());
										}	
										else
										{
											$('#ajax-inner').height(660); //NEW: was 735 - 12/12/11
											//alert('m'+mixoPage);
										}
									}  
								});
							});
						});
					});
				
			    }
				else // within ajax-major = flavors
				{
					$('.center-container').animate({opacity:'0'},500,function(){
						$('#ajax-inner').animate({opacity: '0'},500, 'linear', function(){ //NEW changed to ZERO
							$('#ajax-container').css('overflow','auto').load('pages/'+ ajaxMajor +'.html',
								function(){
									$('#ajax-container').animate({opacity:'1'},500,'linear', function(){
										$('#ajax-inner').css('opacity','0').load('pages/'+ urlHash +'.html', //Added Opacity 0
											function(){
												
												$('#ajax-inner').waitForImages(function(){  
													$.address.value("/"+urlHash);
													
												if (urlHash == 'mixology-flavors')
													$('#ajax-inner').height($('.flavor-container').height());	
												if (ajaxMajor == 'mixology')
													$('#ajax-inner').height($('.'+mixoPage).height());
												
												if (ajaxMajor == 'flavors')
													$('#ajax-inner').height($('.flavor-'+ajaxMinor).height());
												
													//console.log('URL changed.')
													//$('#ajax-inner').animate({opacity:'1'},500, 'linear',function(){
														//If there is a link in the section header that matches urlHash then activate
														if ($('#ajax-container > div.section-header').length > 0){
															//console.log('#!/'+urlHash +' has a Section Header. Moving along...')
															$('#ajax-container .section-header a').each(function(){
															   
															   var myHref = $(this).attr('href');
															   //console.log(myHref);
															   if(myHref == ('#!/'+urlHash)) {
											        				$(this).animate({color:'#305078'},500).addClass('active');
															        //console.log('Activated the link in the Section Header that matched the URL.');
															   }
															   else{
															   	$(this).animate({color:'#2c2c2c'},500).removeClass('active');
												   				//console.log('Did not activate.');
															   }
											
															});// eo Each Function
														}// eo If Statement			
														$('#loading_page').fadeOut(200);
														$('#ajax-inner').animate({opacity:'1'},500);
														 if ($('.urllink').length > 0){
															$('.urllink').val(location); //.attr('disabled', true); // CHANGED 1/26/12
														 }
													//});// eo ajax-inner opacity 1
												});// eo ajax-inner load
											});// eo ajax-container opacity 1				
									});// eo ajax-container load
								});// eo ajax-inner animate 0
						});//eo center-container opacity 0
					});
				}
			}
			else {
			
				//console.log('Loading data from '+ajaxMajor+'.html ...');	
				
				//$('#ajax-container').animate({opacity: '0'},500, 'linear', function(){
				$('#ajax-container').css('overflow','hidden').animate({opacity: '0'},500, 'linear', function(){
				$('#ajax-container').load('pages/'+ ajaxMajor +'.html',
					function(){
						
						
						if (ajaxMajor == 'mixology' && (ajaxMinor != 'flavors'))
							{
								if (mixoPage == undefined)
							{		
								$('#ajax-inner').height($(window).height()-$('footer').height());
							}	
							else
							{
								$('#ajax-inner').height(735);
							}
						}
						
						$('#ajax-container').animate({opacity:'1'},500,'linear', function(){
							$('#ajax-inner').css({opacity:'0'}).load('pages/'+ urlHash +'.html', //NEW added opacity to 0
								function(){
								
									if (urlHash == 'mixology-flavors')
										$('#ajax-inner').height($('.flavor-container').height());	
	
									
									if (ajaxMajor == 'flavors')
										$('#ajax-inner').height($('.flavor-'+ajaxMinor).height());
									
									
									if (ajaxMajor == 'mixology' && (ajaxMinor != 'flavors')){
										if (mixoPage == undefined)
										{		
											$('#ajax-inner').height($(window).height()-$('footer').height());
										} else {
											$('#ajax-inner').height($('.'+mixoPage).height());
										}
									}

									//$('#ajax-inner').css('opacity','0'); NEW
									$('#ajax-inner').waitForImages(function(){  
										$.address.value("/"+urlHash);
										//console.log('URL changed.')
										 if ($('.urllink').length > 0){
											$('.urllink').val(location); //.attr('disabled', true); // CHANGED 1/26/12
										 }
											//If there is a link in the section header that matches urlHash then activate
											if ($('#ajax-container > div.section-header').length > 0){
												//console.log('#!/'+urlHash +' has a Section Header. Moving along...')
												$('#ajax-container .section-header a').each(function(){
												   
												   var myHref = $(this).attr('href');
												   //console.log(myHref);
												   if(myHref == ('#!/'+urlHash)) {
								        				$(this).animate({color:'#305078'},500).addClass('active');
												        //console.log('Activated the link in the Section Header that matched the URL.');
												   }
											
												});//eo EACH function
											}//eo If Statement			
											$('#loading_page').fadeOut(200);
									}).animate({opacity:'1'},500); //eo waitForImages
								});			
						});//.css({overflow: 'visible'});//,height:$('#ajax-inner').height()}); //NEW 12/12/11
					});
				});
			}
			
	} else {	
		//Going to Press or Where to Buy page
		$('#ajax-container').css('overflow','hidden').animate({opacity: '0'},500, 'linear', function(){
				$('#ajax-container').load('pages/'+ urlHash +'.html',
					function(){
						$('#ajax-container').animate({opacity:'1'},500,'linear', function(){
							$('.center-container').css('opacity','1').animate({opacity:'1'},500,function(){
								$('#loading_page').fadeOut(200);
							});
						});
					}); //.css({height:'550px',overflow:'auto'}); NEW 12/19/11
				});
				 	
		$.address.value("/"+urlHash);
	}
	
	
	
							
}

$(document).ready(function(){
		
	
	$.address.crawlable(true);
	$.address.externalChange(function(event) {
		 var age = $.cookie('age');
		 //var age = $.cookie('the_cookie', 'the_value', { expires: 7, path: '/' });
	if (age!='permissible')
	{
		$('#agegate').css('display','');
		$('#agegate-container').load('pages/index-agegate.html').show();
	}
	else
	   LoadURLHash();
	  
	});
	
	//Click left project slide
	$('.arr-mixology.left a').live('click',function(event){
		var ajaxSplit, ajaxMajor, ajaxMinor, urlHash;
		urlHash = $(this).attr('href');
		urlHash = urlHash.replace(/^#!\//,"");
		
		$('#loading_page').show();
		ajaxSplit = urlHash.split('-');
		ajaxMajor = ajaxSplit[0];
		ajaxMinor = ajaxSplit[1];
		
		if ((ajaxMajor == 'mixology') && (ajaxMinor != 'flavors')) 
		{
			ajaxMixo = ajaxMinor.split('ciroc');
			mixoCiro = ajaxMixo[0];
			mixoPage = ajaxMixo[1];
		}
		
		event.preventDefault();
		//console.log('Loading data from '+ajaxMajor+'.html ...');	
				
		$('.center-container.mixology').stop(true,true).animate({left:'1000px',opacity:'0'},600,'easeInQuart',function(){
			$('.center-container.mixology').css({left:'1000px',opacity:'0',backgroundImage:'none'}).load('pages/'+ urlHash +'.html',function(){
				$('#ajax-inner').waitForImages(function(){  
					$('.center-container.mixology').css({left:'-1000px',opacity:'0'}).animate({left:'0px',opacity:'1'},1000,'easeInOutQuint',function(){
						$('#loading_page').fadeOut(200);
						$.address.value("/"+urlHash);
 						if ($('.urllink').length > 0){
							$('.urllink').val(location); //.attr('disabled', true); // CHANGED 1/26/12
						}
					});
				});
			});
		});			
	});
	
	//Click right project slide
	$('.arr-mixology.right a').live('click',function(event){
		
		var ajaxSplit, ajaxMajor, ajaxMinor, urlHash, toLoad;
		toLoad = 'pages/'+ urlHash +'.html';
		urlHash = $(this).attr('href');
		urlHash = urlHash.replace(/^#!\//,"");
		
		$('#loading_page').show();
		ajaxSplit = urlHash.split('-');
		ajaxMajor = ajaxSplit[0];
		ajaxMinor = ajaxSplit[1];
		
		if ((ajaxMajor == 'mixology') && (ajaxMinor != 'flavors')) 
		{
			ajaxMixo = ajaxMinor.split('ciroc');
			mixoCiro = ajaxMixo[0];
			mixoPage = ajaxMixo[1];
		}
		
		event.preventDefault();
		//console.log('Loading data from '+ajaxMajor+'.html ...');	
				
		$('.center-container.mixology').stop(true,true).animate({left:'-1000px',opacity:'0'},600,'easeInQuart',function(){
			$('.center-container.mixology').css({left:'1000px',opacity:'0',backgroundImage:'none'}).load('pages/'+ urlHash +'.html',function(){
				$('#ajax-inner').waitForImages(function(){  
					//Show content
					$('.center-container.mixology').animate({left:'0px',opacity:'1'},1000,'easeInOutQuint',function(){
						$('#loading_page').fadeOut(200);
						$.address.value("/"+urlHash);
 						if ($('.urllink').length > 0){
							$('.urllink').val(location); //.attr('disabled', true); // CHANGED 1/26/12
						}
					});
				});
			});
		});			
	});
	
	
	//Every other link
	/*$.address.externalChange(function(event) {
		LoadURLHash();	   
	});*/		 
	
});	

$(window).load(function(){
		 
});
