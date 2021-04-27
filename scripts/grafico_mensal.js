
function destacar_grafico_mensal() { 
  if (active_mes == 'todos') {
    d3.selectAll('#grafico-mensal .bar')
      .attr('opacity', 1)

    /*ocultar valores*/
    d3.selectAll('#grafico-mensal .value')
      .remove()
  } else {
    d3.selectAll('#grafico-mensal .bar')
      .attr('opacity', 0.5)
      .filter(function(d) { return d.name == active_mes; })
      .attr('opacity', 1);
  }
}

function exibir_grafico_mensal() {
  let dados = []
  dados = [
    {'name':1, 'text':'jan', 'meta':10, 'corollas':15},
    {'name':2, 'text':'fev', 'meta':10, 'corollas':15},
    {'name':3, 'text':'mar', 'meta':10, 'corollas':15},
    {'name':4, 'text':'abr', 'meta':10, 'corollas':15},
    {'name':5, 'text':'mai', 'meta':10, 'corollas':5},
    {'name':6, 'text':'jun', 'meta':10, 'corollas':5},
    {'name':7, 'text':'jul', 'meta':10, 'corollas':5},
    {'name':8, 'text':'ago', 'meta':10, 'corollas':15},
    {'name':9, 'text':'set', 'meta':10, 'corollas':15},
    {'name':10, 'text':'out', 'meta':10, 'corollas':15},
    {'name':11, 'text':'nov', 'meta':10, 'corollas':5},
    {'name':12, 'text':'dez', 'meta':10, 'corollas':5},
  ]

  const svg = d3.select('#grafico-mensal svg');

  const margin = { top: 20, bottom: 50, left: 30, right: 0 };
  const width = 550 - margin.left - margin.right;
  const height = 290 - margin.top - margin.bottom;

  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(dados.map((s) => s.name))
    .padding(0.5)

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

    /*bar meta*/
    barGroups
    .append('rect')
    .attr('class', 'barMeta')
    .attr('x', (g) => xScale(g.name) -8)
    .attr('y', (g) => yScale(g.meta))
    .attr('height', (g) => height - yScale(g.meta))
    .attr('width', xScale.bandwidth())

    /*bar real*/
    barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(g.name))
    .attr('y', (g) => yScale(g.corollas))
    .attr('height', (g) => height - yScale(g.corollas))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function () {
      /*destacar barra selecionada*/
      d3.select(this)
        .transition()
        .duration(300)
        .attr('x', (a) => xScale(a.name) - 2)
        .attr('width', xScale.bandwidth() + 4)
      
      /*exibir valores*/
      barGroups 
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.corollas) + 12)
        .attr('text-anchor', 'middle')
        .text((a) => `${(a.corollas).toFixed(0)}`)
    })
    .on('mouseleave', function () {
      /*desfazer destacar barra selecionada*/
      d3.select(this)
        .transition()
        .duration(300)
        .attr('x', (a) => xScale(a.name))
        .attr('width', xScale.bandwidth())

      /*ocultar valores*/
      d3.selectAll('#grafico-mensal .value')
        .filter(function(d) { return d.name != active_mes })
        .remove()
    })
}