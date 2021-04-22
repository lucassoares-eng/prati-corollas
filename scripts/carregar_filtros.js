var areaID = parseInt(location.hash.split('&')[0].slice(1))
var nivel = location.hash.split('&')[1]
var active_areaID = areaID

function carregar_filtros(){
    if (nivel=='grupo') {
        abertura = 'diretorias'
    } else {
        document.querySelector('#icone-diretorias').style.display = "none";
        if (nivel=='diretoria') {
            abertura = 'gerencias'
        } else {
            document.querySelector('#icone-gerencias').style.display = "none";
            abertura = 'indicadores'
        }
    }
    /*filtro diretoria*/
    let bx = document.querySelector('#select-bx-diretoria')
    if (nivel=='grupo') {
        let opt = document.createElement('option')
        opt.value = 'todos'
        opt.innerText = 'Diretoria (todos)'
        bx.appendChild(opt)
        for (let i in diretorias){
            let opt = document.createElement('option')
            opt.value = diretorias[i].areaID
            opt.innerText = diretorias[i].areaName
            bx.appendChild(opt)
        }
    } else {
        let opt = document.createElement('option')
        opt.value = diretorias[0].areaID
        opt.innerText = diretorias[0].areaName
        bx.appendChild(opt)
    }
    /*filtro gerencia*/
    bx = document.querySelector('#select-bx-gerencia')
    if (nivel!='gerencia') {
        let opt = document.createElement('option')
        opt.value = 'todos'
        opt.innerText = 'Gerência (todos)'
        bx.appendChild(opt)
        for (let i in gerencias){
            let opt = document.createElement('option')
            opt.value = gerencias[i].areaID
            opt.innerText = gerencias[i].areaName
            bx.appendChild(opt)
        }
    } else {
        let opt = document.createElement('option')
        opt.value = gerencias[0].areaID
        opt.innerText = gerencias[0].areaName
        bx.appendChild(opt)
    }
}