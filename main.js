

let selections = [];
let graphs = {};

let selectionBar = $("#selectorBar");
let bar = $("#graphAdder");


let SELECTIONCOUNT = 0;
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
    // addLineGraph();
    // addSankeyGraph();
    addSelection();
    addLineGraph(0);
}


class Selection {
    constructor(id){
        // auto increment iets
        if (id == null){
            id = SELECTIONCOUNT;
            SELECTIONCOUNT++;
        }

        this.id = id;
        this.graphs = [];

    }

    addLineGraphToSelection(){
        $("#graphAdder-" + this.id).before(getLineGraphString(GRAPHCOUNT));
        let graph = getNewLineGraph();
        graph.parentSelection = this;
        graphs[graph.id] = graph;
        this.graphs.push(graph.id);
    }

    addExtendedLineGraphToSelection(){
        $("#graphAdder-" + this.id).before(getExtendedLineGraphString(GRAPHCOUNT));
        let graph = getNewExtendedLineGraph();
        graph.parentSelection = this;
        graphs[graph.id] = graph;
        this.graphs.push(graph.id);
    }

    addStreamGraphToSelection(){
        $("#graphAdder-" + this.id).before(getStreamGraphString(GRAPHCOUNT));
        let graph = getNewStreamGraph();
        graph.parentSelection = this;
        graphs[graph.id] = graph;
        this.graphs.push(graph.id);
    }

    addSankeyGraphToSelection(){
        $("#graphAdder-" + this.id).before(getSankeyGraphString(GRAPHCOUNT));
        let graph = getNewSankeyGraph();
        graph.parentSelection = this;
        graphs[graph.id] = graph;
        this.graphs.push(graph.id);
    }

    removeGraph(id){
        this.graphs.splice(id, 1);
    }
}

function addSelection(){
    selectionBar.before(getSelectionString(SELECTIONCOUNT));

    let selection = new Selection(null);

    selections.push(selection);

}

function addLineGraph(id){
    selections[id].addLineGraphToSelection();
}
function addExtendedLineGraph(id){
    selections[id].addExtendedLineGraphToSelection();
}
function addStreamGraph(id){
    selections[id].addStreamGraphToSelection();
}
function addSankeyGraph(id){
    selections[id].addSankeyGraphToSelection();
}

function deleteGraph(id){
    $("#o-graph-" + id).remove();
    graphs[id].parentSelection.removeGraph(id);
    delete graphs[id];
}
