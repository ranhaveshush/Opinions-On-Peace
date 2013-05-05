var diameter = 760;
var range = d3.scale.linear()
        .domain([0, 100])
        .range([0, 60]);

var tree = d3.layout.tree()
    .size([360, diameter / 2 -120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
	.append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
	
d3.json("includes/data/data.json", function(error, root) {
  console.log("root: " + root);
 svg.append("circle")				/*outer*/	
	.attr("r",diameter / 2-10)
	.attr("fill","#172933")
	.attr("stroke","gray")
	.attr("stroke-width","1");
svg.append("circle")				
	.attr("r",diameter / 2-16 )
	.attr("fill","#172933")
	.attr("stroke","gray")
	.attr("stroke-width","1");	
svg.append("circle")				
	.attr("r",diameter / 2-100 )
	.attr("fill","#172933")
	.attr("stroke","gray")
	.attr("stroke-width","1");
svg.append("circle")				
	.attr("r",diameter / 2-130 )
	.attr("fill","#172933")
	.attr("stroke","gray")
	.attr("stroke-width","1");		
svg.append("circle")				
	.attr("r",diameter / 2-220 )
	.attr("fill","#172933")
	.attr("stroke","gray")
	.attr("stroke-width","1");
svg.append("circle")				 /*iner	*/	
	.attr("r",diameter / 2-250 )
	.attr("fill","#172933")
	.attr("stroke","gray")
	.attr("stroke-width","1");	
		
svg.append("circle")				/*jews*/
	.attr("cx",-290)
	.attr("cy",270)
	.attr("fill","#85D8FF")
	.attr("r",15 )
	.attr("stroke","white")
	.attr("stroke-width","1");
svg.append("circle")				 /*arabs*/
	.attr("cx",-290)
	.attr("cy",315)
	.attr("fill","green")
	.attr("r",15 )
	.attr("stroke","white")
	.attr("stroke-width","1");
svg.append("circle")					/*General population*/
	.attr("cx",-290)
	.attr("cy",360)
	.attr("fill","orange")
	.attr("r",15 )
	.attr("stroke","white")
	.attr("stroke-width","1");	
svg.append("text")					/*jews text*/
	.attr("dx",-360)
	.attr("dy",275)
	.attr("fill","#85D8FF")
	.text("יהודים"); 
svg.append("text")					/*arabs text*/
	.attr("dx",-360)
	.attr("dy",315)
	.attr("fill","#85D8FF")
	.text("ערבים"); 	
svg.append("text")					/*General population text*/
	.attr("dx",-381)
	.attr("dy",365)
	.attr("fill","#85D8FF")
	.text("כלל אוכלוסיה"); 		
	
svg.append("text")					/*מדד השלום*/
	.attr("dx",280)
	.attr("dy",320)
	.attr("fill","#85D8FF")
	.text("מדד השלום"); 	
svg.append("text")					/*ינואר /2012*/
	.attr("dx",280)
	.attr("dy",340)
	.attr("fill","#85D8FF")
	.text("ינואר/2012"); 		
svg.append("text")					/*מה עמדתך*/
	.attr("dx",120)
	.attr("dy",360)
	.attr("fill","#85D8FF")
	.text("מה עמדתך לגבי ניהול משא ומתן לשלום"); 			
	
svg.append("image")
	.attr("x","-25")
	.attr("y","-25")
	.attr("width","50")
	.attr("height","50")
	.attr("xlink:href","includes/images/peace.gif");
svg.append("image")
	.attr("x","300")
	.attr("y","250")
	.attr("width","50")
	.attr("height","50")
	.attr("xlink:href","includes/images/peaceColor.gif");	
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
      var node = d;
      while (node.depth > 1) {
        node = node.parent;
      }
		  return (node.depth != 0) ? colors[node.name] : null;
		})
    .attr("class", "node")
    .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("circle")
    .attr("r", function(d,i) { 
		if(d.size == 20)
			return 20;
			
	   return range(d.opinion);});


  node.append("text")
      .attr("dy", ".31em")
	  .attr("fill", "#ffffff")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(28)" : "rotate(180)translate(-28)"; })
      .text(function(d,i) { 
	  if(d.children[i].name == "0")
	  return;
	  return opinion[d.name]; 
	  });
	 
});

d3.select(self.frameElement).style("height", diameter - 150 + "px");
