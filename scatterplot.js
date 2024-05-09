// **** Your JavaScript code goes here ****
d3.csv("./NetflixOriginals.csv").then(function(dataset) {
    var group = d3.select("svg").selectAll("#movie").data(dataset).enter().append("g").attr("class", "movie");
    group.attr("transform", function (d) {
        var x = scaleDate(new Date(d.Premiere));
        var y = scaleIMDB(d['IMDB Score']);
        return "translate(" + x + ", " + y + ")";
    });
    group.insert("circle").attr("r", 3.5).style("opacity", function (d) {
        return d['IMDB Score'] / 15;
    }).style("fill", "blue").on("mouseover", function (d){
        d3.select(this).transition().style("opacity", 1);
    }).on("mouseout", function (d){
        d3.select(this).transition().style("opacity", function(d) {
            return d['IMDB Score'] / 15;
        });
    });
    group.insert("text").attr("class", "name").text(function (d) {
        return d.Title;
    }).attr("transform", "translate(0, -8)");
    var page = d3.select("svg");
    page.append('text').attr("class", "title").attr("transform", "translate(800, 150)").text('Legend:');
    page.append("circle").attr("r", 7).attr("cx", 750).attr("cy", 170).style("fill", "blue").style("opacity", 0.3);
    page.append("text").attr("class", "title").attr("transform", "translate(820, 174)").text("IMDB Score < 4");
    page.append("circle").attr("r", 7).attr("cx", 750).attr("cy", 190).style("fill", "blue").style("opacity", 0.5);
    page.append("text").attr("class", "title").attr("transform", "translate(830, 196)").text("4 < IMDB Score < 6");
    page.append("circle").attr("r", 7).attr("cx", 750).attr("cy", 210).style("fill", "blue").style("opacity", 0.7);
    page.append("text").attr("class", "title").attr("transform", "translate(820, 216)").text("6 < IMDB Score");
});


// **** Functions to call for scaled values ****

function scaleDate(date) {
    return dateScale(date);
}

function scaleIMDB(imdb) {
    return imdbScale(imdb);
}

// **** Code for creating scales, axes and labels ****

var dateScale = d3.scaleTime()
    .domain([new Date(2015, 0, 1), new Date(2022, 0, 1)]).range([60,700]);

var imdbScale = d3.scaleLinear()
    .domain([1,10]).range([340,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(dateScale).ticks(d3.timeYear));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,390)')
    .text('Premiere Date');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(imdbScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(15,200) rotate(90)')
    .text('IMDB Ranking');

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(360,30)')
    .text('Netflix Originals Rankings');