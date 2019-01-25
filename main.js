
data_list = [];

let height = $("#o-chart-1").height() - 52;
let width = $("#o-chart-1").width() - 20;

d3.csv("data/Energiebalans__aanbod__verbruik_17012019_164739.csv", function(data){
    for (let i = 0; i < data.length; i++){
        var val = data[i]["Energieaanbod/Winning (PJ)"];
        console.log(val);
        data_list[i] = parseInt(val);
    }

    var x = width/data_list.length;

    var y = d3.scale.linear()
        .domain([0, d3.max(data_list)])
        .range([0, height]);



    d3.select(".chart")
        .selectAll("div")
        .data(data_list)
        .enter().append("div")
        .style("height", function(d) { return y(d) + "px"; })
        .style("width", function(d) { return x + "px"; })
        .style("background-color", function(d) { return "#007bff"})
        .text(function(d) { return d; });
});
