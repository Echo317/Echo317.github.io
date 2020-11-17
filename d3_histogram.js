define( ["http://d3js.org/d3.v3.min.js"], function( d3 ) {
"use strict";

function D3BarChart()
{
};

D3BarChart.prototype.draw = function( oControlHost )
{    var margin = {
		top:40,
		right:40,
		bottom:40,
		left:40
	
		},
		width=1000-margin.left-margin.right,
		height=540-margin.top-margin.bottom;
		var x=d3.scaleLinear().range([0,width]);
		var y=d3.scaleLinear().range([height,0]);

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
var dataSetCxCy=getObjectArrayFromDataStore(g_dataStore[0]);
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

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
