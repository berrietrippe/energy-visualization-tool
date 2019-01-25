/*

 */




d3.csv("data/Energiebalans__aanbod__verbruik_17012019_164739.csv", function(data){
    let parsedData = parseData(data);
    drawChart1(parsedData);
    // drawChart2();
});

let max_value = 0;

function parseData(data){
    let arr = [];
    for (let i = 0; i < data.length; i++){
        let value = data[i]["Energieaanbod/Winning (PJ)"];
        if (value > max_value){
            max_value = value;
        }
        let date = new Date(data[i]["Perioden"]);
        arr.push(
            {
                date: date,
                value: + value
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


function drawChart1(data) {
    let svgWidth = $("#o-line-chart-1").width();
    let svgHeight = $("#o-line-chart-1").height();
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    // var svgWidth = 1000, svgHeight = 600;
    let svg = d3.select('svg')
        .attr("width", width)
        .attr("height", height);

    let g = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")"
        );

    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear()
        .domain([0, max_value]) // input
        .range([height, 0]); // output


    let line = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.value)})
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
        .attr("d", line);
}
