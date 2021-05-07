function apagar_meta_vs_real(div) {
    let myNode = document.querySelector(div);
    myNode.innerHTML = '';
}

function meta_vs_real(div, indicadorID) {
    apagar_meta_vs_real(div)

    data = dados_meta_vs_real(indicadorID)

    var width = 160,
        height = 145
    
    var svg = d3.select(div)
        .attr("width", width)
        .attr("height", height)

    velocimetro_meta_vs_real(div, width, data)
    bar_meta_vs_real(div, width, data)
}

function velocimetro_meta_vs_real(div, width, data) {
    let percent
    if (data[0].value > 0 && data[1].value > 0) {
        percent = (data[0].value / data[1].value) * 100
    } else{
        percent = NaN
    }

    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };

    var height = 125

    // Pick colors and value
    var mainColor = '#20d489'
    var secondColor = '#f1416c'
    var maxValue = 100

    // Create a radial scale representing 75% of a circle
    var scale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([ - Math.PI * 0.75, Math.PI * 0.75])
        .clamp(true);

    // Define arc
    var arc = d3.arc()
        .startAngle(function(d){
            return scale(0);
        })
        .endAngle(function(d){
            return scale(d);
        })
        .innerRadius(40)
        .outerRadius(55);

    var svg = d3.select(div)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Background arc
    svg.append('path')
        .datum(maxValue)
        .attr('d', arc)
        .style('fill', 'lightgray');

    // Fill arc
    svg.append('path')
        .datum(percent)
        .attr('d', arc)
        .style('fill', percent<=maxValue? mainColor: secondColor);

    // Text
    svg.append('text')
        .datum(percent)
        .attr('class', 'meter-center-text')
        .style('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('fill', percent<=maxValue? mainColor: secondColor)
        .text(percent > 0? function(d){
            return parseFloat(d).toFixed(1).replace(".",",") + '%';
        } : '- %')
        .attr('transform', 'translate(' + 3 + ',' + 2 + ')');
}

function bar_meta_vs_real (div, width, data) {
    // set colors
    if ( data[0].value <= data[1].value) {
        var color = d3.scaleOrdinal().range(["#20d489", "lightgray"])
    } else {
        var color = d3.scaleOrdinal().range(['#f1416c', "lightgray"])
    }

    var colorTxt = d3.scaleOrdinal().range(['white', "#3a3e41"])

    var margin = {
        right: 5,
        left: 18
    };

    var height = 30
    width -= margin.right + margin.left

    var svg = d3.select(div)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + 115 + ")");

    var vMax = d3.max(data, function (d) {
        return d.value;
    })
    if (vMax == 0) {
        vMax = 1
    }

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, vMax]);

    var y = d3.scaleBand()
        .range([height, 0], .1)
        .domain(data.map(function (d) {
            return d.name;
        }))

    //make y axis to show bar names
    var yAxis = d3.axisLeft()
        .scale(y)
        //no tick marks
        .tickSize(0)

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    //append rects
    bars.append("rect")
        .attr("class", "bar2")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.bandwidth() - 1)
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.value);
        })
        .attr("fill", function(d, i) {
            return color(i);
        })
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
    bars.append('text')
        .attr('class', 'value2')
        .attr('y', (a) => y(a.name) + y.bandwidth() / 2 + 2 )
        .attr('x', (a) => x(a.value) / 2 )
        .attr('text-anchor', 'middle')
        .attr('font-size', '9.5px')
        .text((a) => `${(a.value).toFixed(2).replace(".",",")}`)
        .attr("fill", function(d, i) {
            return colorTxt(i);
        })
        .attr('opacity', 0)
}