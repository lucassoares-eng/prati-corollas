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

    if (abertura == 'diretorias') {
        destacar_pareto()
    }else {
        exibir_pareto()
    }

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

    if (abertura == 'gerencias') {
        destacar_pareto()
    }else {
        exibir_pareto()
    }

    exibir_grafico_mensal()
    exibir_desligamentos()
}
function filtrar_mes() {
    active_mes = document.querySelector('#select-bx-mes').value
    destacar_grafico_mensal()
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