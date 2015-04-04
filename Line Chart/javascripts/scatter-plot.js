var width = 960;
var height = 540;
var padding = 120;

// Label names
var title = "Wes Anderson Films";
var xAxisLabel = "Box Office (in millions USD)";
var yAxisLabel = "Budget (in millions USD)";

// Example Dataset
var dataset = [
  {title: "Bottle Rocket", year: 1996, budget: 7, boxoffice: 1, rt: 80},
  {title: "Rushmore", year: 1998, budget: 20, boxoffice: 17, rt: 87},
  {title: "The Royal Tenenbaums", year: 2001, budget: 21, boxoffice: 71, rt: 80},
  {title: "The Life Aquatic with Steve Zissou", year: 2004, budget: 50, boxoffice: 34, rt: 53},
  {title: "The Darjeeling Limited", year: 2007, budget: 17, boxoffice: 35, rt: 67},
  {title: "Fantastic Mr. Fox", year: 2009, budget: 40, boxoffice: 46, rt: 93},
  {title: "Moonrise Kingdom", year: 2012, budget: 16, boxoffice: 60, rt: 94}
];

// Scales
var xScale = d3.scale.linear()
  .domain([0, 55])
  .rangeRound([padding, width - padding]);

var yScale = d3.scale.linear()
  .domain([0, 80])
  .rangeRound([height - padding, padding]);
  
var rScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) { return d.rt; })])
  .range([1, 12]);

// Define axes
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .tickPadding(padding / 4)
  .tickSize(-height  + padding * 2, 0);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .tickPadding(padding / 4)
  .tickSize(-width + padding * 2, 0);

// Create SVG
var svg = d3.select("#graph")
  .append("svg")
  .attr("class", "scatterplot")
  .attr("width", width)
  .attr("height", height)
  .style("shape-rendering", "geometricPrecision");

// Create axes
svg.append("g")
  .attr("class", "xaxis")
  .attr("transform", "translate(0," + (height - padding) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "yaxis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

// Style axes text 
d3.selectAll(".xaxis text, .yaxis text")
  .attr("fill", "#999")
  .style("font-size", "12px");
  
// Style axes lines  
d3.selectAll(".xaxis line, .yaxis line")
  .attr("stroke", "#eee")
  .style("stroke-width", 1)
  .attr("fill", "none");
  
// Hide axes paths  
d3.selectAll(".xaxis path, .yaxis path")
  .attr("stroke", "none")
  .attr("fill", "none");
  
// Create x axis label  
svg.append("text")
  .attr("class", "axis-label")
  .attr("transform", "translate("+ (padding / 4) +","+(height / 2)+")rotate(-90)")
  .text(xAxisLabel);

// Create y axis label  
svg.append("text")
  .attr("class", "axis-label")
  .attr("transform", "translate("+ (width / 2) +","+(height-(padding / 4))+")")
  .text(yAxisLabel);
  
// Style axes labels  
svg.selectAll(".axis-label")
  .attr("text-anchor", "middle")
  .style("font-size", "12px")
  .attr("fill", "#555");
  
// Create chart label
svg.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", "translate("+ (width / 2) +","+ padding / 2 +")")
  .style("font-size", "18px")
  .style("font-weight", "bold")
  .attr("fill", "#555")
  .text(title);
    
// Create circles
svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return xScale(d.budget); })
  .attr("cy", function(d) { return yScale(d.boxoffice); })
  .attr("r", function(d) { return rScale(d.rt); })
  .attr("fill", "#1db34f")
  .style("opacity", 0)
  .on("mouseover", function(d) { 
    svg.append("text")
    .attr("class", "tooltip")
    .attr("x", function() { return xScale(d.budget); })
    .attr("y", function() { return yScale(d.boxoffice) + 24; })
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .attr("fill", "#555")
    .text(function() { return d.title + " (" + d.year + ")"; }); 
  })
  .on("mouseout", function(d) { 
    svg.select(".tooltip").data([]).exit().remove();
  });

// Animate circles
window.onload = function (d) {
  svg.selectAll("circle").transition()
    .duration( function(d) { return (100 - d.rt) * 75; })
    .style("opacity", 1);
};