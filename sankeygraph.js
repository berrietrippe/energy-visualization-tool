
/**
 * SankeyGraph class used to represent a graph in our application
 */
class SankeyGraph {
    constructor(id, title, selectors, other_selector, data){

        // auto increment iets
        if (id == null){
            id = GRAPHCOUNT;
            GRAPHCOUNT++;
        }

        // set variables
        this.id = id;

        // if no title specified, create a title
        if (title == null) {
            this.getNewTitle();
        }

        this.title = title;
        this.data = data;
        this.possibleSelectors = selectors.reverse();
        this.selector = this.possibleSelectors[0];
        this.selectors = [this.selector];

        this.otherPossibleSelectors = other_selector;
        this.otherSelector = this.otherPossibleSelectors[0];

        let elements = getElementsOfHierarchy(hierarchy);
        this.colorList = {};
        for (let i in elements){
            this.colorList[elements[i]] = getRandomColor(i);
        };

        this.setSelector(this.selector);

        this.setupData();
        this.updateGraphSelectorList();
        updateSelectorList(this.id, this.otherPossibleSelectors, 1)
    }

    setupData(){
        this.parsedData = {};
        let elements = getElementsOfHierarchy(hierarchy);

        this.parsedData = {
            nodes : [],
            links : []
        };

        let data = this.data[this.otherSelector];

        for (let key in elements){
            if (data[this.selector][elements[key]] > 0){
                this.parsedData.nodes.push({ id : elements[key], color : this.colorList[elements[key]]});
            }
        }

        this.parsedData.links = computeLinks(hierarchy, data[this.selector]);

        console.log(this.parsedData);

        let graph = this;

        // setup chart
        graph.setupGraph(
            this.parsedData,
            graph.topics,
            "#o-chart-" + graph.id);
        // showTable("#o-data-table-1", parsedData);
    }

    setSelector(value){
        this.selector = value - 1946;
    }

    selectorCallback(selectorValue, extra = null){
        console.log(extra);
        if (extra != null){
            this.otherSelector = this.otherPossibleSelectors[selectorValue];
        } else {
            this.selector = 2017 - 1946 - selectorValue;
        }
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
     * @param data
     * @param topics
     * @param selector
     */
    setupGraph(data, topics, selector) {
        let svgWidth = $(selector).width();
        let svgHeight = $(selector).height();
        let margin = { top: 40, right: 230, bottom: 30, left: 20 };
        let width = svgWidth - margin.left - margin.right;
        let height = svgHeight - margin.top - margin.bottom;

        const sankey = d3.sankey()
            .size([width, height])
            .nodeId(d => d.id)
            .nodeWidth(20)
            .nodePadding(10)
            .nodeAlign(d3.sankeyCenter);


        let graph = sankey(data);

        this.svg = d3.select(selector)
            .attr("width", width)
            .attr("height", height);

        this.g = this.svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        this.svg.append("text")
            .attr("x", (svgWidth/ 2))
            .attr("y", (margin.top / 2))
            .attr("text-anchor", "middle")
            .attr("fill", "#000")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(this.title);

        let links = this.g.append("g")
            .classed("links", true)
            .selectAll("path")
            .data(graph.links)
            .enter()
            .append("path")
            .classed("link", true)
            .attr("d", d3.sankeyLinkHorizontal())
            .attr("fill", "none")
            .attr("stroke", d => d.target.color)
            .attr("stroke-width", d => d.width)
            .attr("opacity", 0.6)
            .attr("stoke-opacity", 1);

        let nodes = this.g.append("g")
            .classed("nodes", true)
            .selectAll("rect")
            .data(graph.nodes)
            .enter()
            .append("rect")
            .classed("node", true)
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("fill", d => d.color)
            .attr("opacity", 1);

        // add in the title for the nodes
        let text = this.g.append("g")
            .selectAll("text")
            .data(graph.nodes)
            .enter().append("text")
            .attr("x", d => d.x0 + (d.x1 - d.x0) + 10)
            .attr("y", function(d) {
                return d.y0 + (d.y1 - d.y0)/2 ; })
            .attr("transform", null)
            .attr("dy", ".35em")
            .text(function(d) {
                if (d.value > 0){
                    return d.id;
                    }

            })
            .filter(function(d) { return d.x < width / 2; })
            .attr("x", d => d.x0)
            .attr("text-anchor", "start");
    }

    updateGraphSelectorList(){
        updateSelectorList(this.id, this.possibleSelectors)
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

function computeLink1s(hierarchy, data){
    let links = [];

    links.push({
        source: "Totaal Kool en Koolproducten", target: "Totaal koolproducten", value: 5.3
    });


}

function computeLinks(hierarchy, data){
    let links = [];

    if (Object.keys(hierarchy).length > 0){
        for (let key in hierarchy){
            if (Object.keys(hierarchy[key]).length > 0){
                let sourceValue = data[key];
                if (sourceValue > 0) {
                    for (let subkey in hierarchy[key]){
                        let targetValue = data[subkey];
                        if (targetValue > 0 && sourceValue > 0) {
                            let newLink = {
                                source: "",
                                target: "",
                                value: ""
                            };
                            newLink.source = key;
                            newLink.target = subkey;
                            newLink.value = targetValue;
                            links.push(newLink);
                        }
                    }
                    let childLinks = computeLinks(hierarchy[key], data);
                    links.push.apply(links, childLinks);
                }
            }
        }
    }

    return links;
}

function getNewSankeyGraph(){

    let selectors =
            ["1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];

    let other_selector = [
        "Totaal energieverbruik",
        "Winning",
        "Invoer",
        "Uitvoer",
        "Invoersaldo",
        "Bunkering",
    ];

    let graph = new SankeyGraph(
        null,
        "Flow",
        selectors,
        other_selector,
        extendedData
    );

    return graph;
}

