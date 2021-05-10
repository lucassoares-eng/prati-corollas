function filtrar_metas() {
    return metasFt = metas.filter((el) => {
        return el.areaID === active_areaID
    })
}

function filtrar_real() {
    return realFt = real.filter((el) => {
        return el.areaID === active_areaID
    })
}

function filtrar_diretoria() {
    let d = document.querySelector('#select-bx-diretoria').value;
    /* alterar gerência para 'todos'*/
    let cxd = document.querySelector('#select-bx-gerencia');
    cxd.value = 'todos';
    apagar_tabela();

    /* exibir todas as gerências */
    for (let i = 0; i < cxd.length; i++) {
        cxd[i].disabled = false
    }

    if (d == 'todos') {
        active_areaID = areaID
        exibir_tabela();
    }else {
        active_areaID = parseInt(d)
        exibir_tabela()
        /* ocultar gerências de outras diretorias */
        for (let i = 1; i < cxd.length; i++) {
            if ( Math.round(cxd[i].value / 100) * 100 != d) {
                cxd[i].disabled = true
            }
        }
    }

    exibir_pareto()
    exibir_grafico_mensal()
    exibir_desligamentos()
}
function filtrar_gerencia() {
    let cxd = document.querySelector('#select-bx-diretoria')
    let g = document.querySelector('#select-bx-gerencia').value

    apagar_tabela();

    if(g == 'todos') {
        if (dirA > 0) {
            active_areaID = dirA
            cxd.value = active_areaID
        } else{
            active_areaID = areaID
            cxd.value = 'todos'
        }
        exibir_tabela()
    }else {
        active_areaID = parseInt(g)
        dirA = parseInt(document.querySelector('#select-bx-diretoria').value)
        exibir_tabela()
    }

    if (nivel == 'grupo' && g != 'todos') {
        /* alterar diretoria de acordo com a gerência */
        let d= Math.round(g / 100) * 100
        cxd.value = d
    }

    exibir_pareto()
    exibir_grafico_mensal()
    exibir_desligamentos()
}
function filtrar_mes() {
    active_mes = document.querySelector('#select-bx-mes').value
    exibir_pareto()
    exibir_grafico_mensal()
    exibir_desligamentos()
}
function change_abertura(abertura_selected) {
    abertura = abertura_selected
    exibir_pareto()
    exibir_desligamentos()
}
function removeDuplicates (data) {
    let unique = data.reduce( function (a, b) {
        if (a.indexOf(b) < 0) a.push(b)
        return a
    }, [])
    return unique
}
function ordemDescrescente (property) {
    var sortOrder = -1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function ordemCrescente (property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function dados_indicador_por_area(indicadorID){
    let bars
    let dados = []
    let metasIndicador = metas.filter((el) => {
        return el.indicadorID == indicadorID
    })
    let realIndicador = real.filter((el) => {
        return el.indicadorID == indicadorID
    })

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
            let metaAcum = metasIndicador.filter((el) => {
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
                let elAcum = realIndicador.filter((el) => {
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
    return dados
}
function dados_indicador_mensal(indicadorID){
    const mesText = [
        {name:1, text:'jan'},
        {name:2, text:'fev'},
        {name:3, text:'mar'},
        {name:4, text:'abr'},
        {name:5, text:'mai'},
        {name:6, text:'jun'},
        {name:7, text:'jul'},
        {name:8, text:'ago'},
        {name:9, text:'set'},
        {name:10, text:'out'},
        {name:11, text:'nov'},
        {name:12, text:'dez'},
    ]

    let dados = []
    let metasFtIndicador = metasFt.filter((el) => {
        return el.indicadorID == indicadorID
    })
    let realFtIndicador = realFt.filter((el) => {
        return el.indicadorID == indicadorID
    })
    if ( active_indicadorID == 'todos') {
        let metaMensal = metasFtIndicador.map( (el) => {
        return el.meta
        }).reduce((a, b) => a + b, 0) / 12
        for (let m = 0; m < 12; m++) {
        let realMensal = 0
        if (m < meses) {
            realMensal = realFtIndicador.filter( (el) => {
            return el.mes == m + 1
            }).map( (el) => {
            return el.corollas
            }).reduce((a, b) => a + b, 0)
        }
        let el = []
        el['name'] = m + 1
        el['text'] = mesText.find(el => el.name== m + 1).text
        el['meta'] = metaMensal
        el['corollas'] = realMensal
        dados.push(el)
        }
    } else {
        let metaMensal = metasFtIndicador.filter( (el) => {
        return el.indicadorID == active_indicadorID
        }).map( (el) => {
        return el.meta
        }).reduce((a, b) => a + b, 0) / 12
        for (let m = 0; m < 12; m++) {
        let realMensal = 0
        if (m < meses) {
            realMensal = realFtIndicador.filter( (el) => {
            return (el.mes == m + 1) && (el.indicadorID == active_indicadorID)
            }).map( (el) => {
            return el.corollas
            }).reduce((a, b) => a + b, 0)
        }
        let el = []
        el['name'] = m + 1
        el['text'] = mesText.find(el => el.name== m + 1).text
        el['meta'] = metaMensal
        el['corollas'] = realMensal
        dados.push(el)
        }
    }

    return dados
}

function dados_meta_vs_real(indicadorID) {
    let dados = []
    let metasFtIndicador = metasFt.filter((el) => {
        return el.indicadorID == indicadorID
    })
    let realFtIndicador = realFt.filter((el) => {
        return el.indicadorID == indicadorID
    })

    if (document.querySelector('#select-bx-mes').value == 'todos') {
        let real = []
        let realAcum = 0
        realAcum = realFtIndicador.map((el) => {
            return el.perda
        }).reduce((a, b) => a + b, 0)
        if (realAcum > 0) {
            realAcum /= 125000
        }
        real['name'] = 'R'
        real['value'] = realAcum
        dados.push(real)

        let meta = []
        let metaAcum = metasFtIndicador.map((el) => {
            return el.meta
        }).reduce((a, b) => a + b, 0) / 12 * meses
        meta['name'] = 'M'
        meta['value'] = metaAcum
        dados.push(meta)
    } else {
        let real = []
        let realAcum = 0
        realAcum = realFtIndicador.filter((el) => {
            return el.mes == document.querySelector('#select-bx-mes').value
        }).map((el) => {
            return el.perda
        })
        if (realAcum > 0) {
            realAcum /= 125000
        }
        real['name'] = 'R'
        real['value'] = realAcum
        dados.push(real)

        let meta = []
        let metaAcum = metasFtIndicador.map((el) => {
            return el.meta
        }).reduce((a, b) => a + b, 0) / 12
        meta['name'] = 'M'
        meta['value'] = metaAcum
        dados.push(meta)
    }

    return dados
}

function dados_quadro() {
    var quadro = [
        {name:1, text:'jan', value: 10},
        {name:2, text:'fev', value: 12},
        {name:3, text:'mar', value: 15},
        {name:4, text:'abr', value: 9},
        {name:5, text:'mai', value: 12},
        {name:6, text:'jun', value: 10},
        {name:7, text:'jul', value: 14},
        {name:8, text:'ago', value: 15},
        {name:9, text:'set', value: 12},
        {name:10, text:'out', value: 0},
        {name:11, text:'nov', value: 0},
        {name:12, text:'dez', value: 0},
    ]

    return quadro
}

function dados_demitidos_demissionarios() {
    var quadro = [
        {name:1, text:'jan', value_1: 3, value_2: 1},
        {name:2, text:'fev', value_1: 3, value_2: 1},
        {name:3, text:'mar', value_1: 3, value_2: 4},
        {name:4, text:'abr', value_1: 3, value_2: 2},
        {name:5, text:'mai', value_1: 0, value_2: 0},
        {name:6, text:'jun', value_1: 0, value_2: 0},
        {name:7, text:'jul', value_1: 0, value_2: 0},
        {name:8, text:'ago', value_1: 0, value_2: 0},
        {name:9, text:'set', value_1: 0, value_2: 0},
        {name:10, text:'out', value_1: 0, value_2: 0},
        {name:11, text:'nov', value_1: 0, value_2: 0},
        {name:12, text:'dez', value_1: 0, value_2: 0},
    ]

    return quadro
}