function gauge_dois_fatores(div, dados) {
    apagar_grafico(div)

    let value_1 = dados.map( el => {
        return el.value_1
    }).reduce((a, b) => a + b, 0)

    let value_2 = dados.map( el => {
        return el.value_2
    }).reduce((a, b) => a + b, 0)

    var width = 160,
        height = 100

    var margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    // Pick colors and value
    var mainColor = '#4695FF'
    var maxValue = value_1 + value_2

    // Create a radial scale
    var scale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([ - Math.PI, Math.PI])
        .clamp(true);

    // Define arc
    var arc = d3.arc()
        .startAngle(function(d){
            return scale(0) + Math.PI;
        })
        .endAngle(function(d){
            return scale(d) + Math.PI;
        })
        .innerRadius(32)
        .outerRadius(42);

    var svg = d3.select(div)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`)

    // Background arc
    svg.append('path')
        .datum(maxValue)
        .attr('d', arc)
        .style('fill', 'lightgray');

    // Fill arc
    svg.append('path')
        .datum(value_1)
        .attr('d', arc)
        .style('fill', mainColor);

    // add text
    svg.append('text')
        .attr('class', 'value2')
        .attr('y', -40 + 80 * (value_1 / (value_1 + value_2)) * 2 )
        .attr('x', 55 )
        .attr('text-anchor', 'middle')
        .attr('font-size', '9.5px')
        .text(value_1)
        .attr("fill", "#6c757d")
        .attr('opacity', 1)
        .append('svg:tspan')
        .attr('y', -30 + 80 * (value_1 / (value_1 + value_2)) * 2 )
        .attr('x', 58 )
        .text((value_1/ (value_1 + value_2) * 100).toFixed(0) + '%')
        .attr("fill", "#6c757d")
        .attr('opacity', 1)
}