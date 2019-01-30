
let graphs = [];

let GRAPHCOUNT = 0;

// let CSV_PATH = "data/test.csv";
let CSV_PATH = "data/Energiebalans__aanbod__verbruik_29012019_213919.csv";

let streamData = null;
let lineData = null

$(document).ready(function(){
    // Parse the data first
    setupData()
});


function setupData(){
    d3.csv(CSV_PATH, function(data){
        parseLineData(data);
        parseStreamData(data);
        console.log("linedata:");
        console.log(lineData);
        console.log("streamdata:");
        console.log(streamData);
        dataSetupCompleted();
    });
}

function dataSetupCompleted(){
    addStreamGraph();
    addExtendedLineGraph();
    addLineGraph();
}