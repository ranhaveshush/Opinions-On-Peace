var _margin = {top: 50, right: 40, bottom: 20, left: 40},
    width = 1200*4 - _margin.left - _margin.right,
    height = 600 - _margin.top - _margin.bottom;

// Check if this vars have to be global
var _yTimeline = height;

/*var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2);*/

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select("#wrapper").append("svg")
    .attr("width", width + _margin.left + _margin.right)
    .attr("height", height + _margin.top + _margin.bottom)
  .append("g")
    .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");

d3.json("includes/data/data.json", function(error, data) {

  x.domain(getDatesRange(data));

  var gapPercentage = 0.2;
  var barWidth = Math.floor( (width / data.length) * (1-gapPercentage) );

  data.forEach(function(d) {
      d.Date = new Date(d.year, d.month, 15);
      var children = getChildren(d);
      var cumulateHeight = 0;
      children.forEach(function(d) {
          d.width = barWidth;
          d.y0 = cumulateHeight;
          d.height = y(d.opinionValue);
          cumulateHeight += d.height;
      });
  });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + _yTimeline + ")")
      .call(xAxis);

  var month = svg.selectAll(".month")
      .data(data)
    .enter().append("g")
      .attr("class", "month")
      .attr("transform", function(d) { return "translate(" + x(d.Date) + ",0)"; });

  month.selectAll("rect")
      .data(function(d) { return getChildren(d); })
    .enter().append("rect")
      .attr("y", function(d) { return d.y0; })
      .attr("width", function(d) {return d.width; })
      .attr("height", function(d) { return d.height; })
      .attr("percentage", function(d) { return d.opinionValue })
      .style("fill", function(d) { return colors[d.opinionIndex]; });

  d3.json("includes/data/events.json", function(error, events) {

    svg.selectAll(".event")
        .data(events)
      .enter().append("circle")
        .attr("class", "event")
        .attr("r", 5)
        .attr("cx", function(d) { d.Date = new Date(d.year, d.month, d.date); console.log(d.Date); return x(d.Date); })
        .attr("cy", function(d) { return 100; })
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
  });

});

function getChildren(datum) {
    var nationalitiesIndex = datum.nationalitiesIndex;
    return (nationalitiesIndex == 0) ? datum.children : datum.children[nationalitiesIndex].children;
}

function getDatesRange(data) {
    var firstEvent = data[0];
    var minDate = new Date(firstEvent.year, firstEvent.month-1, (firstEvent.date) ? firstEvent.date : 1);
    var lastEvent = data[data.length-1];
    var maxDate = new Date(lastEvent.year, lastEvent.month-1, (lastEvent.date) ? lastEvent.date : 1);
    return [minDate, maxDate];
}