function pag_pareto_up() {
  pag_pareto ++
  document.querySelector('.anterior').style.pointerEvents = "initial"
  exibir_pareto()
  destacar_pareto()
}

function pag_pareto_down() {
  pag_pareto --
  exibir_pareto()
  destacar_pareto()
}

function zerar_pag() {
  pag_pareto = 0
}

function apagar_pareto() {
  document.getElementById("loader").style.display = "initial"
  let myNode = document.querySelector("#grafico-pareto svg");
  myNode.innerHTML = '';
}

function destacar_pareto() { 
  if (active_areaID == areaID || active_areaID == dirA) {
    d3.selectAll('#grafico-pareto .bar')
      .attr('opacity', 1)

    /*ocultar valores*/
    d3.selectAll('#grafico-pareto .value')
      .remove()
  } else {
    d3.selectAll('#grafico-pareto .bar')
      .attr('opacity', 0.5)
      .filter(function(d) { return d.name == active_areaID; })
      .attr('opacity', 1);
  }
}

function change_abertura(abertura_selected) {
  abertura = abertura_selected
  exibir_pareto()
}

function exibir_pareto(){
  apagar_pareto()

  var periodo
  if (document.querySelector('#select-bx-mes').value == 'todos'){
    periodo = 'acum'
  } else{
    periodo = 'mes' + document.querySelector('#select-bx-mes').value
  }

  let bars
  let dados = []
  if (abertura != 'indicadores') {
    bars = eval(abertura)
    /*filtrar gerências de acordo com a diretoria selecionada*/
    if (abertura == 'gerencias' && document.querySelector('#select-bx-diretoria').value != 'todos') {
      let d = document.querySelector('#select-bx-diretoria').value
      bars = bars.filter ( (el) => {
        return Math.round(el.areaID / 100) * 100 == d
      })
    }
    if (document.querySelector('#select-bx-mes').value == 'todos') {
      for (let i in bars) {
        let el = []
        let metaAcum = metas.filter((el) => {
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
          let elAcum = real.filter((el) => {
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
        let meta = metas.filter((el) => {
          return el.areaID === bars[i].areaID
        }).map((el) => {
          return el.meta
        }).reduce((a, b) => a + b, 0) / 12

        let r = real.filter((el) => {
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
        el['meta'] = metasFt.find(element => element.indicadorID === bars[i].indicadorID).meta / 12 * meses
        el['corollas'] = bars[i].corollas

        dados.push(el)
      }
    }
  }

  /*ordenar dados*/
  dados.sort(ordemDescrescente("corollas"))
  
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

  const svg = d3.select('#grafico-pareto svg');

  const margin = { top: 20, bottom: 56, left: 30, right: 0 };
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

  let vMax = Math.max(d3.max(dados.slice(pag_pareto * numBars,numBars + (pag_pareto * numBars)), function (d) { return d.meta; }), d3.max(dados.slice(pag_pareto * numBars,numBars + (pag_pareto * numBars)), function (d) { return d.corollas; }))
  
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
      barGroups 
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.corollas) + 12)
        .attr('text-anchor', 'middle')
        .text((a) => `${(a.corollas).toFixed(1)}`)      
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
        .remove()
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
          d3.selectAll('#grafico-pareto .bar')
            .attr('opacity', 1)
        } else {
          active_indicadorID = d3.select(this).data()[0].name
          d3.selectAll('#grafico-pareto .bar')
            .attr('opacity', 0.5)
            .filter(function(d) { return d.name == active_indicadorID; })
            .attr('opacity', 1);
        }
        exibir_grafico_mensal()
      }
    })

  document.getElementById("loader").style.display = "none";
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1,
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}