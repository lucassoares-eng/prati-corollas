function exibir_desligamentos() {
    var real = 50
    var real_percent = 0.005
    var limite = 100
    var corollas = dados_meta_vs_real(7)[0].value
    var perda = corollas * 125000
    var custo_medio = 3750

    document.querySelector('#container-desligamentos #real').innerHTML = (real).toLocaleString('pt-BR')
    document.querySelector('#container-desligamentos #real_percent').innerHTML = 'Realizado = ' + (real_percent * 100).toFixed(3).replace(".",",") + '% am'
    document.querySelector('#container-desligamentos #limite').innerHTML = (limite).toLocaleString('pt-BR')
    document.querySelector('#container-desligamentos #perda').innerHTML = 'R$ ' + (perda).toLocaleString('pt-BR')
    document.querySelector('#container-desligamentos #corollas').innerHTML = (corollas.toFixed(3)).replace(".",",")
    document.querySelector('#container-desligamentos #custo_medio').innerHTML = 'R$ ' + (custo_medio).toLocaleString('pt-BR')

    corollas_por_area('#container-desligamentos #area1 svg', 7)
    corollas_mensal('#container-desligamentos #area11 svg', 7)
    meta_vs_real('#container-desligamentos #area4 svg', 7)
    grafico_de_linha('#container-desligamentos #area2 svg')
    grafico_barra_dois_fatores('#container-desligamentos #area3 svg', dados_demitidos_demissionarios())
    gauge_dois_fatores('#container-desligamentos #area5 svg', dados_demitidos_demissionarios())
}