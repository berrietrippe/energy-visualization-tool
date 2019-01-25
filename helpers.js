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
 * @param keys
 * @returns {Array}
 */
function parseData(data, keys){
    let arr = [];

    for (let i = 0; i < data.length; i++){
        arr.push(getValues(data[i], keys));
    }

    return arr;
}

/**
 *
 * @param row
 * @param keys
 */
function getValues(row, keys){
    let entry = {};
    for (let i = 0; i < keys.length; i ++){
        let value = row[keys[i]];
        if (keys[i] == "Perioden"){
        // if (false){
            value = new Date(value);
        } else {
            value = Math.round(row[keys[i]]);
        }
        entry[keys[i]] = value;
    }
    return entry;
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
    let max = 0;

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
 * @param graphId
 * @param topicId
 */
function updateTopics(graphId, topicId){
    let selectedTopics = graphs[graphId].topicCallback(topicId);

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