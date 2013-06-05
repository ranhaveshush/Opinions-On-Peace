var margin = {top: 50, right: 40, bottom: 20, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var numOfMonthsToDisplay = 8;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.5);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select("body").append("svg")
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

function getChildren(datum) {
    var nationalitiesIndex = datum.nationalitiesIndex;
    return (nationalitiesIndex == 0) ? datum.children : datum.children[nationalitiesIndex].children;
}

function filterData(data) {
    return data.slice(data.length - numOfMonthsToDisplay);
}