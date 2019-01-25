
let graphs = [];

/**
 * Graph class used to represent a graph in our application
 */
class Graph {
    constructor(id, path_to_csv, topics, xAxisId){
        this.id = id;
        this.path_to_csv = path_to_csv;
        this.topics = topics;
        this.xAxis = xAxisId;
    }

    setupData(){
        let id = this.id;
        let xAxis = this.xAxis;

        let topicList = [];
        for (let i = 0; i < this.topics.length; i++){
                topicList.push(this.topics[i].name);
        }
        let graph = this;
        let topics = this.topics;
        d3.csv(this.path_to_csv, function(data){
            let parsedData = parseData(data, topicList);
            graph.setData(parsedData);
            let maxValue = getMaxVal(parsedData, 2, topicList);
            graph.setupChart(parsedData, topics, "#o-chart-" + id, maxValue, xAxis);
            graph.showAllSelectedTopics();
            showTable("#o-data-table-1", parsedData);
        });
    }

    getId() {
        return this.id;
    }

    getPathToCSV(){
        return this.path_to_csv;
    }

    getSelectedTopics(){
        return this.selectedTopics;
    }

    setData(data){
        this.data = data;
    }

    setPathToCSV(path_to_csv){
        this.path_to_csv = path_to_csv;
    }

    setTopics(topics){
        this.topics = topics;
    }

    setSelectedTopics(topics){
        this.selectedTopics = topics;
    }

    setXAxis(xAxis){
        this.xAxis = xAxis;
    }

    /**
     *
     * @param data
     * @param topics
     * @param selector
     * @param maxValue
     * @param xAxis
     */
    setupChart(data, topics, selector, maxValue, xAxis) {
        // Get the dimensions of the SVG
        let svgWidth = $(selector).width();
        let svgHeight = $(selector).height();
        let margin = { top: 40, right: 20, bottom: 30, left: 50 };
        let width = svgWidth - margin.left - margin.right;
        let height = svgHeight - margin.top - margin.bottom;
        // var svgWidth = 1000, svgHeight = 600;
        this.svg = d3.select(selector)
            .attr("width", width)
            .attr("height", height);

        this.svg.append("text")
            .attr("x", (svgWidth/ 2))
            .attr("y", (margin.top / 2))
            .attr("text-anchor", "middle")
            .attr("fill", "#000")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Dutch national energy statistics");

        this.g = this.svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear()
            .domain([0, maxValue])
            .range([height, 0]);


        for (let i = xAxis; i < topics.length; i++){
            // y.domain(d3.extent(data, function(d) { return d.value }));
            let line = d3.line()
                .x(function(d) {
                    return x(d.Perioden);
                })
                .y(function(d) {
                    return y(d[topics[i].name])
                })
                .curve(d3.curveMonotoneX);

            topics[i].setLine(line);
        }

        x.domain(d3.extent(data, function(d) {
            return d.Perioden}));

        this.g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain");
        // .remove();

        this.g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Energy (PJ)");
    }

    showAllSelectedTopics(){
        for (let i = this.xAxis; i < this.topics.length; i++) {
            if (this.topics[i].isSelected()){
                this.showLine(i);
            }
        }
    }

    showLine(topicId){
        let topic = this.topics[topicId];
        topic.setPath(this.g.append("path")
            .datum(this.data)
            .attr("fill", "none")
            .attr("stroke", topic.color)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", topic.line)); // apply smoothing to the line);
        addConsoleMessage("Line for '" + topic.name + "' category added <div class='c-bullet' style='background-color:" + topic.color + ";'></div>");
    }

    removeLine(topicId){
        let topic = this.topics[topicId];
        topic.path.remove();
        addConsoleMessage("Line for '" + topic.name + "' category removed");
    }

    updateGraphTopicList(){
        updateTopicList(this.id, this.topics, this.xAxis);
    }

    topicCallback(topicId){
        let topic = this.topics[topicId];
        let selected = topic.selected;
        if (selected){
            this.removeLine(topicId);
        } else {
            this.showLine(topicId);
        }
        this.topics[topicId].switchSelected();
    }


}

/**
 * Topic class
 */
class Topic {
    constructor(name, selected, color){
        this.name = name;
        this.selected = selected;
        this.color = color;
    }

    isSelected(){
        return this.selected;
    }

    setSelected(state){
        this.selected = state;
    }

    switchSelected(){
        let state = this.selected;
        state = !state;
        this.setSelected(state);
    }

    setLine(line){
        this.line = line;
    }

    setPath(path){
        this.path = path;
    }
}

// Add the first graph
let totalGraph = new Graph(
    0,
    "data/Energiebalans__aanbod__verbruik_25012019_115042.csv",
    [
        new Topic("Perioden", true, "red"),
        new Topic("Winning", true, "steelblue"),
        new Topic("Invoer", false, "brown"),
        new Topic("Uitvoer", false, "green"),
        new Topic("Energieverbruik", false, "orange")
    ],
    1
);

totalGraph.setupData();
totalGraph.updateGraphTopicList();

graphs.push(totalGraph);

addConsoleMessage("Succesfully set-up graph!");
