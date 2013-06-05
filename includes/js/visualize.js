var margin = {top: 50, right: 40, bottom: 20, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var _numOfMonthsToDisplay = 8;

var _startMonth,
    _startYear,
    _endMonth,
    _endYear;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.5);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select("#wrapper").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("includes/data/data.json", function(error, data) {

  data = filterData(data);

  data.forEach(function(d) {
      var children = getChildren(d);
      var cumulateHeight = 0;
      children.forEach(function(d) {
          d.y0 = cumulateHeight;
          d.height = y(d.opinionValue);
          cumulateHeight += d.height;
      });
  });

  x.domain(data.map(function(d) { return d.month + "/" + d.year; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  var month = svg.selectAll(".month")
      .data(data)
    .enter().append("g")
      .attr("class", "month")
      .attr("transform", function(d, i) { var date = d.month + "/" + d.year; return "translate(" + x(date) + ",0)"; });

  month.selectAll("rect")
      .data(function(d) { return getChildren(d); })
    .enter().append("rect")
      .attr("y", function(d) { return d.y0; })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return d.height; })
      .style("fill", function(d) { return colors[d.opinionIndex]; });

  var legend = svg.select(".state:last-child").selectAll(".legend")
      .data(function(d) { return d.ages; })
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d) { return "translate(" + x.rangeBand() / 2 + "," + y((d.y0 + d.y1) / 2) + ")"; });

  legend.append("line")
      .attr("x2", 10);

  legend.append("text")
      .attr("x", 13)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

});

d3.json("includes/data/events.json", function(error, events) {

  events = events.filter(isEventInDatesRange);

  event.selectAll(".event")
        .data(events)
    .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.month); })
        .attr("cy", function(d) { return 0; })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div .html(formatTime(d.date) + "<br/>"  + d.close)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

}

function getChildren(datum) {
    var nationalitiesIndex = datum.nationalitiesIndex;
    return (nationalitiesIndex == 0) ? datum.children : datum.children[nationalitiesIndex].children;
}

// FIXME: needed to get filter args
function filterData(data) {
    var months = data.slice(data.length - _numOfMonthsToDisplay);
    _startMonth = months[0].month;
    _startYear = months[0].year;
    _endMonth = months[_numOfMonthsToDisplay - 1].month;
    _endMonth = months[_numOfMonthsToDisplay - 1].year;

    return months;
}

function isEventInDatesRange(event, index, array) {
    return (_startMonth <= event.month && _startYear <= event.yeaer) &&
            (event.month <= _endMonth && event.year <= _endYear);
}