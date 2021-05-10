function corollas_por_area(div, indicadorID) {
    apagar_grafico(div)

    data = dados_indicador_por_area(indicadorID)
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
    
    var svg = d3.select(div)
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
            d3.selectAll(div + ' .value')
                .attr('opacity', 1)
        })
        .on('mouseleave', function () {
            /*ocultar valores*/
            d3.selectAll(div + ' .value')
                .filter(function(d) { return d.name != active_areaID && d.name != active_indicadorID; })
                .attr('opacity', 0)
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
    //append valores
    bars.append('text')
        .attr('class', 'value')
        .attr('y', (a) => y(a.name) + y.bandwidth() / 2 )
        .attr('x', (a) => x(a.corollas) / 2 )
        .attr('text-anchor', 'middle')
        .text((a) => `${(a.corollas).toFixed(2).replace(".",",")}`)
        .attr('opacity', 0)

    destacar_indicador_por_area()
}