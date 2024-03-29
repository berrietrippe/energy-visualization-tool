
/**
 * StreamGraph class used to represent a graph in our application
 */
class StreamGraph {
    constructor(id, selection, title, data, selectors, topics, xAxisId){

        // auto increment iets
        if (id == null){
            id = GRAPHCOUNT;
            GRAPHCOUNT++;
        }

        // set variables
        this.id = id;
        this.selectors = [selectors[0]];
        this.topics = topics;
        this.xAxis = xAxisId;
        this.possibleSelectors = selectors;

        // if no title specified, create a title
        if (title == null) {
            this.getNewTitle();
        }

        this.selection = selection;
        this.title = title;
        this.data = data;
        console.log(this.data);
        this.parsedData = this.data[this.selectors[0]];

        this.setupData();
        this.updateGraphTopicList();
        this.updateGraphSelectorList();
    }

    setupData(){
        let topicList = [];
        for (let i = 0; i < this.topics.length; i++) {
            topicList.push(this.topics[i].name);
        }

        let graph = this;
        this.parsedData = this.data[this.selectors[0]];

        let maxValue = getMaxVal(this.parsedData, 2, topicList);
        let minValue = getMinVal(this.parsedData, 2, topicList);

        // graph.possibleSelectors = getUniqueSelectors(data, ["Energiedragers"]);

        // setup chart
        graph.setupGraph(
            this.parsedData,
            graph.topics,
            "#o-chart-" + graph.id,
            minValue,
            maxValue,
            graph.xAxis);
        graph.showAllSelectedTopics();
        // showTable("#o-data-table-1", parsedData);
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

    selectorCallback(selectorValue){
        let arr = [this.possibleSelectors[selectorValue]];
        this.selectors = arr;
        this.redrawGraph();
    }

    redrawGraph(){
        if (this.svg != null){
            this.svg.selectAll("*").remove();
        }
        this.title = this.getNewTitle();
        this.setupData();
    }

    /**
     * Draws a graph for this StreamGraph
     * @param title
     * @param data
     * @param topics
     * @param selector
     * @param maxValue
     * @param xAxis
     */
    setupGraph(data, topics, selector, minValue, maxValue, xAxis) {
        // Get the dimensions of the SVG
        let svgWidth = $(selector).width();
        let svgHeight = $(selector).height();
        let margin = { top: 40, right: 50, bottom: 30, left: 50 };
        let width = svgWidth - margin.left - margin.right;
        let height = svgHeight - margin.top - margin.bottom;
        this.height = height;
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
            .text(this.title);

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
                    return y(d[topics[i].name]);
                })
                .curve(d3.curveMonotoneX);

            topics[i].setLine(line);

            // define the area
            let area = d3.area()
                .x(function(d) { return x(d.Perioden); })
                .y0(height)
                .y1(function(d) {
                    return y(d[topics[i].name]);
                });

            topics[i].setArea(area);
        }

        let minDate = new Date("" + this.selection.from);
        let maxDate = new Date("" + this.selection.to);

        x.domain(d3.extent(data, function(d) {
            if (d.Perioden < minDate) {
                return minDate;
            } else if (d.Perioden > maxDate){
                return maxDate;
            } else {
                return d.Perioden;
            }
        }));

        this.g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain");
        // .remove();

        this.g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Energy (PJ)");

        this.g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate( " + width + ", 0 )")
            .call(d3.axisRight(y))

    }

    showAllSelectedTopics() {
        for (let i = this.topics.length - 1; i >= this.xAxis; i = i - 1) {
            // for (let i = 0; i < this.topics.length; i++) {
            if (this.topics[i].isSelected()) {
                this.showLine(i);
            }
        }
    }
    showLine(topicId){
        let minDate = new Date("" + this.selection.from);
        let maxDate = new Date("" + this.selection.to);
        let topic = this.topics[topicId];
        // topic.setPath(this.g.append("path")
        //     .datum(this.parsedData)
        //     .attr("fill", "none")
        //     .attr("stroke", topic.color)
        //     .attr("stroke-linejoin", "round")
        //     .attr("stroke-linecap", "round")
        //     .attr("stroke-width", 1.5)
        //     .attr("d", topic.line)); // apply smoothing to the line);

        // add the area
        topic.setAreaPath(this.g.append("path")
            .data([this.parsedData.filter(function(d){
                return d.Perioden >= minDate && d.Perioden <= maxDate;
            })])
            .attr("class", "area")
            .attr("fill", topic.color)
            .attr("d", topic.area)

            .attr("transform",
                "translate(0," + this.height+ ") scale(1,-1)"
            )
        );
        addConsoleMessage("Line for '" + topic.name + "' category added <div class='c-bullet' style='background-color:" + topic.color + ";'></div>");
    }

    removeLine(topicId){
        let topic = this.topics[topicId];
        // topic.path.remove();
        topic.areaPath.remove();
        addConsoleMessage("Line for '" + topic.name + "' category removed");
    }

    updateGraphTopicList(){
        updateTopicList(this.id, this.topics, this.xAxis, false);
    }

    updateGraphSelectorList(){
        updateSelectorList(this.id, this.possibleSelectors)
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

    getNewTitle() {
        let title = "";
        if (this.selectors.length > 0){
            for (let i = 0; i < this.selectors.length; i++){
                title += this.selectors[i];
                title += ", normalized";
            }
        } else {
            title += "graph";
            title += this.id;
        }

        return title;
    }

}

function getNewStreamGraph(selection){
    let topics = [];

    let titles = [
        "Totaal kool en koolproducten",
        "Totaal aardoliegrondstoffen en producten",
        "Aardgas",
        "Hernieuwbare energie",
        "Elektriciteit",
        "Warmte",
        "Totaal overige energiedragers"
    ];

    for (let i = 0; i < titles.length; i++){
        topics.push(new Topic(titles[i], true, getRandomColor(i)));
    }

    let selectors = [
        "Totaal energieverbruik",
        "Winning",
        "Invoer",
        "Uitvoer",
        "Bunkering",
    ];

    let graph = new StreamGraph(
        null,
        selection,
        "Totaal energieverbruik, normalized",
        streamData,
        // "data/Energiebalans__aanbod__verbruik_29012019_145811.csv",
        selectors,
        topics,
        0
    );

    return graph;
}

