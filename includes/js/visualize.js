
var margin = {top: 20, right: 100, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .5);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	/*d3.json("includes/data/data.json", function(error, data) {*/
d3.json("includes/data/data.json", function(error, data) {
	
	var childrens;
    data.forEach(function(d,i) {
		switch(d.nationalitiesIndex){
		case 0:
		console.log(d.children);
		childrens = d.children;
		break;
		case 1:
		console.log(d.children[1].children);
		childrens = d.children[1].children;
		break;
		case 2:
		console.log(d.children[2].children);
		childrens = d.children[2].children;
		break;
		}
		
        var cumulateHeight = 0;
        childrens.forEach(function(d,i) {
		console.log(d.opinionValue);		
		    d.y0 = cumulateHeight;
            d.height = y(d.opinionValue);
            cumulateHeight += d.height;
		  //  console.log(cumulateHeight);
		 
        })
		
		//console.log(i+" "+cumulateHeight);
    });
x.domain(data.map(function(d) { 

return d.Month; 
}));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  var month = svg.selectAll(".month")
      .data(data)
	  .enter()
	.append("g")
    .attr("class", "month")
	.attr("transform", function(d,i) { return "translate(" + x(d.Month) + ",0)"; });
	//.attr("transform", function(d,i){return x(i*100);},0);
		  

  month.selectAll("rect")
      .data(function(d) { 
	  var childrens;
	 // console.log(d.opinionsIndex);
	  switch(d.nationalitiesIndex){
		case 0:
	//	console.log(d.children.length);
		childrens = d.children;
		break;		
		case 1:
	//	console.log(d.children[1].children.length);
		childrens = d.children[1].children;
		break;
		case 2:
	//	console.log(d.children[2].children.length);
		childrens = d.children[2].children;
		break;
		}
	//console.log(childrens);		
		return childrens;
	   
	  })
    .enter().append("rect")
      .attr("y", function(d) { return d.y0; })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return d.height; })
      .style("fill", function(d) { return colors[d.opinionIndex]; });
/*
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
*/

});
