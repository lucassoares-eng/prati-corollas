function apagar_corollas_mensal(div) {
    let myNode = document.querySelector(div);
    myNode.innerHTML = '';
}

function corollas_mensal(div, indicadorID) {
    apagar_corollas_mensal(div)

    dados = dados_indicador_mensal(indicadorID)

    const svg = d3.select(div);

    const margin = { top: 10, bottom: 20, left: 30, right: 0 };
    const width = 345 - margin.left - margin.right;
    const height = 145 - margin.top - margin.bottom;

    const chart = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
    
    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(dados.map((s) => s.name))
        .padding(0.05)

    const xText = d3.scaleBand()
        .range([0, width])
        .domain(dados.map((s) => s.text))
        .padding(0.4)

    let vMax = Math.max(d3.max(dados.slice(), function (d) { return d.meta; }), d3.max(dados.slice(), function (d) { return d.corollas; }))

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
        .data(dados)
        .enter()
        .append('g')

        /*bar real*/
        barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.name))
        .attr('y', (g) => yScale(g.corollas))
        .attr('height', (g) => height - yScale(g.corollas))
        .attr('width', xScale.bandwidth())
        .on('mouseenter', function () {
            /*exibir valores*/
            d3.selectAll(div + ' .value')
                .attr('opacity', 1)
        })
        .on('mouseleave', function () {
            /*ocultar valores*/
            d3.selectAll(div + ' .value')
                .filter(function(d) { return d.name != active_mes })
                .attr('opacity', 0)
        })
        .on('click', function() {
            if (active_mes == d3.select(this).data()[0].name) {
                active_mes = 'todos'
                d3.selectAll(div + ' .bar')
                    .attr('opacity', 1)
                
                document.querySelector('#select-bx-mes').value = 'todos'
                filtrar_mes()
            } else {
                active_mes = d3.select(this).data()[0].name
                d3.selectAll(div + ' .bar')
                    .attr('opacity', 0.5)
                    .filter(function(d) { return d.name == active_mes; })
                    .attr('opacity', 1);
                
                document.querySelector('#select-bx-mes').value = d3.select(this).data()[0].name
                filtrar_mes()
            }
        })
        /*exibir valores*/
        barGroups 
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.corollas) + 12)
        .attr('text-anchor', 'middle')
        .text((a) => `${(a.corollas).toFixed(2).replace(".",",")}`)
        .attr('opacity', 0);

    destacar_indicador_mensal()
}