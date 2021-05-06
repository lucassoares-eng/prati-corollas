function apagar_corollas_por_area() {
    let myNode = document.querySelector('#container-desligamentos #area1 svg');
    myNode.innerHTML = '';
}

function exibir_desligamentos() {
    var custo_medio = 4500
    var real = 50
    var real_percent = 0.005
    var limite = 100
    var limite_percent = 0.00875
    var perda = 0
    var corollas = 0
    var app = new Vue({
        el: '#container-desligamentos',
        data: {
          custo_medio: (custo_medio).toLocaleString('pt-BR'),
          real: (real).toLocaleString('pt-BR'),
          real_percent: (real_percent * 100).toFixed(3).replace(".",",") + '%',
          limite: (limite).toLocaleString('pt-BR'),
          limite_percent: (limite_percent * 100).toFixed(3).replace(".",",") + '%',
          dif: real - limite,
          perda: (perda).toLocaleString('pt-BR'),
          corollas: (corollas.toFixed(3)).replace(".",",")
        }
    })
    corollas_por_area()
    corollas_mensal()
}

function corollas_por_area() {
    apagar_corollas_por_area()

    data = dados_indicador_por_area(7)
    /*ordenar dados*/
    data.sort(ordemCrescente("corollas"))

    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    var margin = {
        top: 0,
        right: 10,
        bottom: 0,
        left: 83
    };

    var width = 270 - margin.left - margin.right,
        height = (data.length * 40) - margin.top - margin.bottom
    
    var svg = d3.select('#container-desligamentos #area1 svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) {
            return d.corollas;
        })]);

    var y = d3.scaleBand()
        .range([height, 0], .1)
        .domain(data.map(function (d) {
            return d.name;
        }))

    var yText = d3.scaleBand()
        .range([height, 0], .1)
        .domain(data.map(function (d) {
            return d.text;
        }))

    //make y axis to show bar names
    var yAxis = d3.axisLeft()
        .scale(yText)
        //no tick marks
        .tickSize(0)

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")
        .call(wrap2, 80)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.bandwidth() - 1)
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.corollas);
        })
        .on('mouseenter', function () {
            /*exibir valores*/
            bars
            .append('text')
            .attr('class', 'value')
            .attr('y', (a) => y(a.name) + y.bandwidth() / 2 )
            .attr('x', (a) => x(a.corollas) / 2 )
            .attr('text-anchor', 'middle')
            .text((a) => `${(a.corollas).toFixed(2).replace(".",",")}`)
        })
        .on('mouseleave', function () {
            /*ocultar valores*/
            d3.selectAll('#container-desligamentos #area1 .value')
                .filter(function(d) { return d.name != active_areaID && d.name != active_indicadorID; })
                .remove()
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
}

function corollas_mensal() {
    dados = dados_indicador_mensal(7)


}

function quadro() {
    console.log('quadro')
}

function desligamentos() {
    console.log('desligamentos')
}

function grafico_custo_medio() {
    console.log('gráfico_custo médio')
}