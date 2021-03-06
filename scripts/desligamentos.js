function exibir_desligamentos() {

    var texto_grupo = 'O indicador de perda por desligamentos é calculado com base em três fatores: (1) headcount, (2) número de colaboradores desligados (demitidos + demissionários) e (3) limite aceitável de desligamentos. O limite aceitável de desligamentos é de 1,25% ao mês, ou seja, 1 a cada 80 colaboradores. Até o limite aceitável não há perda. A perda passa a ser contabilizada quando o grupo extrapola o limite aceitável. O valor é padrão para cada tipo de desligamento, sendo R$ 5.000 para demitidos e R$ 2.500 para demissionários. Para o indicador do grupo, os colaboradores em período de experiência também entram na conta.'

    var texto_areas = 'O indicador de perda por desligamentos é calculado com base em três fatores: (1) headcount, (2) número de colaboradores desligados (demitidos + demissionários) e (3) limite aceitável de desligamentos. O limite aceitável de desligamentos é de 0,875% ao mês, ou seja, uma área com 115 colaboradores pode desligar até 1 colaborador por mês, ou 12 durante o ano. Até o limite aceitável não há perda. A perda passa a ser contabilizada quando a área extrapola o limite aceitável. O valor é padrão para cada tipo de desligamento, sendo R$ 5.000 para demitidos e R$ 2.500 para demissionários. Outro fator importante é que colaboradores em período de experiência não entram na conta, pois existe um indicador específico para eles.'

    var limite_percent
    if (active_areaID == 100) {
        document.querySelector('#texto-desligamentos').innerHTML = texto_grupo
        limite_percent = 0.0125
    } else {
        document.querySelector('#texto-desligamentos').innerHTML = texto_areas
        limite_percent = 0.00875
    }

    var desligamentosFt = dados_demitidos_demissionarios()
    if (document.querySelector('#select-bx-mes').value != 'todos') {
        desligamentosFt = desligamentosFt.filter( el => {
            return el.name == document.querySelector('#select-bx-mes').value
        })
    }

    var demitidos = desligamentosFt.map( el => {
        return el.value_1
    }).reduce((a, b) => a + b, 0)

    var demissionarios = desligamentosFt.map( el => {
        return el.value_2
    }).reduce((a, b) => a + b, 0)

    var custo_medio = 3750
    if (demitidos + demissionarios > 0) {
        var custo_medio = (demitidos / (demitidos + demissionarios)) * 5000 + (demissionarios / (demitidos + demissionarios)) * 2500
    }

    var real = demitidos + demissionarios

    var quadroFt = dados_quadro()
    if (document.querySelector('#select-bx-mes').value != 'todos') {
        quadroFt = quadroFt.filter( el => {
            return el.name == document.querySelector('#select-bx-mes').value
        })
    }
    var quadro = quadroFt.map( el => {
        return el.value
    }).reduce((a, b) => a + b, 0)

    var real_percent = real / quadro

    var limite = quadro * limite_percent

    var perda = (real - limite) * custo_medio 

    var corollas = 0
    if (perda > 0) {
        corollas = perda / 125000
    }

    document.querySelector('#container-desligamentos #real').innerHTML = (real).toLocaleString('pt-BR')
    document.querySelector('#container-desligamentos #real_percent').innerHTML = 'Realizado = ' + (real_percent * 100).toFixed(3).replace(".",",") + '% am'
    document.querySelector('#container-desligamentos #limite_percent').innerHTML = 'Limite = ' + (limite_percent * 100).toFixed(3).replace(".",",") + '% am'
    document.querySelector('#container-desligamentos #limite').innerHTML = (limite).toLocaleString('pt-BR', { maximumFractionDigits: 1 })
    document.querySelector('#container-desligamentos #perda').innerHTML = 'R$ ' + (perda).toLocaleString('pt-BR', { maximumFractionDigits: 0 })
    document.querySelector('#container-desligamentos #corollas').innerHTML = (corollas.toFixed(3)).replace(".",",")
    document.querySelector('#container-desligamentos #custo_medio').innerHTML = 'R$ ' + (custo_medio).toLocaleString('pt-BR', { maximumFractionDigits: 0 })

    corollas_por_area('#container-desligamentos #area1 svg', 7)
    corollas_mensal('#container-desligamentos #area11 svg', 7)
    meta_vs_real('#container-desligamentos #area4 svg', 7)
    grafico_de_linha('#container-desligamentos #area2 svg', dados_quadro())
    grafico_barra_dois_fatores('#container-desligamentos #area3 svg', dados_demitidos_demissionarios())
    gauge_dois_fatores('#container-desligamentos #area5 svg', dados_demitidos_demissionarios())
}