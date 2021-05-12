function pag_pareto_up() {
  pag_pareto ++
  document.querySelector('.anterior').style.pointerEvents = "initial"
  exibir_pareto()
}

function pag_pareto_down() {
  pag_pareto --
  exibir_pareto()
}

function zerar_pag() {
  pag_pareto = 0
}

function apagar_pareto() {
  document.getElementById("loader").style.display = "initial"
  let myNode = document.querySelector("#grafico-pareto svg");
  myNode.innerHTML = '';
}

function dados_pareto(){
  let bars
  let dados = []
  if (abertura != 'indicadores') {
    bars = eval(abertura)
    //filtrar gerências de acordo com a diretoria selecionada
    if (abertura == 'gerencias' && document.querySelector('#select-bx-diretoria').value != 'todos') {
      let d = document.querySelector('#select-bx-diretoria').value
      bars = bars.filter ( (el) => {
        return Math.round(el.areaID / 100) * 100 == d
      })
    }
    var metasFtPareto = metas
    var realFtPareto = real
    //filtrar indicador selecionado
    if (active_indicadorID != 'todos') {
      metasFtPareto = metas.filter( el => {
        return el.indicadorID == active_indicadorID
      })
      realFtPareto = real.filter ( el => {
        return el.indicadorID == active_indicadorID
      })
    }
    if (document.querySelector('#select-bx-mes').value == 'todos') {
      for (let i in bars) {
        let el = []
        let metaAcum = metasFtPareto.filter((el) => {
          return el.areaID === bars[i].areaID
        }).map((el) => {
          return el.meta
        }).reduce((a, b) => a + b, 0) / 12 * meses

        let indicReal = removeDuplicates(real.filter((el) => {
          return el.areaID === bars[i].areaID
        }).map( (el) => {
          return el.indicadorID
        }))

        let realAcum = 0
        for (let j in indicReal) {
          let elAcum = realFtPareto.filter((el) => {
            return (el.areaID === bars[i].areaID) && (el.indicadorID == indicReal[j])
          }).map((el) => {
            return el.perda
          }).reduce((a, b) => a + b, 0)
          if (elAcum > 0) {
            elAcum = elAcum / 125000
          } else{
            elAcum = 0
          }
          realAcum += elAcum
        }

        el['name'] = bars[i].areaID
        el['text'] = bars[i].areaName
        el['meta'] = metaAcum
        el['corollas'] = realAcum

        dados.push(el)
      }
    } else {
      for (let i in bars) {
        let el = []
        let meta = metasFtPareto.filter((el) => {
          return el.areaID === bars[i].areaID
        }).map((el) => {
          return el.meta
        }).reduce((a, b) => a + b, 0) / 12

        let r = realFtPareto.filter((el) => {
          return el.areaID === bars[i].areaID && el.mes == document.querySelector('#select-bx-mes').value
        }).map((el) => {
          return el.corollas
        }).reduce((a, b) => a + b, 0)

        el['name'] = bars[i].areaID
        el['text'] = bars[i].areaName
        el['meta'] = meta
        el['corollas'] = r

        dados.push(el)
      }
    }
  } else {
    if (document.querySelector('#select-bx-mes').value == 'todos') {
      bars = metasFt.map( (el) => {
        return [el.indicadorID, el.meta, el.realAcum]
      })
      for (let i in bars) {
        let el = []
        el['name'] = bars[i][0]
        el['text'] = indicadores.find(element => element.indicadorID === bars[i][0]).indicadorName
        el['meta'] = bars[i][1] / 12 * meses
        el['corollas'] = bars[i][2]

        dados.push(el)
      }
    } else {
      bars = realFt.filter( (el) => {
        return el.mes == parseInt(document.querySelector('#select-bx-mes').value)
      })
      for (let i in bars) {
        let el = []
        el['name'] = bars[i].indicadorID
        el['text'] = indicadores.find(element => element.indicadorID === bars[i].indicadorID).indicadorName
        el['meta'] = metasFt.find(element => element.indicadorID === bars[i].indicadorID).meta / 12
        el['corollas'] = bars[i].corollas

        dados.push(el)
      }
    }
  }

  //ordenar dados
  dados.sort(ordemDescrescente("corollas"))

  return dados
}

function exibir_pareto(){
  apagar_pareto()

  dados = dados_pareto()
  
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

  const svg = d3.select('#grafico-pareto svg')

  const margin = { top: 20, bottom: 56, left: 30, right: 0 };
  const width = 550 - margin.left - margin.right;
  const height = 280 - margin.top - margin.bottom;

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

  let vMax = Math.max(d3.max(dados.slice(pag_pareto * numBars,numBars + (pag_pareto * numBars)), function (d) { return d.meta; }), d3.max(dados.slice(pag_pareto * numBars,numBars + (pag_pareto * numBars)), function (d) { return d.corollas; }))

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
  .selectAll(".tick text")
    .call(wrap, xScale.bandwidth()+30)

  chart.append('g')
    .call(d3.axisLeft(yScale)
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

  const barGroups = chart.selectAll()
    .data(dados.slice(pag_pareto * numBars,numBars + (pag_pareto * numBars)))
    .enter()
    .append('g')

    /*bar meta*/
    barGroups
    .append('rect')
    .attr('class', 'barMeta')
    .attr('x', (g) => xScale(g.name) -10)
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
        .attr('x', (a) => xScale(a.name) - 5)
        .attr('width', xScale.bandwidth() + 10)
      
      /*exibir valores*/
      d3.selectAll('#grafico-pareto .value')
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
      d3.selectAll('#grafico-pareto .value')
        .filter(function(d) { return d.name != active_areaID && d.name != active_indicadorID; })
        .attr('opacity', 0);
    })
    .on('click', function () {
      if (abertura != 'indicadores') {
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
      }else {
        if (active_indicadorID == d3.select(this).data()[0].name) {
          active_indicadorID = 'todos'
          document.querySelector('.item-selecionado').style.opacity = "0"
          d3.selectAll('#grafico-pareto .bar')
            .attr('opacity', 1)
        } else {
          active_indicadorID = d3.select(this).data()[0].name
          document.querySelector('#item-selecionado').innerText = indicadores.find(element => element.indicadorID === active_indicadorID).indicadorName
          document.querySelector('.item-selecionado').style.opacity = "1"
          d3.selectAll('#grafico-pareto .bar')
            .attr('opacity', 0.5)
            .filter(function(d) { return d.name == active_indicadorID; })
            .attr('opacity', 1);
        }
        exibir_grafico_mensal()
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
  
  destacar_pareto()
  document.getElementById("loader").style.display = "none";
}