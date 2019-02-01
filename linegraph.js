
/**
 * LineGraph class used to represent a graph in our application
 */
class LineGraph {
    constructor(id, title, data, selectors, topics, xAxisId){

        // auto increment iets
        if (id == null){
            id = GRAPHCOUNT;
            GRAPHCOUNT++;
        }

        this.data = data;

        // set variables
        this.id = id;
        if (selectors == null){
            this.possibleSelectors = getUniqueSelectors(this.data, ["Energiedragers"]);
            selectors = this.possibleSelectors;
        } else {
            this.possibleSelectors = selectors;
        }

        this.selectors = [this.possibleSelectors[0]];

        console.log(this.possibleSelectors);

        this.topics = topics;
        this.xAxis = xAxisId;
        this.possibleSelectors = selectors;

        // if no title specified, create a title
        if (title == null) {
            this.getNewTitle();
        }

        this.title = title;
        this.parsedData = null;

        this.setupData();
        this.updateGraphTopicList();
        this.updateGraphSelectorList();
    }

    setupData(){
        let topicList = [];
        for (let i = 0; i < this.topics.length; i++){
            topicList.push(this.topics[i].name);
        }
        let graph = this;

        this.parsedData = parseData(this.data, graph.selectors);

        let maxValue = getMaxVal(this.parsedData, 2, topicList);
        let minValue = getMinVal(this.parsedData, 2, topicList);


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
     * Draws a graph for this LineGraph
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
        let margin = { top: 40, right: 30, bottom: 30, left: 70 };
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
            .text(this.title);

        this.g = this.svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear()
            .domain([minValue, maxValue])
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

        this.svg.append("rect")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            // when the mouse enters the canvas, show the line
            .on("mouseover", function() {
                d3.select(".mouse-line")
                    .style("opacity", "1");
            })
            // remove the line when leaving canvas
            .on("mouseout", function() {
                d3.select(".mouse-line")
                    .style("opacity", "0");

            })
            .on("mousemove", function() {
                let mouse = d3.mouse(this);
                d3.select(".mouse-line")
                    .attr("d", function() {
                        let d = "M" + mouse[0] + "," + height;
                        d += " " + mouse[0] + "," + 0;
                        return d;
                    });

                // console.log(x.invert(d3.mouse(this)[0]))
            });

        this.g.append("path") // this is the black vertical line to follow mouse
            .attr("class", "mouse-line")
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .style("opacity", "0");

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
            .datum(this.parsedData)
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
                title += "";
            }
        } else {
            title += "graph";
            title += this.id;
        }

        return title;
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

    setArea(area){
        this.area = area;
    }

    setAreaPath(areaPath){
        this.areaPath = areaPath;
    }
}

function getNewLineGraph(){
    let topics = [];

    let titles = ["Perioden",
        // "Totaal aanbod",
        "Winning",
        "Totaal energieverbruik",
        "Invoer",
        "Uitvoer",
        "Invoersaldo",
        "Bunkering",
        // "Energieaanbod/Voorraadmutatie (PJ)","Statistische verschillen (PJ)",
        // "Energieomzetting/Inzet energie voor omzetting/Totaal inzet (PJ)","Energieomzetting/Inzet energie voor omzetting/Inzet elektriciteit/WKK-omzetting (PJ)","Energieomzetting/Inzet energie voor omzetting/Inzet andere omzetting (PJ)","Energieomzetting/Productie energie uit omzetting/Totaal productie (PJ)","Energieomzetting/Productie energie uit omzetting/Productie elektriciteit/WKK-omzetting (PJ)","Energieomzetting/Productie energie uit omzetting/Productie andere omzetting (PJ)","Energieomzetting/Saldo inzet-productie energie/Totaal saldo energieomzetting (PJ)","Energieomzetting/Saldo inzet-productie energie/Saldo elektriciteit/WKK-omzetting (PJ)","Energieomzetting/Saldo inzet-productie energie/Saldo andere omzetting (PJ)","Eigen verbruik energiesector/Totaal (PJ)","Eigen verbruik energiesector/Olie- en gaswinning (PJ)","Eigen verbruik energiesector/Cokesfabrieken (PJ)","Eigen verbruik energiesector/Raffinaderijen (PJ)","Eigen verbruik energiesector/Totaal energiebedrijven (PJ)","Verliezen bij distributie (PJ)","Finaal verbruik/Totaal finaal verbruik (PJ)","Finaal verbruik/Finaal energieverbruik/Totaal (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Totaal (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/IJzer- en staalindustrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Chemie en farmaceutische industrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Non-ferrometalenindustrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Bouwmaterialenindustrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Transportmiddelenindustrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Metaalproducten en machine-industrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Delfstoffenwinning (geen olie en gas) (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Voedings- en genotmiddelenindustrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Papier- en grafische industrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Houtindustrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Bouwnijverheid (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Textiel-, kleding- en lederindustrie (PJ)","Finaal verbruik/Finaal energieverbruik/Nijverheid (exclusief de energiesector)/Onbekend (PJ)","Finaal verbruik/Finaal energieverbruik/Vervoer/Totaal (PJ)","Finaal verbruik/Finaal energieverbruik/Vervoer/Binnenlandse luchtvaart (PJ)","Finaal verbruik/Finaal energieverbruik/Vervoer/Wegverkeer (PJ)","Finaal verbruik/Finaal energieverbruik/Vervoer/Railverkeer (PJ)","Finaal verbruik/Finaal energieverbruik/Vervoer/Pijpleidingen (PJ)","Finaal verbruik/Finaal energieverbruik/Vervoer/Binnenlandse scheepvaart (PJ)","Finaal verbruik/Finaal energieverbruik/Vervoer/Onbekend (PJ)","Finaal verbruik/Finaal energieverbruik/Overige afnemers/Totaal (PJ)","Finaal verbruik/Finaal energieverbruik/Overige afnemers/Diensten, afval, water en reparatie (PJ)","Finaal verbruik/Finaal energieverbruik/Overige afnemers/Woningen (PJ)","Finaal verbruik/Finaal energieverbruik/Overige afnemers/Landbouw (PJ)","Finaal verbruik/Finaal energieverbruik/Overige afnemers/Visserij (PJ)","Finaal verbruik/Finaal energieverbruik/Overige afnemers/Onbekend (PJ)","Finaal verbruik/Niet-energetisch gebruik/Totaal (PJ)","Finaal verbruik/Niet-energetisch gebruik/Nijverheid (exclusief de energiesector) (PJ)","Finaal verbruik/Niet-energetisch gebruik/Waarvan chemie en petrochemie (PJ)","Finaal verbruik/Niet-energetisch gebruik/Vervoer (PJ)","Finaal verbruik/Niet-energetisch gebruik/Overige afnemers (PJ)"
    ];

    for (let i = 0; i < titles.length; i++){
        topics.push(new Topic(titles[i], i <= 2, getRandomColor(i)));
    }

    let graph = new LineGraph(
        null,
        "Totaal energiedragers",
        lineData,
        // "data/Energiebalans__aanbod__verbruik_29012019_145811.csv",
        null,
        topics,
        1
    );

    return graph;
}
