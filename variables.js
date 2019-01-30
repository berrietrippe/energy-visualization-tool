function getLineGraphString(id){
    return '<div class="row" style="height:70%;">'+
        '        <div class="col-2 h-100 p-3">'+
        '            <div class="s-border h-100 p-3 w-100">'+
        '                <h5>Line graph #' + id + '</h5>'+
        '                <hr>'+
        '                <h6>Source</h6>'+
        '                <span style="font-size:0.8rem; color:#6e6e6e; line-height:0.5rem;word-break:break-all;" id="o-filename-' + id + '">filename not known</span>'+
        '                <hr>'+
        '                <h6>Date range selector</h6>'+
        ''+
        '                <span style="font-size:0.8rem; color:#6e6e6e; line-height:0.5rem;word-break:break-all;">To be implemented</span>'+
        '                <hr>'+
        '                <h6>Kind of energy</h6>'+
        '                <select style="max-width:100%;" id="selectorList-' + id + '" onchange="selectorChanged(' + id + ', this)">'+
        '                </select>'+
        '                <hr>'+
        ''+
        '                <h6>Categories</h6>'+
        '                <ul id="topicList-' + id + '" style="font-size:0.8rem;" class="o-selector-list">'+
        ''+
        '                </ul>'+
        '            </div>'+
        ''+
        '        </div>'+
        '        <div class="col h-100">'+
        '            <div class="container-fluid h-100">'+
        '                <div class="row pb-3 h-100">'+
        '                    <div id="o-container-chart-' + id + '" class="col h-100 p-3">'+
        '                        <!--<div class="chart h-100 w-100">-->'+
        '                            <!--<h5>Total energy production per year</h5>-->'+
        '                            <!--<!–<div class="o-axis o-y-axis"><div class="o-label">Energy production</div></div>–>-->'+
        '                            <!--<!–<div class="o-axis o-x-axis"><div class="o-label">Year</div></div>–>-->'+
        '                        <!--</div>-->'+
        '                        <svg id="o-chart-' + id + '" class="line-chart w-100 h-100"></svg>'+
        '                    </div>'+
        '                    <div class="col-3 h-100 p-3">'+
        '                        <div class="o-visualization">'+
        '                            <div>Content can be displayed here</div>'+
        '                        </div>'+
        '                    </div>'+
        '                </div>'+
        '            </div>'+
        '        </div>'+
        ''+
        '    </div>';

}

function getExtendedLineGraphString(id){
    return '<div class="row" style="height:70%;">'+
        '        <div class="col-3 h-100 p-3">'+
        '            <div class="s-border h-100 p-3 w-100">'+
        '                <h5>Extended line graph #' + id + '</h5>'+
        '                <hr>'+
        '                <h6>Date range selector</h6>'+
        ''+
        '                <span style="font-size:0.8rem; color:#6e6e6e; line-height:0.5rem;word-break:break-all;">To be implemented</span>'+
        '                <hr>'+
        '                <h6>Category</h6>'+
        '                <select style="max-width:100%;" id="selectorList-' + id + '" onchange="selectorChanged(' + id + ', this)">'+
        '                </select>'+
        '                <hr>'+
        ''+
        '                <h6>Kind of energy</h6>'+
        '                <ul id="topicList-' + id + '" style="font-size:0.8rem;" class="o-selector-list">'+
        ''+
        '                </ul>'+
        '            </div>'+
        ''+
        '        </div>'+
        '        <div class="col h-100">'+
        '            <div class="container-fluid h-100">'+
        '                <div class="row pb-3 h-100">'+
        '                    <div id="o-container-chart-' + id + '" class="col h-100 p-3">'+
        '                        <!--<div class="chart h-100 w-100">-->'+
        '                            <!--<h5>Total energy production per year</h5>-->'+
        '                            <!--<!–<div class="o-axis o-y-axis"><div class="o-label">Energy production</div></div>–>-->'+
        '                            <!--<!–<div class="o-axis o-x-axis"><div class="o-label">Year</div></div>–>-->'+
        '                        <!--</div>-->'+
        '                        <svg id="o-chart-' + id + '" class="line-chart w-100 h-100"></svg>'+
        '                    </div>'+
        '                    <div class="col-3 h-100 p-3">'+
        '                        <div class="o-visualization">'+
        '                            <div>Content can be displayed here</div>'+
        '                        </div>'+
        '                    </div>'+
        '                </div>'+
        '            </div>'+
        '        </div>'+
        ''+
        '    </div>';

}

function getStreamGraphString(id){
    return '<div class="row" style="height:70%;">'+
        '        <div class="col-3 h-100 p-3">'+
        '            <div class="s-border h-100 p-3 w-100">'+
        '                <h5>Stream graph #' + id + '</h5>'+
        '                <hr>'+
        '                <h6>Date range selector</h6>'+
        ''+
        '                <span style="font-size:0.8rem; color:#6e6e6e; line-height:0.5rem;word-break:break-all;">To be implemented</span>'+
        '                <hr>'+
        '                <h6>Category</h6>'+
        '                <select style="max-width:100%;" id="selectorList-' + id + '" onchange="selectorChanged(' + id + ', this)">'+
        '                </select>'+
        '                <hr>'+
        ''+
        '                <h6>Kind of energy</h6>'+
        '                <ul id="topicList-' + id + '" style="font-size:0.8rem;" class="o-selector-list">'+
        ''+
        '                </ul>'+
        '            </div>'+
        ''+
        '        </div>'+
        '        <div class="col h-100">'+
        '            <div class="container-fluid h-100">'+
        '                <div class="row pb-3 h-100">'+
        '                    <div id="o-container-chart-' + id + '" class="col h-100 p-3">'+
        '                        <!--<div class="chart h-100 w-100">-->'+
        '                            <!--<h5>Total energy production per year</h5>-->'+
        '                            <!--<!–<div class="o-axis o-y-axis"><div class="o-label">Energy production</div></div>–>-->'+
        '                            <!--<!–<div class="o-axis o-x-axis"><div class="o-label">Year</div></div>–>-->'+
        '                        <!--</div>-->'+
        '                        <svg id="o-chart-' + id + '" class="line-chart w-100 h-100"></svg>'+
        '                    </div>'+
        '                </div>'+
        '            </div>'+
        '        </div>'+
        ''+
        '    </div>';

}



//
// this.svg.append("rect")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//     .attr("class", "overlay")
//     .attr("width", width)
//     .attr("height", height)
//     // when the mouse enters the canvas, show the line
//     .on("mouseover", function() {
//         d3.select(".mouse-line")
//             .style("opacity", "1");
//     })
//     // remove the line when leaving canvas
//     .on("mouseout", function() {
//         d3.select(".mouse-line")
//             .style("opacity", "0");
//
//     })
//     .on("mousemove", function() {
//         let mouse = d3.mouse(this);
//         d3.select(".mouse-line")
//             .attr("d", function() {
//                 let d = "M" + mouse[0] + "," + height;
//                 d += " " + mouse[0] + "," + 0;
//                 return d;
//             });
//
//         // console.log(x.invert(d3.mouse(this)[0]))
//     });
//
// this.g.append("path") // this is the black vertical line to follow mouse
//     .attr("class", "mouse-line")
//     .style("stroke", "black")
//     .style("stroke-width", "1px")
//     .style("opacity", "0");