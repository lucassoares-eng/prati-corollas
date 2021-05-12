function grafico_de_linha(div, dados) {
    apagar_grafico(div)

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 10, bottom: 20, left: 40},
    width = 370 - margin.left - margin.right,
    height = 145 - margin.top - margin.bottom

    // append the svg object to the body of the page
    const chart = d3.select(div)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const x = d3.scaleBand()
        .range([0, width])
        .domain(dados.map((s) => s.name))

    const xText = d3.scaleBand()
        .range([0, width])
        .domain(dados.map((s) => s.text))

    let vMax = d3.max(dados.slice(), function (d) { return d.value; })
    if (vMax == 0) {
        vMax = 1
    }

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, vMax])

    const makeYLines = () => d3.axisLeft()
        .scale(y)

    /*y axis*/
    chart.append('g')
        .call(d3.axisLeft(y)
            .ticks(5)
            .tickFormat(x => `${x.toLocaleString('pt-BR')}`)
        )

    chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
            .ticks(5)
            .tickSize(-width, 0, 0)
            .tickFormat('')
        )

    /*txt x axis*/
    chart.append('g')
        .attr("class", "x axis")
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xText))

    //set the gradient
    var lg = chart.append("defs").append("linearGradient")
        .attr("id", "mygrad")
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%")

    lg.append("stop")
        .attr("offset", "0%")
        .style("stop-color", "#4695ff")
        .style("stop-opacity", 0.2)

    lg.append("stop")
        .attr("offset", "100%")
        .style("stop-color", "#4695ff")
        .style("stop-opacity", 0)

    // Add the area
    chart.append("path")
        .datum(dados.slice(0, meses))
        .attr("fill", "url(#mygrad)")
        .attr("stroke", "none")
        .attr("d", d3.area()
            .x(function(d) { return x(d.name) + x.bandwidth() / 2})
            .y0( height )
            .y1(function(d) { return y(d.value) })
        )
        .on('mouseenter', function () {
            /*exibir valores*/
            d3.selectAll(div + ' .value2')
                .attr('opacity', 1)
        })
        .on('mouseleave', function () {
            /*ocultar valores*/
            d3.selectAll(div + ' .value2')
                .attr('opacity', 0)
        })

    //add line
    chart.append("path")
        .datum(dados.slice(0, meses))
        .attr('class', 'chart-line')
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(function(d) { return x(d.name) + x.bandwidth() / 2})
            .y(function(d) { return y(d.value) })
        )
        .on('mouseenter', function () {
            /*exibir valores*/
            d3.selectAll(div + ' .value2')
                .attr('opacity', 1)
        })
        .on('mouseleave', function () {
            /*ocultar valores*/
            d3.selectAll(div + ' .value2')
                .attr('opacity', 0)
        })

    //add points
    chart.selectAll("myCircles")
        .data(dados.slice(0, meses))
        .enter()
        .append("circle")
            .attr("fill", "white")
            .attr("stroke", "#4695ff")
            .attr("stroke-width", 2)
            .attr("cx", function(d) { return x(d.name) + x.bandwidth() / 2})
            .attr("cy", function(d) { return y(d.value) })
            .attr("r", 4)
            .on('mouseenter', function () {
                /*exibir valores*/
                d3.selectAll(div + ' .value2')
                    .attr('opacity', 1)
            })
            .on('mouseleave', function () {
                /*ocultar valores*/
                d3.selectAll(div + ' .value2')
                    .attr('opacity', 0)
            })
    
    //add valores
    chart.selectAll("myCircles")
        .data(dados.slice(0, meses))
        .enter()
        .append('text')
            .attr('class', 'value2')
            .attr('fill', '#6c757d')
            .attr('x', (a) => x(a.name) + x.bandwidth() / 2)
            .attr('y', (a) => y(a.value) - 7)
            .attr('text-anchor', 'middle')
            .text((a) => `${(a.value).toLocaleString('pt-BR')}`)
            .attr('opacity', 0);
}