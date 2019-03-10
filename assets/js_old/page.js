'use strict';
(function($) {
	$(document).ready(function() {
		$('.left-side .nav .static').click(function(event) {
			$(this).toggleClass('active');
			$(this).next('.coll').toggleClass('active');
		});
		// $('.to-top-btn').click(function() {
		// 	$('body').animate({scrollTop: 0},600);
		// 	return false;
		// });
		$('.to-top-btn').click(function() {
			$.scrollTo('.container', 800);
			return false;
		});
	});

})(jQuery);

