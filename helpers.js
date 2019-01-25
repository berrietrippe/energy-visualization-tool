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
    console.log(data);
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
        value = Math.round(row[keys[i]]);
        entry[keys[i]] = value;
    }
    return entry;
}

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
                if (value > max){
                    max = value;
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
 *
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

function sayHi(){
    console.log("hi");
}

/**
 *
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
