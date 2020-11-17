define( ["http://d3js.org/d3.v3.min.js"], function( d3 ) {
"use strict";

function D3BarChart()
{
};

D3BarChart.prototype.draw = function( oControlHost )
{
	var o = oControlHost.configuration;
	var iWidth = ( o && o.Width ) ? o.Width : 500;
	var iHeight = ( o && o.Height ) ? o.Height : 16;
	var sBackgroundColor = ( o && o["Background color"] ) ? o["Background color"] : "#C8F08F";

	var fnScale = d3.scale.linear()
		.domain( [0, d3.max( this.m_aData )] )
		.range( [0, iWidth] );

	d3.select( oControlHost.container )
	
	/* Replace this section with your own code */
	
	// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseDate = d3.timeParse("%d-%m-%Y");

// set the ranges
var x = d3.scaleTime()
          .domain([new Date(2010, 6, 3), new Date(2012, 0, 1)])
          .rangeRound([0, width]);
var y = d3.scaleLinear()
          .range([height, 0]);

// set the parameters for the histogram
var histogram = d3.histogram()
    .value(function(d) { return d.date; })
    .domain(x.domain())
    .thresholds(x.ticks(d3.timeMonth));

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data

 function getObjectArrayFromDataStore(oDataStore) 
{
	var dataObjectArray = [] ;
	if(! oDataStore){
	return dataObjectArray;
	}
	for (var i=0 ; i< oDataStore.rowCount;i++){
	var inputcell=[];
	inputcell.x= oDataStore.getCellValue(i,1);
	dataObjectArray.push(inputcell);
	}
	return dataObjectArray;

}


/* We need to read data from Cognos
d3.csv("earthquakes.csv", function(error, data) {
  if (error) throw error;
*/
  // format the data
  data.forEach(function(d) {
      d.date = parseDate(d.dtg);
  });

  // group the data for the bars
  var bins = histogram(data);

  // Scale the range of the data in the y domain
  y.domain([0, d3.max(bins, function(d) { return d.length; })]);

  // append the bar rectangles to the svg element
  svg.selectAll("rect")
      .data(bins)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 1)
      .attr("transform", function(d) {
		  return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
      .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
      .attr("height", function(d) { return height - y(d.length); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
      
});
};

D3BarChart.prototype.setData = function( oControlHost, oDataStore )
{
	this.m_oDataStore = oDataStore;
	this.m_aData = [];
	var iRowCount = oDataStore.rowCount;
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		this.m_aData.push( oDataStore.getCellValue( iRow, 1 ) );
	}
};

return D3BarChart;
});
