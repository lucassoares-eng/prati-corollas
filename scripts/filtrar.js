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
            if ( Math.round(cxd[i].value / 10) * 10 != d) {
                cxd[i].disabled = true
            }
        }
    }
    destacar_pareto()
}
function filtrar_gerencia() {
    let cxd = document.querySelector('#select-bx-diretoria');
    let g = document.querySelector('#select-bx-gerencia').value;
    if (nivel == 'grupo') {
        /* alterar diretoria de acordo com a gerência */
        let d= Math.round(g / 10) * 10
        cxd.value = d
    }
    apagar_tabela();
    if(g == 'todos') {
        active_areaID = areaID
        cxd.value = 'todos'
        /* exibir todas as gerências */
        for (let i = 0; i < cxd.length; i++) {
            cxd[i].disabled = false
        }
        exibir_tabela()
    }else {
        active_areaID = parseInt(g)
        exibir_tabela()
    }
    destacar_pareto()
}
function filtrar_mes() {
    exibir_pareto()
}