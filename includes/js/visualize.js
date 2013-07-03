var _margin = {top: 50, right: 40, bottom: 20, left: 40},
    _width = 1200*4 - _margin.left - _margin.right,
    _height = 400 - _margin.top - _margin.bottom;

var _yTimeline = -15;
var _prevMonth;
var _prevEventIndex = -1;

var x = d3.time.scale()
    .range([0, _width]);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, _height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(d3.time.years, 1)
    .orient("top");

var svg = d3.select("#data-vis").append("svg")
    .attr("width", _width + _margin.left + _margin.right)
    .attr("height", _height + _margin.top + _margin.bottom)
  .append("g")
    .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");

d3.json("includes/data/data.json", function(error, data) {

  x.domain(getDatesRange(data));

  var gapPercentage = 0.5;
  var barWidth = Math.floor( (_width / data.length) * (1-gapPercentage) );

  data.forEach(function(d) {
      d.Date = new Date(d.year, d.month-1, 15);
      var children = getChildren(d);
      var cumulateHeight = 0;
      children.forEach(function(opinion) {
          opinion.width = barWidth;
          opinion.y0 = cumulateHeight;
          opinion.height = y(opinion.opinionValue);
          cumulateHeight += opinion.height;
      });
  });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + _yTimeline + ")")
	  .style("stroke-dasharray", ("1, 3"))
	  .attr("stroke", "#808080")
	  .attr("fill", "#808080")
	  .call(xAxis);

  // hovers line ticks with circles
	svg.selectAll("g")
    .append("circle")
    .attr("class", "circle")
		.attr("cy", 0)
    .attr("r", 4);

  var monthsContainer = svg.append("g")
      .attr("class", "months");

  var month = monthsContainer.selectAll(".month")
      .data(data)
    .enter().append("g")
      .attr("class", "month")
      .attr("transform", function(d) { return "translate(" + x(d.Date) + ",0)"; })
      .on("click", function(d) {
          toogleMonth(this, d);
      });

  month.selectAll("rect")
      .data(function(d) { return getChildren(d); })
    .enter().append("rect")
      .attr("y", function(d) { return d.y0; })
      .attr("width", function(d) {return d.width; })
      .attr("height", function(d) { return d.height; })
      .attr("percentage", function(d) { return d.opinionValue })
      .style("fill", function(d) { return _colors[d.opinionIndex]; });

  d3.json("includes/data/events.json", function(error, data) {

    var eventsContainer = svg.append("g")
        .attr("class", "events");

    eventsContainer.selectAll(".event")
        .data(data)
      .enter().append("circle")
        .attr("class", "event")
        .attr("r", 8)
        .attr("cx", function(d) { d.Date = new Date(d.year, d.month-1, d.date); return x(d.Date); })
        .attr("cy", function(d) { return _yTimeline; })
        .on("click", function(d) {
            toggleEvent(d);
        });
  });

});

function getChildren(datum) {
    var nationalitiesIndex = datum.nationalitiesIndex;
   return (nationalitiesIndex == 0) ? datum.children : datum.children[nationalitiesIndex].children;
}

function getDatesRange(data) {
    var firstEvent = data[0];
    var minDate = new Date(firstEvent.year-1, firstEvent.month-1, (firstEvent.date) ? firstEvent.date : 1);
    var lastEvent = data[data.length-1];
    var maxDate = new Date(lastEvent.year+1, lastEvent.month, (lastEvent.date) ? lastEvent.date : 1);
    console.log("nimDate=" + minDate);
    console.log("maxDate=" + maxDate);
    return [minDate, maxDate];
}

function toogleMonth(element, month) {
  // hides event-tooltip
	$('#event-tooltip').hide();
	
	var dateContainer = $('#opinions-tooltip #date-container');
  var opinionsContainer = $('#opinions-tooltip #opinions-container');
  
  // clears previous tooltips content
  dateContainer.empty();
  opinionsContainer.empty();

  // gets the month data
  var date = month.Date;
 	
  // sets correct question
	var questioNum = (month.year <= 2004)||((month.year == 2004)&&(month.month < 3)) ? 0: 1;
	$('#question').text(_questions[questioNum]);
  
  // conrects the opinions
	var opinionsIndex = month.opinionsIndex;
	var opinions = (month.children.length == 6) ? month.children : month.children[month.children.length-1].children;

  // renders date
  var monthText = date.getMonth()+1;
  var yearText = date.getFullYear();
  var dateText = monthText + "-" + yearText;
  dateContainer.text(dateText);

  // calcs the white space between opinions
  var length = opinions.length;
  var whitespace = (1100 / length) - 150;
  
  // renders opinions
  for (var i=0; i < length; ++i) {
    var opinion = opinions[i];
    var opinionIndex = opinion.opinionIndex;

    var opinionText = _opinions[opinionsIndex][opinionIndex];
    var opinionPercentage = opinion.opinionValue;
    var opinionColor = _colors[opinionIndex];

    var opinionElement = $('<section>')
      .addClass('opinion')
      .css('margin-left', whitespace + "px")
      .append('<span class="opinion-text">' + opinionText + '</span>')
      .append('<span class="opinion-percentage">' + opinionPercentage + '</span>')
      .append('<div class="opinion-color" style="background-color:' + opinionColor + ';"></div>');

    opinionsContainer.prepend(opinionElement);
  }

  // ugly but handling the toggle
  if (_prevMonth && (month.year === _prevMonth.year && month.month === _prevMonth.month) ) {
    $('#opinions-tooltip').toggle();
    if (element.classList[1] === "selected") {
      element.classList.remove("selected");
      $('g[class="month"]').css("opacity", "1.0");
    } else {
      element.classList.add("selected");
      $('g[class~="selected"]').css("opacity", "1.0");
      $('g[class="month"]').each(function() {
        $(this).css("opacity", "0.5");
      });
    }
  } else {
    $('#opinions-tooltip').show();
    $('.selected').each(function() {
      this.classList.remove("selected");
    });
    element.classList.add("selected");
    $('g[class~="selected"]').css("opacity", "1.0");
    $('g[class="month"]').each(function() {
      $(this).css("opacity", "0.5");
    });
  }

  _prevMonth = month;
}

function toggleEvent(event) {
	// hides opinions-tooltip
	$('#opinions-tooltip').hide();

	var eventIndex = event.eventIndex;
  var eventTitle = _events[eventIndex].title;
	// gets the month data
	var eventDate = event.Date;
	// renders date
  var monthText = eventDate.getMonth()+1;
  var yearText = eventDate.getFullYear();
  var eventDateText = monthText + "-" + yearText;
	var eventDetails = 	_events[eventIndex].details;

  $('#event-tooltip #title h2').text(eventTitle+" "+eventDateText);
  $('#event-tooltip #details p').text(eventDetails);
  $('#event-tooltip img').attr("src", "includes/img/event_" + eventIndex + ".jpg");

  if (eventIndex === _prevEventIndex) {
    $('#event-tooltip').toggle();
  } else {
    $('#event-tooltip').show();
  }
  _prevEventIndex = eventIndex;
}