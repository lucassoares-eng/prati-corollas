function grafico_barra_dois_fatores (div, dados) {
    apagar_grafico(div)

    const svg = d3.select(div);

    const margin = { top: 10, bottom: 20, left: 30, right: 0 };
    const width = 370 - margin.left - margin.right;
    const height = 125 - margin.top - margin.bottom;

    const chart = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
    
    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(dados.map((s) => s.name))
        .padding(0.6)

    const xText = d3.scaleBand()
        .range([0, width])
        .domain(dados.map((s) => s.text))

    let vMax = Math.max(d3.max(dados.slice(), function (d) { return d.value_1; }), d3.max(dados.slice(), function (d) { return d.value_2; })) * 2
    if (vMax == 0) {
        vMax = 1
    }

    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, vMax])

    const makeYLines = () => d3.axisLeft()
        .scale(yScale)

    /*txt x axis*/
    chart.append('g')
        .attr("class", "x axis")
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xText))
    
    chart.append('g')
        .call(d3.axisLeft(yScale));

    chart.append('g')
        .attr('class', 'grid')
        .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        )

    const barGroups = chart.selectAll()
        .data(dados.slice(0, meses))
        .enter()
        .append('g')

        /*bar fator 1*/
        barGroups
        .append('rect')
        .attr('class', 'bar-demitidos')
        .attr('fill', '#4695ff')
        .attr('x', (g) => xScale(g.name))
        .attr('y', (g) => yScale(g.value_1))
        .attr('height', (g) => height - yScale(g.value_1))
        .attr('width', xScale.bandwidth())
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

        /*bar fator 2*/
        barGroups
        .append('rect')
        .attr('class', 'bar-demissionarios')
        .attr('fill', '#D3D3D3')
        .attr('x', (g) => xScale(g.name))
        .attr('y', (g) => yScale(g.value_2) + yScale(g.value_1) - height)
        .attr('height', (g) => height - yScale(g.value_2))
        .attr('width', xScale.bandwidth())
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

        /*exibir valores*/
        barGroups 
        .append('text')
        .attr('class', 'value2')
        .attr('fill', '#6c757d')
        .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.value_1) + yScale(a.value_2) - height - 3)
        .attr('text-anchor', 'middle')
        .text((a) => `${(a.value_1 + a.value_2).toFixed(0)}`)
        .attr('opacity', 0);
}