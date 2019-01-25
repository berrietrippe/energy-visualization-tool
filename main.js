/*

 */


d3.csv("data/Energiebalans__aanbod__verbruik_25012019_115042.csv", function(data){
    let parsedData = parseData(data);
    drawLineChart(parsedData, "#o-line-chart-1");
    // drawChart2();
});

let max_value = 0;

function parseData(data){
    console.log(data);
    let arr = [];
    for (let i = 0; i < data.length; i++){
        let productionValue = Math.round(data[i]["Energieaanbod/Winning (PJ)"]);
        if (productionValue > max_value){
            max_value = productionValue;
        }
        let importValue = Math.round(data[i]["Totaal energieverbruik (PJ)"]);
        if (importValue > max_value){
            max_value = importValue;
        }
        let date = new Date(data[i]["Perioden"]);
        console.log(date + ", " + productionValue + ", " + importValue);
        arr.push(
            {
                date: date,
                production: + productionValue,
                import: + importValue
            });
    }

    return arr;
}

function drawChart(data){
    var x = width/data.length;

    var y = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, height]);

    d3.select(".chart")
        .selectAll("div")
        .data(data)
        .enter().append("div")
        .style("height", function(d) { return y(d) + "px"; })
        .style("width", function(d) { return x + "px"; })
        .style("background-color", function(d) { return "#007bff"})
        .text(function(d) { return d; });
}


function drawLineChart(data, selector) {
    // Get the dimensions of the SVG
    let svgWidth = $(selector).width();
    let svgHeight = $(selector).height();
    let margin = { top: 40, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    // var svgWidth = 1000, svgHeight = 600;
    let svg = d3.select(selector)
        .attr("width", width)
        .attr("height", height);

    svg.append("text")
        .attr("x", (svgWidth/ 2))
        .attr("y", (margin.top / 2))
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Energy insights");

    let g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")"
        );

    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear()
        .domain([0, max_value]) // input
        .range([height, 0]); // output


    let productionLine = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.production)})
        .curve(d3.curveMonotoneX); // apply smoothing to the line
    x.domain(d3.extent(data, function(d) { return d.date }));
    // y.domain(d3.extent(data, function(d) { return d.value }));

    let importLine = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.import)})
        .curve(d3.curveMonotoneX); // apply smoothing to the line
    x.domain(d3.extent(data, function(d) { return d.date }));
    // y.domain(d3.extent(data, function(d) { return d.value }));


    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain");
        // .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Production (PJ)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", productionLine);

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", importLine);

    let ordinal = d3.scaleOrdinal()
        .domain(["winning", "verbruik"])
        .range([ "steelblue", "orange"]);


    let legend = svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(" + (width - 30) + " , " + (height - 10) + " )");

    let legendOrdinal = d3.legendColor()
        .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
        .shapePadding(10)
        //use cellFilter to hide the "e" cell
        .cellFilter(function(d){ return d.label !== "e" })
        .scale(ordinal);

    legend.call(legendOrdinal);

}
