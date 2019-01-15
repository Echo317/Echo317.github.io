define(["https://ajax.googleapis.com/ajax/libs/d3js/5.7.0/d3.min.js"], function( d3 ) {
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
	var diameter = 400;
	var color = d3.scale.category20c();
	var dataset =this.m_aData ;
	console.log(this.m_aData);
    //var color = d3.scaleOrdinal(d3.schemeCategory20);
	var bubble = d3.layout.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);
	var svg = d3.select(oControlHost.container)
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");
	//bubbles needs very specific format, convert data to this.
    var nodes = bubble.nodes({children:dataset}).filter(function(d) { return !d.children; });
	//setup the chart
	var bubbles = svg.append("g")
        .attr("transform", "translate(0,0)")
        .selectAll(".bubble")
        .data(nodes)
        .enter();
	//create the bubbles
    bubbles.append("circle")
        .attr("r", function(d){ return d.r; })
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .style("fill", function(d) { return color(d.value); });
	//format the text for each bubble
    bubbles.append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y + 5; })
        .attr("text-anchor", "middle")
        .text(function(d){ return d["name"]+':'+d["value"]; })
        .style({
            "fill":"white", 
            "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": "12px"
        });
		var _this = this
	var obj=d3.selectAll('circle')
		.on('click',
		function(d,i){
				//values=d["name"]
				//_this.getParameters(oControlHost, d["name"])
				//alert(oControlHost.page.getControlsByName("_Para1").getValues());
				//oControlHost.container.innerHTML=d["name"];
				_this.f_onClick(oControlHost,d["name"])
				
				//console.log(1)
		   }
		   );
};
D3BarChart.prototype.f_onClick = function (oControlHost,paraValue) {
	var oValues = [{'use': paraValue, 'display': paraValue}];
	 oControlHost.page.getControlByName('para').setValues( oValues ) ;
	
	 oControlHost.finish()
	};

D3BarChart.prototype.setData = function( oControlHost, oDataStore )
{
	this.m_oDataStore = oDataStore;
	this.m_aData = [];
	var iRowCount = oDataStore.rowCount;
	for ( var iRow = 0; iRow < iRowCount; iRow++ ) {
		var rec = {
			"name" : oDataStore.getCellValue( iRow, 0),
			//"year" : oDataStore.getCellValue( iRow, 1),
			"value" : oDataStore.getCellValue( iRow, 1),
			};
		this.m_aData.push(rec);
 };
 };

return D3BarChart;

});
