function getSelectionString(id){

    let selection = '<div class="selection">'+
        '    <div class="selection-header pl-5">'+
        '        <div class="container-fluid">'+
        '            <div class="row">'+
        '                <div class="col p-3 o-menu">'+
        '                    <h5>Selection</h5>'+
        '                    <label for="year">Year:</label>'+
        '                    <select name="" id="year"></select>'+
        '                </div>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        ''+
        '    <div class="selection-body">'+
        '        <div id="graphAdder-' + id + '" class="graphAdder p-3">'+
        '            <div class="">'+
        '                <div class="chart p-3" onclick="addLineGraph('+ id + ')">'+
        '                        <i class="fa fa-chart-line"></i> <br>'+
        '                        + Add Type I line graph'+
        '                </div>'+
        '            </div>'+
        '            <div class="">'+
        '                <div class="chart p-3" onclick="addExtendedLineGraph('+ id + ')">'+
        '                        <i class="fa fa-chart-line"></i> <br>'+
        '                        + Add Type II line graph'+
        '                </div>'+
        '            </div>'+
        '            <div class="">'+
        '                <div class="chart p-3" onclick="addStreamGraph('+ id + ')">'+
        '                        <i class="fa fa-chart-area"></i> <br>'+
        '                        + Add stream graph'+
        '                </div>'+
        '            </div>'+
        '            <div class="">'+
        '                <div class="chart p-3" onclick="addSankeyGraph('+ id + ')">'+
        '                        <i class="fa fa-wind"></i> <br>'+
        '                        + Add Sankey graph'+
        '                </div>'+
        '            </div>'+
        '            <!--<div class="col">-->'+
        '            <!--<div class="o-visualization p-3" onclick="addLineGraph()">-->'+
        '            <!--<div style="text-decoration: underline; cursor: pointer;">+ Add Sankey graph</div>-->'+
        '            <!--</div>-->'+
        '            <!--</div>-->'+
        '        </div>'+
        '    </div>'+
        '</div>';

        return selection;
}



function getLineGraphString(id){
    return  '<div id="o-graph-' + id + '" class="o-graph">' +
                '<div  class="row h-100"> ' +
                    '<div id="controls-' + id + '" class="col-3 h-100">'+
            '            <div class="o-editor h-100 p-3 w-100">'+
                            ' <i class="control fa fa-bars" onclick="closeControls(' + id + ')"></i>' +
            '                <h5>Type I line graph #' + id + '</h5>'+
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
            '                <hr>'+
            '                <h6>Actions</h6>'+
            '                <i class="fa fa-trash" style="cursor:pointer;color:gray;" onclick="deleteGraph(' + id + ')"></i>'+

            '            </div>'+
            '' +
            '        </div>'+
            '        <div class="col-9 h-100">'+
        '                <div class="row pb-3 h-100">'+
        '                    <div id="o-container-chart-' + id + '" class="col o-graph-container h-100 p-3">'+
                ' <i id="o-graph-container-control-' + id + '" class="control fa fa-bars" onclick="openControls(' + id + ')"></i>' +
        '                        <!--<div class="chart h-100 w-100">-->'+
        '                            <!--<h5>Total energy production per year</h5>-->'+
        '                            <!--<!–<div class="o-axis o-y-axis"><div class="o-label">Energy production</div></div>–>-->'+
        '                            <!--<!–<div class="o-axis o-x-axis"><div class="o-label">Year</div></div>–>-->'+
        '                        <!--</div>-->'+
        '                        <svg id="o-chart-' + id + '" class="line-chart w-100 h-100"></svg>'+
        '                    </div>'+
            '            </div>'+
            '        </div>'+
                '</div>'+
            '</div>'+
            '';

}

function getExtendedLineGraphString(id){
    return  '<div id="o-graph-' + id + '" class="o-graph o-graph-medium">' +
                '<div class="row h-100"> ' +
                    '<div id="controls-' + id + '" class="col-3 h-100 p-3">'+
            '            <div class="o-editor  h-100 p-3 w-100">'+
        ' <i class="control fa fa-bars" onclick="closeControls(' + id + ')"></i>' +
            '                <h5>Type II line graph #' + id + '</h5>'+
            '                <hr>'+
            '                <h6>Category</h6>'+
            '                <select style="max-width:100%;" id="selectorList-' + id + '" onchange="selectorChanged(' + id + ', this)">'+
            '                </select>'+
            '                <hr>'+
            ''+
            '                <h6>Kind of energy</h6>'+
            '                <ul id="topicList-' + id + '" style="font-size:0.8rem; word-break:break-word;" class="o-selector-list">'+
            ''+
            '                </ul>'+
        '                <hr>'+
        '                <h6>Actions</h6>'+
        '                <i class="fa fa-trash" style="cursor:pointer;color:gray;" onclick="deleteGraph(' + id + ')"></i>'+
            '            </div>'+
            ''+
            '        </div>'+
            '        <div class="col-9 h-100">'+
            '            <div class="container-fluid h-100">'+
            '                <div class="row pb-3 h-100">'+
            '                    <div id="o-container-chart-' + id + '" class="col o-graph-container h-100 p-3">'+
        ' <i id="o-graph-container-control-' + id + '" class="control fa fa-bars" onclick="openControls(' + id + ')"></i>' +
            '                        <!--<div class="chart h-100 w-100">-->'+
            '                            <!--<h5>Total energy production per year</h5>-->'+
            '                            <!--<!–<div class="o-axis o-y-axis"><div class="o-label">Energy production</div></div>–>-->'+
            '                            <!--<!–<div class="o-axis o-x-axis"><div class="o-label">Year</div></div>–>-->'+
            '                        <!--</div>-->'+
            '                        <svg id="o-chart-' + id + '" class="line-chart w-100 h-100"></svg>'+
            '                    </div>'+
            // '                    <div class="col-3 h-100 p-3">'+
            // '                        <div class="o-visualization">'+
            // '                            <div>Content can be displayed here</div>'+
            // '                        </div>'+
            // '                    </div>'+
            '                </div>'+
            '            </div>'+
            '        </div>'+
            ''+
            '    </div>';

}

function getStreamGraphString(id){
    return  '<div id="o-graph-' + id + '" class="o-graph o-graph-medium">' +
                '<div class="row h-100"> ' +
                    '<div id="controls-' + id + '"  class="col-3 h-100 p-3">'+
            '            <div class="o-editor  h-100 p-3 w-100">'+
        ' <i class="control fa fa-bars" onclick="closeControls(' + id + ')"></i>' +
            '                <h5>Stream graph #' + id + '</h5>'+
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
        '                <hr>'+
        '                <h6>Actions</h6>'+
        '                <i class="fa fa-trash" style="cursor:pointer;color:gray;" onclick="deleteGraph(' + id + ')"></i>'+
            '            </div>'+
            ''+
            '        </div>'+
            '        <div class="col-9 h-100">'+
            '            <div class="container-fluid h-100">'+
            '                <div class="row pb-3 h-100">'+
            '                    <div id="o-container-chart-' + id + '" class="o-graph-container col h-100 p-3">'+
        ' <i id="o-graph-container-control-' + id + '" class="control fa fa-bars" onclick="openControls(' + id + ')"></i>' +
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
            '</div>'+
        ''+
        '</div>';

}


function getSankeyGraphString(id){
    return  '<div id="o-graph-' + id + '" class="o-graph o-graph-large">' +
                '<div class="row h-100"> ' +
                    '<div id="controls-' + id + '" class="col-2 h-100">'+
            '            <div class="o-editor  h-100 p-3 w-100">'+
                            ' <i class="control fa fa-bars" onclick="closeControls(' + id + ')"></i>' +
            '                <h5>Sankey graph #' + id + '</h5>'+
            '                <hr>'+
            '                <h6>Category</h6>'+
            '                <select style="max-width:100%;" id="selectorList1-' + id + '" onchange="selectorChanged(' + id + ', this, 1)">'+
            '                </select>'+
            '                <hr>'+
        '                <hr>'+
        '                <h6>Actions</h6>'+
        '                <i class="fa fa-trash" style="cursor:pointer;color:gray;" onclick="deleteGraph(' + id + ')"></i>'+
            '            </div>'+
            '        </div>'+
            '        <div id="o-graph-container-' + id + '" class="col-10 h-100 o-graph-container">'+
                        ' <i id="o-graph-container-control-' + id + '" class="control fa fa-bars" onclick="openControls(' + id + ')"></i>' +
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


function doStuff(){
    let subjects = ["Totaal energiedragers", "Totaal kool en koolproducten", "Steenkool en bruinkool", "Totaal steenkool", "Antraciet", "Cokeskool", "Ketelkolen", "Bruinkool", "Totaal koolproducten", "Cokesovencokes", "Bruinkoolbriketten", "Steenkoolbriketten", "Steenkoolteer", "Gasfabriekgas", "Cokesovengas", "Hoogovengas", "Totaal aardoliegrondstoffen en producten", "Totaal aardoliegrondstoffen", "Ruwe aardolie", "Aardgascondensaat", "Additieven", "Overige aardoliegrondstoffen", "Totaal aardolieproducten", "Restgassen uit olie", "Lpg", "Nafta", "Motorbenzine", "Jetfuel op benzinebasis", "Vliegtuigbenzine", "Vliegtuigkerosine", "Overige kerosine (petroleum)", "Gas-, dieselolie en lichte stookolie", "Zware stookolie", "Terpentine en speciale benzine", "Smeermiddelen", "Bitumen", "Minerale wassen", "Petroleumcokes", "Overige aardolieproducten", "Aardgas", "Hernieuwbare energie", "Waterkracht", "Totaal windenergie", "Windenergie op land", "Windenergie op zee", "Totaal zonne-energie", "Zonnewarmte", "Zonnestroom", "Aardwarmte", "Omgevingsenergie", "Totaal biomassa", "Hernieuwbaar huishoudelijk afval", "Vaste en vloeibare biomassa", "Biogas", "Elektriciteit", "Warmte", "Totaal overige energiedragers", "Kernenergie", "Niet biogeen huish. afval en reststoom", "Energie uit overige bronnen"];
    // stringbuilder
    let sb = "";

    for (let subject in subjects){
        sb += "\"" + subjects[subject] + "\"\n";
    }

    // console.log(sb);

}

let hierarchy = { "Totaal energiedragers" :
    {
        "Totaal kool en koolproducten" :
            {
                "Steenkool en bruinkool" : {
                    "Totaal steenkool" : {
                        "Antraciet": {},
                        "Cokeskool" : {},
                        "Ketelkolen" : {},
                    },

                    "Bruinkool" : {}
                },
                "Totaal koolproducten" : {
                    "Cokesovencokes" : {},
                    "Bruinkoolbriketten" : {},
                    "Steenkoolbriketten" : {},
                    "Steenkoolteer" : {},
                    "Gasfabriekgas" : {},
                    "Cokesovengas" : {},
                    "Hoogovengas" : {},
                }
            },
        "Totaal aardoliegrondstoffen en producten" : {
            "Totaal aardolieproducten" : {
                "Restgassen uit olie": {},
                "Lpg": {},
                "Nafta": {},
                "Motorbenzine": {},
                "Jetfuel op benzinebasis": {},
                "Vliegtuigbenzine": {},
                "Vliegtuigkerosine": {},
                "Overige kerosine (petroleum)": {},
                "Gas-, dieselolie en lichte stookolie": {},
                "Zware stookolie": {},
                "Terpentine en speciale benzine": {},
                "Smeermiddelen": {},
                "Bitumen": {},
                "Minerale wassen": {},
                "Petroleumcokes": {},
                "Overige aardolieproducten": {}
            },
            "Totaal aardoliegrondstoffen" : {
                "Ruwe aardolie" : {},
                "Aardgascondensaat" : {},
                "Additieven" : {},
                "Overige aardoliegrondstoffen" : {}
            }
        },
        "Aardgas" : {},
        "Hernieuwbare energie" : {
            "Waterkracht" : {},
            "Totaal windenergie" : {
            "Windenergie op land" : {},
            "Windenergie op zee" : {}
            },
            "Totaal zonne-energie" : {
                "Zonnewarmte" : {},
                "Zonnestroom" : {}
            },
            "Aardwarmte" : {},
            "Omgevingsenergie" : {},
            "Totaal biomassa" : {
            "Hernieuwbaar huishoudelijk afval" : {},
            "Vaste en vloeibare biomassa" : {},
            "Biogas" : {},
            }
        },
        "Elektriciteit" : {},
        "Warmte" : {},
        "Totaal overige energiedragers" : {
            "Kernenergie" : {},
            "Niet biogeen huish. afval en reststoom" : {},
            "Energie uit overige bronnen" : {},
        }
    }
};

console.log("Hierarchy:");
console.log(hierarchy);

function getElementsOfHierarchy(hierarchy){
    let elements = [];

    if (Object.keys(hierarchy).length > 0){
        for (let key in hierarchy){
            elements.push(key);
            let childKeys = getElementsOfHierarchy(hierarchy[key]);
            for (let key in childKeys){
                elements.push(childKeys[key]);
            }
        }
    }

    return elements;
}

// console.log(getElementsOfHierarchy(hierarchy));

function getSubHierarchy(hierarchy, key){
    if (hierarchy[key].length !== 0){
        return hierarchy[key];
    }
}