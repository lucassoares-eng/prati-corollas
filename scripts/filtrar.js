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
        exibir_tabela('_GRUPO');
        area_selecionada = area
    }else {
        area_selecionada = d
        try {
            exibir_tabela(d)
        }
        catch {
            let elem = document.querySelector('#tabela-home');
            elem.innerHTML = "dados não disponíveis";
            elem.style.fontSize = "9pt";
        }
        finally {
            /* ocultar gerências de outras diretorias */
            for (let i = 1; i < cxd.length; i++) {
                if (cxd[i].value.split('_')[0] != d) {
                    cxd[i].disabled = true
                }
            }
        }
    }
    destacar_pareto(area_selecionada)
}
function filtrar_gerencia() {
    let cxd = document.querySelector('#select-bx-diretoria');
    let g=document.querySelector('#select-bx-gerencia').value;
    if(nivel=='grupo'){
        /* alterar diretoria de acordo com a gerência */
        let d=g.split('_')[0]
        cxd.value = d;
    }
    apagar_tabela();
    if(g=='todos'){
        area_selecionada = area
        /* exibir todas as gerências */
        for (let i = 0; i < cxd.length; i++) {
            cxd[i].disabled = false
        }
        try{
            if(nivel=='grupo'){exibir_tabela(area)}
            else{exibir_tabela(area.split('_')[0])}
        }
        catch{
            let elem = document.querySelector('#tabela-home');
            elem.innerHTML = "dados não disponíveis";
            elem.style.fontSize = "9pt";
        }
    }else {
        area_selecionada = g
        try {
            exibir_tabela(g)
        }
        catch {
            let elem = document.querySelector('#tabela-home');
            elem.innerHTML = "dados não disponíveis";
            elem.style.fontSize = "9pt";
        }
    }
    destacar_pareto(area_selecionada)
}
