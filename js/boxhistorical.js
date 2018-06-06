(function() {
var holc_classes =['A','B','C','D']
var holc_colors = ['#5fce23', '#0bc0ed', '#ffd419', '#ff4b19']

// Inspired by http://informationandvisualization.de/blog/boxHistorical-plot
d3v3.boxHistorical = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      whiskers = boxHistoricalWhiskers,
      quartiles = boxHistoricalQuartiles,
      tickFormat = null;

  // For each small multiple…
  function boxHistorical(g) {
    g.each(function(d, i) {

      d = d.map(value).sort(d3v3.ascending);
      var g = d3v3.select(this),
          n = d.length,
          min = d[0],
          max = d[n - 1];

      // Compute quartiles. Must return exactly 3 elements.
      var quartileData = d.quartiles = quartiles(d);

      // Compute whiskers. Must return exactly 2 elements, or null.
      var whiskerIndices = whiskers && whiskers.call(this, d, i),
          whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

      // Compute outliers. If no whiskers are specified, all data are "outliers".
      // We compute the outliers as indices, so that we can join across transitions!
      var outlierIndices = whiskerIndices
          ? d3v3.range(0, whiskerIndices[0]).concat(d3v3.range(whiskerIndices[1] + 1, n))
          : d3v3.range(n);

      // Compute the new x-scale.
      var x1 = d3v3.scale.linear()
          .domain(domain && domain.call(this, d, i) || [min, max])
          .range([height, 0]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3v3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Note: the boxHistorical, median, and boxHistorical tick elements are fixed in number,
      // so we only have to handle enter and update. In contrast, the outliers
      // and other elements are variable, so we need to exit them! Variable
      // elements also fade in and out.

      // Update center line: the vertical line spanning the whiskers.
      var center = g.selectAll("line.center")
          .data(whiskerData ? [whiskerData] : []);

      center.enter().insert("line", "rect")
          .attr("class", "center")
          .attr("x1", width / 2)
          .attr("y1", function(d) { return x0(d[0]); })
          .attr("x2", width / 2)
          .attr("y2", function(d) { return x0(d[1]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); })
          .remove();

      // Update innerquartile boxHistorical.
      var boxHistorical = g.selectAll("rect.boxHistorical")
          .data([quartileData]);

      boxHistorical.enter().append("rect")
          .attr("class", "boxHistorical")
          .attr("x", 0)
          .attr("y", function(d) { return x0(d[2]); })
          .attr("width", width)
          .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })
          .attr("data-legend",function(d) { return holc_classes[i]})
          .attr('fill',holc_colors[i])
        .transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      boxHistorical.transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      // Update median line.
      var medianLine = g.selectAll("line.median")
          .data([quartileData[1]]);

      medianLine.enter().append("line")
          .attr("class", "median")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      medianLine.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      // Update whiskers.
      var whisker = g.selectAll("line.whisker")
          .data(whiskerData || []);

      whisker.enter().insert("line", "circle, text")
          .attr("class", "whisker")
          .attr("x1", .25*width)
          .attr("y1", x0)
          .attr("x2", .75*width)
          .attr("y2", x0)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.exit().transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1e-6)
          .remove();

      // Update outliers.
      var outlier = g.selectAll("circle.outlier")
          .data(outlierIndices, Number);

      outlier.enter().insert("circle", "text")
          .attr("class", "outlier")
          .attr("r", 2)
          .attr("cx", width / 2)
          .attr("cy", function(i) { return x0(d[i]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.exit().transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1e-6)
          .remove();

      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update boxHistorical ticks.
      var boxHistoricalTick = g.selectAll("text.boxHistorical")
          .data(quartileData);

      boxHistoricalTick.enter().append("text")
          .attr("class", "boxHistorical")
          .attr("dy", ".3em")
          .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
          .attr("x", function(d, i) { return i & 1 ? width : 0 })
          .attr("y", x0)
          .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
          .text(format)
        .transition()
          .duration(duration)
          .attr("y", x1);

      boxHistoricalTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1);

      // Update whisker ticks. These are handled separately from the boxHistorical
      // ticks because they may or may not exist, and we want don't want
      // to join boxHistorical ticks pre-transition with whisker ticks post-.
      var whiskerTick = g.selectAll("text.whisker")
          .data(whiskerData || []);

      whiskerTick.enter().append("text")
          .attr("class", "whisker")
          .attr("dy", ".3em")
          .attr("dx", 6)
          .attr("x", width)
          .attr("y", x0)
          .text(format)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.exit().transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1e-6)
          .remove();
    });
    d3v3.timer.flush();
  }

  boxHistorical.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return boxHistorical;
  };

  boxHistorical.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return boxHistorical;
  };

  boxHistorical.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return boxHistorical;
  };

  boxHistorical.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return boxHistorical;
  };

  boxHistorical.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3v3.functor(x);
    return boxHistorical;
  };

  boxHistorical.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return boxHistorical;
  };

  boxHistorical.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return boxHistorical;
  };

  boxHistorical.quartiles = function(x) {
    if (!arguments.length) return quartiles;
    quartiles = x;
    return boxHistorical;
  };

  return boxHistorical;
};

function boxHistoricalWhiskers(d) {
  return [0, d.length - 1];
}

function boxHistoricalQuartiles(d) {
  return [
    d3v3.quantile(d, .25),
    d3v3.quantile(d, .5),
    d3v3.quantile(d, .75)
  ];
}

})();