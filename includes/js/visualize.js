var diameter = 760;
/*
 var dataset={
	year: 2013,
		opinions: [
		[3.0, 10.7, 14.5, 42.1, 29.8], 	// 0: Jews opinions
		[5.6, 0.0, 21.1, 28.9, 44.4],	// 1: Arabs opinions	
		[2.6, 9.9, 15.5, 40.1, 32.0]	// 2: General population opinions
	]
};

 var dataset = {
 "name": "FLARE",							
 "children": [
  {
   "name": "green",						
   "children": [
    {
     "name": "green",
     "children": [
      {"name": "green", "size": 24833}
     ]
    }
   ]
  }    
 ]
};*/
var tree = d3.layout.tree()
    .size([360, diameter / 2 -120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter )
	.append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
	
d3.json("flare.json", function(error, root) {
  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
	  .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
	.attr("fill",function(d,i) { 
		
		return "green";
		
		
	})
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
	node.append("circle")
      .attr("r", function(d,i) { 
	  if(i == 0)
		return 0;
	  return 25; });

	  /*
  node.append("text")
      .attr("dy", ".31em")
	  .attr("fill", "#ffffff")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
      .text(function(d) { return d.name; });*/
	 
});

d3.select(self.frameElement).style("height", diameter - 150 + "px");
