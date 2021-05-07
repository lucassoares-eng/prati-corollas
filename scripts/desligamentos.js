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
    corollas_por_area('#container-desligamentos #area1 svg', 7)
    destacar_indicador_por_area()
    corollas_mensal('#container-desligamentos #area11 svg', 7)
    destacar_indicador_mensal()
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