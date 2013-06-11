$(document).ready(function() {

	$("body").delegate('[id^="scroll"]', "click", function() {
		var scrollDelta = 500;
		var id = $(this).attr("id");
		var svg = $("#bargraph svg");
		var right = svg.css("right");
		right = right.substring(0, right.length-2);
		right = parseInt(right, 10);
		if (id === "scrollLeft" && right >= -3685) {
			right -= scrollDelta;
		} else if (id === "scrollRight" && right < 0) {
			right += scrollDelta;
		}
		svg.animate({right: right+"px"}, 1000);
	});

});