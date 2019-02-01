
let graphs = [];

let bar = $("#graphAdder");

let GRAPHCOUNT = 0;

// let CSV_PATH = "data/test.csv";
let CSV_PATH = "data/Energiebalans__aanbod__verbruik_29012019_213919.csv";

let lineData = null;
let extendedData = null;
let streamData = null;

$(document).ready(function(){
    // Parse the data first
    setupData()
});

function setupData(){
    d3.csv(CSV_PATH, function(data){
        parseLineData(data);
        extendedData = parseExtendedData(data);
        streamData = parseStreamData(data);
        console.log(lineData);
        console.log(extendedData);
        console.log(streamData);
        dataSetupCompleted();
    });

    doStuff();
}

function dataSetupCompleted(){
    // addExtendedLineGraph();
    // addStreamGraph();
    addLineGraph();
    // addSankeyGraph();
}

