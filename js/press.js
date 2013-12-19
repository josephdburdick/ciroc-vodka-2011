var status;

$(document).ready(function(){
	if($('#scrollbar1').length > 0){
		$('#scrollbar1').tinyscrollbar({ sizethumb: 28 });
	}

	if ($('.center-container.form').length > 0){
		
		$('a.submit').click(function(){

			if ( jQuery.trim($('input#city').val()) == '' && jQuery.trim($('input#state').val()) == '' ) return;

			$('input#city').attr("readonly","true");
			$('input#state').attr("readonly","true");

			$.ajax({
				"dataType": 'html',
				"type": "POST",
				"url": 'store.php',
				"data": { city: $('input#city').val(), state: $('input#state').val() },
				"success": function(data) {
					if ( data == '1' ) {
						status = 1;
					} else {
						status = 0;
						$('div#scrollbar1 div.overview').html(data);
					}

					$('input#city').removeAttr("readonly");
					$('input#state').removeAttr("readonly");
				},
				"complete": function() {
					if($('#scrollbar1').length > 0) $('#scrollbar1').tinyscrollbar({ sizethumb: 28 });
					$('.center-container.form').fadeOut(300,function() {
						$('.center-container.wheretobuy').removeClass('hidden',function() {
							$('#scrollbar1').tinyscrollbar({ sizethumb: 28 });
						},function() {
							$('.center-container.wheretobuy').css('opacity','0').fadeIn(600);
						});
					});

					if ( status == 1 ) $('div#scrollbar1').parent().html('<h4 class="text-center">Your search did not have any results. Please select another city or state.</h4>');

				}
			});

		});
	}
});		