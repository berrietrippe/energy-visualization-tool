/**
 *
 * @param data
 * @returns {string[]}
 */
function getTopics(data){
    return Object.keys(data[1]);
}

/**
 *
 * @param data
 * @param rowSelectors
 * @returns {Array}
 */
function parseData(data, rowSelectors){
    let arr = [];
    for (let i = 0; i < data.length; i++){
        let newEntry = getValues(data[i], rowSelectors);
        if (newEntry != null){
            arr.push(newEntry);
        }
    }
    return arr;
}

/**
 *
 * @param row
 * @param rowSelectors
 */
function getValues(row, rowSelectors){

    // if row contains any value in rowSelector[]
    for (let i = 0; i < rowSelectors.length; i++){
        for (let entry in row){
            if (row[entry] === rowSelectors[i]){
                // This row contains information we need

                // return array
                let arr = {};

                for (let key in row){
                    let value = row[key];
                    // if date
                    if (key === "Perioden"){
                        value = new Date(value);
                    } else {
                        value = purifyValue(value);
                    }

                    if (value != null){
                        arr[key];
                    }
                    arr[key] = value;
                }
                return arr;
            }
        }
    }
    return null;
}

function purifyValue(value){
    if (!isNaN(value)){
        // if it is a number
        value = Math.round(value);
    } else if (value === "       ."){
        value = 0;
    } else if (typeof value === 'string' || value instanceof String){
        // if it is a string
    } else if (isNaN(value)){
        value = 0;
    } else {
        value = null;
    }
    return value;
}


function parseLineData(data){
    lineData = data;
}

/**
 *
 * @param data
 */
function parseExtendedData(data){
    let container = {};

    let selectors = [
        "Totaal energieverbruik",
        "Winning",
        "Invoer",
        "Uitvoer",
        "Invoersaldo",
        "Bunkering",
    ];

    let titles = [
        "Totaal kool en koolproducten",
        "Totaal aardoliegrondstoffen en producten",
        "Aardgas",
        "Hernieuwbare energie",
        "Windernergie op zee",
        "Omgevingsenergie",
        "Totaal biomassa",
        "Elektriciteit",
        "Warmte",
        "Totaal overige energiedragers"
    ];

    // get a list of all unique selectors
    let uniqueYears = getUniqueSelectors(data, ["Perioden"]);

    for (let j = 0; j < selectors.length; j++){
        container[selectors[j]] = {};

        for (let a = 0; a < uniqueYears.length; a++){
            container[selectors[j]][uniqueYears[a]] = {}
        }
    }

    for (let i = 0; i < data.length; i++){
        let year = data[i]["Perioden"];

        for (let j = 0; j < selectors.length; j++){

            container[selectors[j]][year][data[i]["Energiedragers"]] = data[i][selectors[j]];
        }
    }

    let newData = {};

    for (let i = 0; i < selectors.length; i++){
        newData[selectors[i]] = [];
        for (let year in container[selectors[i]]){
            let entry = {};
            let max = 0;

            for (key in container[selectors[i]][year]){
                entry[key] = purifyValue(container[selectors[i]][year][key]);
                for (let k = 0; k < titles.length; k++){
                    if (key === titles[k]){
                        max = max + entry[key];
                    }
                }
            }

            entry["MAX"] = max;

            entry["Perioden"] = new Date(year);
            newData[selectors[i]].push(entry);
        }
    }

    return newData;
}

function parseStreamData(data){
    let newData = parseExtendedData(data);
    return normalizeData(newData);
}

function normalizeData(data){

    let topics = [
        "Totaal kool en koolproducten",
        "Totaal aardoliegrondstoffen en producten",
        "Aardgas",
        "Hernieuwbare energie",
        "Windernergie op zee",
        "Omgevingsenergie",
        "Totaal biomassa",
        "Elektriciteit",
        "Warmte",
        "Totaal overige energiedragers"
    ];

    topics.reverse();

    console.log(data);
    for (let selector in data){
        for (let i = 0; i < data[selector].length; i++){
            if (!data[selector][i]["Normalized"]){
                let max = data[selector][i]["MAX"];
                let stack = 0;

                for (key in data[selector][i]){
                    for (let k = 0; k < topics.length; k++){
                        if (key === topics[k]){
                            stack += (data[selector][i][key] /max * 100);
                            data[selector][i][key] = stack;
                        }
                    }
                }
                data[selector][i]["Normalized"] = true;
            }
        }
    }


    return data;
}


/**
 *
 * @param topics
 * @param topicsToRemove
 * @returns {Array}
 */
function abstractUnusedTopics(topics, topicsToRemove){
    arr = [];
    for (let i = 0; i < topics.length; i++){
        for (let j = 0; j < topicsToRemove.length; j++){
            if (topics[i].name != topicsToRemove[j]){
                arr.push(topics[i]);
            }
        }
    }
    return arr;
}

/**
 *
 * @param data
 * @param layers
 * @param topics
 * @returns {number}
 */
function getMaxVal(data, layers, topics) {
    let max = Number.MIN_SAFE_INTEGER;

    if (layers > 1) {
        for (let i = 0; i < data.length; i++) {
            let newLayer = layers - 1;
            let newMax = getMaxVal(data[i], newLayer, topics);
            if (newMax > max) {
                max = newMax;
            }
        }
    } else {
        for (let i = 0; i < topics.length; i++){
            let value = data[topics[i]];
            if (!isNaN(value)){
                if (topics[i] != "Perioden"){
                    if (value > max){
                        max = value;
                    }
                }
            }
        }
    }

    return max;
}


/**
 *
 * @param data
 * @param layers
 * @param topics
 * @returns {number}
 */
function getMinVal(data, layers, topics) {
    let min = Number.MAX_SAFE_INTEGER;

    if (layers > 1) {
        for (let i = 0; i < data.length; i++) {
            let newLayer = layers - 1;
            let newMin = getMinVal(data[i], newLayer, topics);
            if (newMin < min) {
                min = newMin;
            }
        }
    } else {
        for (let i = 0; i < topics.length; i++){
            let value = data[topics[i]];
            if (!isNaN(value)){
                if (topics[i] != "Perioden"){
                    if (value < min){
                        min = value;
                    }
                }
            }
        }
    }

    return min;
}


/**
 *
 * @param data
 * @param selectorKeys
 * @returns {Array}
 */
function getUniqueSelectors(data, selectorKeys){
    let arr = [];

    for (let i = 0; i < data.length; i++){
        for (let j = 0; j < selectorKeys.length; j++){
            if (!arr.includes(data[i][selectorKeys[j]])){
                arr.push(data[i][selectorKeys[j]]);
            }
        }
    }
    return arr;
}


/**
 *
 * @param graphId
 * @param topicId
 */
function updateTopics(graphId, topicId){
    graphs[graphId].topicCallback(topicId);
}

/**
 * Updates the list of topics
 * @param graphId
 * @param topics
 * @param xAxis
 * @param checkboxes
 */
function updateTopicList(graphId, topics, xAxis, checkboxes = true){
    for (let i = xAxis; i < topics.length; i++){
        let checked = "";
        if (topics[i].isSelected()){
            checked = "checked";
        }

        let checkboxEnabled = checkboxes? "<input type='checkbox' " + checked + " onclick='updateTopics(" + graphId + "," + i + ")'></input>" : "";
        $("#topicList-" + graphId).append("<li style='word-break:break-word;white-space: normal'>" + checkboxEnabled + topics[i].name + "<div class='c-bullet' style='background-color: " + topics[i].color + ";'> </div></li>");

    }
}

function updateSelectorList(graphId, selectors, extra = ""){
    // $("#selectorList-" + graphId).html(" ");
    for (let i = 0; i < selectors.length; i++){
        $("#selectorList" + extra + "-" + graphId).append("<option value=" + i + ">" + selectors[i] + "</option>");
    }
}

function closeControls(id, expand = false){
    $("#controls-" + id).hide();
    $("#o-graph-container-control-" + id).show();

    if (expand){
        $("#o-col-chart-" + id).addClass("col-12");
        graphs[id].redrawGraph();
    } else {
        let width = $("#controls-" + id).width() - 50;
        $("#o-graph-" + id).css('margin-right',-width+'px');
    }
}

function openControls(id, expand = false){
    $("#controls-" + id).show();
    $("#o-graph-container-control-" + id).hide();

    if (expand){
        $("#o-col-chart-" + id).removeClass("col-12");
        graphs[id].redrawGraph();
    } else {
        $("#o-graph-" + id).css('margin-right', 0 + 'px');
    }
}
// says hi :)
function sayHi(){
    console.log("hi");
}

/**
 * First drawChart
 * @param data
 */
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

/**
 * Adds data to a table
 * @param selector
 * @param data
 */
function showTable(selector, data){

    let table = $(selector);
    let sb = "<thead>";
    sb += "<tr>";
    for (let key in data[0]){
        sb += "<th scope='col'>" + key + "</th>";
    }
    sb += "</tr>";
    sb += "</thead>";
    sb += "<tbody>";

    for (let i = 0; i < data.length; i++){
        sb += "<tr>";
        let j = 0;
        for (let key in data[i]){
            let cell = "td";
            if (j == 0){
                cell = "th scope='row'";
            }
            sb += "<" + cell + ">";

            if (j == 0) {
                sb += data[i][key].getFullYear();
            } else {
                sb += data[i][key];
            }

            sb += "</" + cell + ">";
            j++;
        }
        sb += "</tr>";
    }


    sb += "</tbody>";

    table.append(sb);
}

/**
 * Adds a simple message to the console output
 * @param message, to be added to the console
 */
function addConsoleMessage(message){
    let console = $("#o-console");
    let d = new Date();
    let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
    let content = console.html();
    content = message + "<br>" + content;
    content = "<span> > "  + datestring + ":</span><br>" + content;
    console.html(content);
}

/**
 * Returns a color from a list
 * @param i index
 * @returns {string}
 */
function getRandomColor(i = null){
    i = Math.ceil(i);
    if (i == null){
        i = Math.floor(Math.random() * 100);
    }
    let colorArray = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    return colorArray[i%colorArray.length];
}

function getD3Color(name){
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    return name => color(name.replace(/ .*/, ""));
}

function setFileSource(id, path_to_csv){
    $("#o-filename-" + id).html(path_to_csv);
}

function selectorChanged(id, selector, extra = 0){
    console.log(graphs);
    console.log(id);
    if (extra == 1){
        graphs[id].selectorCallback(selector.options[selector.selectedIndex].value, extra);
    } else {
        graphs[id].selectorCallback(selector.options[selector.selectedIndex].value);
    }

}

function updateRangeSelector(element, id, fromTo){
    selections[id].updateRange(fromTo, element.value);
}