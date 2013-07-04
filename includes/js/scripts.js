$(document).ready(function() {

	$('#title').text(_title);
	$('#subtitle').text(_subtitle);
	$('#question').text(_questions[1]);

	$('#support').text(_opinions[0][5]);
	$('#oppose').text(_opinions[0][1]);
	$('#avoid').text(_opinions[0][0]);

	$('#authors').text(_authors);
	$('#reference span').text(_referenceText);
	$('#reference a').text('\"' + _referenceLink + '\"');


	$('body').delegate('[id^="scroll"] div', "click", function() {
		var scrollDelta = 353;
		var id = $(this).parent().attr("id");
		var svg = $("#data-vis svg");
		var right = svg.css("right");
		right = right.substring(0, right.length-2);
		right = parseInt(right, 10);
		if (id === "scroll-old" && right > -3300) {
			right -= scrollDelta;
		} else if (id === "scroll-new" && right < -188) {
			right += scrollDelta;
		}
		svg.animate({right: right+"px"}, 1500);
	});

	/*$(window).resize(function(){
		$('#wrapper').css({
		position:'absolute',
		left: ($(window).width() 
		- $('wrapper').outerWidth())/2,
		top: ($(window).height() 
		- $('wrapper').outerHeight())/2
		});
	 });*/

});