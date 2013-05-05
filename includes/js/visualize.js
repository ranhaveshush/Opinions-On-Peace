var diameter = 760;
var radius = diameter / 2;
var range = d3.scale.linear()
    .domain([0, 100])
    .range([0, 60]);

var tree = d3.layout.tree()
    .size([360, radius -120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

d3.json("includes/data/data.json", function(error, root) {
    console.log("root: " + root);

    // renders the background grey rings
    for (var i=0; i<7; ++i) {
        svg.append("circle")
            .attr("cx", )
            .attr("cy", )
            .attr("r", -diffs[i] + radius)
            .attr("fill","#172933")
            .attr("stroke","gray")
            .attr("stroke-width","1");
    }

    // renders visualization info
    var population = root.children;
    for (var j=0; j<nationality.length; ++j) {
        var fillColor = colors[population[j].name];
        svg.append("circle")
            .attr("cx",-290)
            .attr("cy",j*45 + 270)
            .attr("fill", fillColor)
            .attr("r",15)
            .attr("stroke","white")
            .attr("stroke-width","1");

        svg.append("text")
            .attr("dx",-360)
            .attr("dy",j*45 + 275)
            .attr("fill", fillColor)
            .text(nationality[population[j].name]);
    }

    // renders the visualization survey question info
    svg.append("text")
        .attr("dx",280)
        .attr("dy",320)
        .attr("fill","#85D8FF")
        .text("מדד השלום"); 	
    svg.append("text")
        .attr("dx",280)
        .attr("dy",340)
        .attr("fill","#85D8FF")
        .text("ינואר/2012"); 		
    svg.append("text")
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

    // renders the visualization
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
        .attr("fill", function(d,i) {
            var node = d;
            while (node.depth > 1) {
                node = node.parent;
            }
            return (node.depth != 0) ? colors[node.name] : null;
        })
        .attr("class", "node")
        .attr("transform", function(d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        });

    // renders 
    node.append("circle")
        .attr("r", function(d) {
            return (d.depth > 1) ? range(d.opinion) : d.size;
        });

    node.append("text")
        .attr("dy", ".31em")
        .attr("fill", "#ffffff")
        .attr("text-anchor", function(d) {
            return d.x < 180 ? "start" : "end";
        })
        .attr("transform", function(d) {
            return d.x < 180 ? "translate(28)" : "rotate(180)translate(-28)";
        })
        .text(function(d,i) {
            return (d.depth != 2) ? null : opinions[d.name];
        });
});

/*d3.select(self.frameElement).style("height", diameter - 150 + "px");*/
