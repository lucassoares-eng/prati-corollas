function ajustar_tela() {
    let j = document.querySelector('main')
    let h = document.querySelector('#filtros').offsetHeight
    let g = '60px ' + h + 'px calc(100vh - 60px - '+ h +'px - 30px) 30px'
    j.style.gridTemplateRows = g
    let c = document.querySelector('#total').offsetWidth
    let i = document.querySelector('#container-indicador')
    i.style.width = c + 25 + 'px'
    let sticky = document.querySelectorAll('.row-subname')
    sticky.forEach(element => {
        element.setAttribute('style', 'left: ' + c + 'px')
    })
}
function over(linha) {
    let color = 'rgb(240, 240, 255)'
    let name = linha.querySelector('.row-name')
    name.style.backgroundColor = color
    let subContainer = linha.querySelector('.sub-container')
    subContainer.style.backgroundColor = color
    let subRows = subContainer.querySelectorAll('.sub-row')
    subRows[0].querySelector('.row-subname').style.backgroundColor = color
    subRows[1].querySelector('.row-subname').style.backgroundColor = color
    subRows[2].querySelector('.row-subname').style.backgroundColor = color
}
function out(linha) {
    let color = '#fff'
    let name = linha.querySelector('.row-name')
    name.style.backgroundColor = color
    let subContainer = linha.querySelector('.sub-container')
    subContainer.style.backgroundColor = color
    let subRows = subContainer.querySelectorAll('.sub-row')
    subRows[0].querySelector('.row-subname').style.backgroundColor = color
    subRows[1].querySelector('.row-subname').style.backgroundColor = color
    subRows[2].querySelector('.row-subname').style.backgroundColor = color
}
function ativar_filtro_meses(){
    let cxd = document.querySelector('#select-bx-mes');
    for (let i = 0; i <= meses; i++) {
        cxd[i].disabled = false
    }
}
function desativar_filtro_meses(){
    document.querySelector('#select-bx-mes').value='todos'
    let cxd = document.querySelector('#select-bx-mes');
    for (let i = 1; i < cxd.length; i++) {
        cxd[i].disabled = true
    }
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

function wrap2(text, width) {
    text.each(function() {
        var text = d3.select(this),
            textContent = text.text(),
            tempWord = addBreakSpace(textContent).split(/\s+/),
            x = text.attr('x'),
            y = text.attr('y'),
            dy = parseFloat(text.attr('dy') || 0),
            tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');
        for (var i = 0; i < tempWord.length; i++) {
            tempWord[i] = calHyphen(tempWord[i]);
        }
        textContent = tempWord.join(" ");
        var words = textContent.split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            spanContent,
            breakChars = ['/', '&', '-'];
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                spanContent = line.join(' ');
                breakChars.forEach(function(char) {
                    // Remove spaces trailing breakChars that were added above
                    spanContent = spanContent.replace(char + ' ', char);
                });
                tspan.text(spanContent);
                line = [word];
                tspan = text.append('tspan').attr('x', x).attr('y', y + lineHeight * lineNumber).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
            }
        }
        var emToPxRatio = parseInt(window.getComputedStyle(text._groups[0][0]).fontSize.slice(0,-2));
        text.attr("transform", "translate(-" + (2) + ", -" + lineNumber/2 * lineHeight * emToPxRatio + ")");
        function calHyphen(word) {
            tspan.text(word);
            if (tspan.node().getComputedTextLength() > width) {
                var chars = word.split('');
                var asword = "";
                for (var i = 0; i < chars.length; i++) {
                    asword += chars[i];
                    tspan.text(asword);
                    if (tspan.node().getComputedTextLength() > width) {
                        if (chars[i - 1] !== "-") {
                            word = word.slice(0, i - 1) + "- " + calHyphen(word.slice(i - 1));
                        }
                        i = chars.length;
                    }
                }
            }
            return word;
        }
    });
}

function addBreakSpace(inputString) {
    var breakChars = ['/', '&', '-']
    breakChars.forEach(function(char) {
        // Add a space after each break char for thefunction to use to determine line breaks
        inputString = inputString.replace(char, char + ' ');
    });
    return inputString;
}

function destacar_pareto() { 
    if (active_areaID == areaID || active_areaID == dirA) {
        d3.selectAll('#grafico-pareto .bar')
            .attr('opacity', 1)
    
        /*ocultar valores*/
        d3.selectAll('#grafico-pareto .value')
            .attr('opacity', 0);
    } else {
        d3.selectAll('#grafico-pareto .bar')
            .attr('opacity', 0.5)
            .filter(function(d) { return d.name == active_areaID; })
            .attr('opacity', 1);

        /*exibir valor*/
        d3.selectAll('#grafico-pareto .value')
            .filter(function(d) { return d.name == active_areaID || d.name == active_indicadorID; })
            .attr('opacity', 1);
    }
}

function destacar_grafico_mensal() { 
    if (active_mes == 'todos') {
        d3.selectAll('#grafico-mensal .bar')
            .attr('opacity', 1)
    
        /*ocultar valores*/
        d3.selectAll('#grafico-mensal .value')
            .attr('opacity', 0);
    } else {
        d3.selectAll('#grafico-mensal .bar')
            .attr('opacity', 0.5)
            .filter(function(d) { return d.name == active_mes; })
            .attr('opacity', 1);
        
        /*exibir valore*/
        d3.selectAll('#grafico-mensal .value')
        .filter(function(d) { return d.name == active_mes })
        .attr('opacity', 1);
    }
}

function destacar_indicador_por_area() {
    if (active_areaID == areaID || active_areaID == dirA) {
        d3.selectAll('#area1 .bar')
            .attr('opacity', 1)

        /*ocultar valores*/
        d3.selectAll('#area1 .value')
            .attr('opacity', 0)
    } else {
        d3.selectAll('#area1 .bar')
            .attr('opacity', 0.5)
            .filter(function(d) { return d.name == active_areaID; })
            .attr('opacity', 1);
        /*exibir valor*/
        d3.selectAll('#area1 .value')
            .filter(function(d) { return d.name == active_areaID || d.name == active_indicadorID; })
            .attr('opacity', 1)
    }
}

function destacar_indicador_mensal() {
    if (active_mes == 'todos') {
        d3.selectAll('#area11 .bar')
            .attr('opacity', 1)
    
        /*ocultar valores*/
        d3.selectAll('#area11 .value')
            .attr('opacity', 0)
    } else {
        d3.selectAll('#area11 .bar')
            .attr('opacity', 0.5)
            .filter(function(d) { return d.name == active_mes; })
            .attr('opacity', 1);
        /*exibir valor*/
        d3.selectAll('#area11 .value')
            .filter(function(d) { return d.name == active_mes })
            .attr('opacity', 1)
    }
}