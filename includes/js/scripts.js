$(document).ready(function() {

	$('#title').text(title);
	$('#subtitle').text(subtitle);
	$('#question').text(questions[1]);

	$('#support').text(opinions[0][5]);
	$('#oppose').text(opinions[0][1]);
	$('#avoid').text(opinions[0][0]);

	$('#authors').text(authors);
	$('#reference span').text(referenceText);
	$('#reference a').text('\"' + referenceLink + '\"');


	$('body').delegate('[id^="scroll"] div', "click", function() {
		var scrollDelta = 500;
		var id = $(this).parent().attr("id");
		var svg = $("#data-vis svg");
		var right = svg.css("right");
		right = right.substring(0, right.length-2);
		right = parseInt(right, 10);
		if (id === "scroll-old" && right >= -3685) {
			right -= scrollDelta;
		} else if (id === "scroll-new" && right < 0) {
			right += scrollDelta;
		}
		svg.animate({right: right+"px"}, 1000);
	});

});