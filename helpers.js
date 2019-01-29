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
    console.log(arr);
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
                // return array
                let arr = {};

                for (let key in row){
                    let value = row[key];
                    // if date
                    if (key === "Perioden"){
                        value = new Date(value);
                    } else {
                        if (!isNaN(value)){
                            // if it is a number
                            value = Math.round(row[key]);
                        } else if (value === "       ."){
                            value = 0;
                        } else if (typeof value === 'string' || value instanceof String){
                            // if it is a string
                        } else if (isNaN(value)){
                            value = 0;
                        } else {
                            value = null;
                        }
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
 */
function updateTopicList(graphId, topics, xAxis){
    for (let i = xAxis; i < topics.length; i++){
        let checked = "";
        if (topics[i].isSelected()){
            checked = "checked";
        }

        $("#topicList-" + graphId).append("<li><input type='checkbox' " + checked + " onclick='updateTopics(" + graphId + "," + i + ")'></input>" + topics[i].name + "<div class='c-bullet' style='background-color: " + topics[i].color + ";'> </div></li>");

    }
}

function updateSelectorList(graphId, selectors){
    for (let i = 0; i < selectors.length; i++){
        $("#selectorList-" + graphId).append("<option value=" + i + ">" + selectors[i] + "</option>");
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
function getRandomColor(i){
    let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#00B3E6',
        '#e65cbe', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#85e6aa', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#b39113', '#00E680',
        '#4D8066', '#809980', '#24ff58', '#1AFF33', '#999933',
        '#FF3380', '#83cc11', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    return colorArray[i%colorArray.length];
}

function setFileSource(id, path_to_csv){
    $("#o-filename-" + id).html(path_to_csv);
}

function selectorChanged(id, selector){
    graphs[id].selectorCallback(selector.options[selector.selectedIndex].value);

}
