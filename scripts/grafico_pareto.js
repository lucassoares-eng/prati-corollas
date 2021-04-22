var pag_pareto = 0
var abertura

function pag_pareto_up() {
  pag_pareto ++
  document.querySelector('.anterior').style.pointerEvents = "initial";
  exibir_pareto(abertura)
}

function pag_pareto_down() {
  pag_pareto --
  exibir_pareto(abertura)
}

function zerar_pag() {
  pag_pareto = 0
}

function apagar_pareto() {
  document.getElementById("loader").style.display = "initial";
  let myNode = document.querySelector("svg");
  myNode.innerHTML = '';
}

function destacar_pareto(active_areaID) {  
  if (active_areaID == area) {
    d3.selectAll('#grafico-pareto .bar')
      .attr('opacity', 1)
  } else {
    d3.selectAll('#grafico-pareto .bar')
      .attr('opacity', 0.5)
      .filter(function(d) { return d.name == active_areaID; })
      .attr('opacity', 1);
  }
}

var selectedBar

async function exibir_pareto(abertura){

  apagar_pareto()
  var periodo
  if (document.querySelector('#select-bx-mes').value == 'todos'){
    periodo = 'acum'
  } else{
    periodo = 'mes' + document.querySelector('#select-bx-mes').value
  }

  let dados
  await fetch("_json/grafico_pareto/" + area + "_" + abertura + "_" + periodo + ".json", {cache: "reload"})
    .then(res => res.json())
    .then(data => dados = data)
  
  const numBars = 6;
  let npg = Math.ceil(dados.length / numBars)

  if (pag_pareto < npg -1) {
    document.querySelector('.proximo').style.pointerEvents = "initial"
  } else {
    document.querySelector('.proximo').style.pointerEvents = "none";
  }

  if (pag_pareto == 0) {
    document.querySelector('.anterior').style.pointerEvents = "none";
  }

  const svg = d3.select('svg');

  const margin = { top: 20, bottom: 40, left: 30, right: 0 };
  const width = 550 - margin.left - margin.right;
  const height = 290 - margin.top - margin.bottom;

  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(dados.slice(pag_pareto * numBars,numBars + (pag_pareto * numBars)).map((s) => s.name))
    .padding(0.4)

  const xText = d3.scaleBand()
    .range([0, width])
    .domain(dados.slice(pag_pareto * numBars,numBars + (pag_pareto * numBars)).map((s) => s.text))
    .padding(0.4)

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(dados.slice(pag_pareto * numBars,numBars + (pag_pareto * numBars)), function (d) { return d.corollas; })])

  const makeYLines = () => d3.axisLeft()
    .scale(yScale)

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xText));

  chart.append('g')
    .call(d3.axisLeft(yScale));

  chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
      .tickSize(-width, 0, 0)
      .tickFormat('')
    )

  const barGroups = chart.selectAll()
    .data(dados.slice(pag_pareto * numBars,numBars + (pag_pareto * numBars)))
    .enter()
    .append('g')

  barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(g.name))
    .attr('y', (g) => yScale(g.corollas))
    .attr('height', (g) => height - yScale(g.corollas))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function () {
      d3.select(this)
        .transition()
        .duration(300)
        .attr('x', (a) => xScale(a.name) - 5)
        .attr('width', xScale.bandwidth() + 10)
      
      barGroups 
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.corollas) + 12)
        .attr('text-anchor', 'middle')
        .text((a) => `${(a.corollas).toFixed(1)}`)
    })
    .on('mouseleave', function () {
      d3.select(this)
        .transition()
        .duration(300)
        .attr('x', (a) => xScale(a.name))
        .attr('width', xScale.bandwidth())

      chart.selectAll('.value').remove()
    })
    .on('click', function () {
      if (active_areaID == d3.select(this).data()[0].name) {
        if (abertura == 'diretorias'){
          document.querySelector('#select-bx-diretoria').value = 'todos'
          filtrar_diretoria()
        } else if (abertura == 'gerencias'){
          document.querySelector('#select-bx-gerencia').value = 'todos'
          filtrar_gerencia()
        }
      }else if (abertura == 'diretorias') {
        document.querySelector('#select-bx-diretoria').value = d3.select(this).data()[0].name
        filtrar_diretoria()
      } else if (abertura == 'gerencias') {
        document.querySelector('#select-bx-gerencia').value = d3.select(this).data()[0].name
        filtrar_gerencia()
      }
    })  
  document.getElementById("loader").style.display = "none";
}