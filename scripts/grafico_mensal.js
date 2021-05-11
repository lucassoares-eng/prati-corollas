
function apagar_grafico_mensal() {
  document.getElementById("loader").style.display = "initial"
  let myNode = document.querySelector("#grafico-mensal svg");
  myNode.innerHTML = '';
}

const mesText = [
  {name:1, text:'jan'},
  {name:2, text:'fev'},
  {name:3, text:'mar'},
  {name:4, text:'abr'},
  {name:5, text:'mai'},
  {name:6, text:'jun'},
  {name:7, text:'jul'},
  {name:8, text:'ago'},
  {name:9, text:'set'},
  {name:10, text:'out'},
  {name:11, text:'nov'},
  {name:12, text:'dez'},
]

function exibir_grafico_mensal() {
  apagar_grafico_mensal()

  /*carregar dados*/
  let dados = []
  if ( active_indicadorID == 'todos') {
    let metaMensal = metasFt.map( (el) => {
      return el.meta
    }).reduce((a, b) => a + b, 0) / 12
    for (let m = 0; m < 12; m++) {
      let realMensal = 0
      if (m < meses) {
        realMensal = realFt.filter( (el) => {
          return el.mes == m + 1
        }).map( (el) => {
          return el.corollas
        }).reduce((a, b) => a + b, 0)
      }
      let el = []
      el['name'] = m + 1
      el['text'] = mesText.find(el => el.name== m + 1).text
      el['meta'] = metaMensal
      el['corollas'] = realMensal
      dados.push(el)
    }
  } else {
    let metaMensal = metasFt.filter( (el) => {
      return el.indicadorID == active_indicadorID
    }).map( (el) => {
      return el.meta
    }).reduce((a, b) => a + b, 0) / 12
    for (let m = 0; m < 12; m++) {
      let realMensal = 0
      if (m < meses) {
        realMensal = realFt.filter( (el) => {
          return (el.mes == m + 1) && (el.indicadorID == active_indicadorID)
        }).map( (el) => {
          return el.corollas
        }).reduce((a, b) => a + b, 0)
      }
      let el = []
      el['name'] = m + 1
      el['text'] = mesText.find(el => el.name== m + 1).text
      el['meta'] = metaMensal
      el['corollas'] = realMensal
      dados.push(el)
    }
  }

  const svg = d3.select('#grafico-mensal svg');

  const margin = { top: 20, bottom: 50, left: 30, right: 0 };
  const width = 550 - margin.left - margin.right;
  const height = 290 - margin.top - margin.bottom;

  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(dados.map((s) => s.name))
    .padding(0.4)

  const xText = d3.scaleBand()
    .range([0, width])
    .domain(dados.map((s) => s.text))
    .padding(0.4)

  let vMax = Math.max(d3.max(dados.slice(), function (d) { return d.meta; }), d3.max(dados.slice(), function (d) { return d.corollas; }))

  if( vMax == 0 ) { vMax = 1 }

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
      d3.selectAll('#grafico-mensal .value')
        .attr('opacity', 1);
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
        .attr('opacity', 0);
    })
    .on('click', function() {
      if (active_mes == d3.select(this).data()[0].name) {
        active_mes = 'todos'
        d3.selectAll('#grafico-mensal .bar')
          .attr('opacity', 1)
        
        document.querySelector('#select-bx-mes').value = 'todos'
        filtrar_mes()
      } else {
        active_mes = d3.select(this).data()[0].name
        d3.selectAll('#grafico-mensal .bar')
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
    .text((a) => `${(a.corollas).toFixed(1).replace(".",",")}`)
    .attr('opacity', 0);

  destacar_grafico_mensal()
  document.getElementById("loader").style.display = "none"
}