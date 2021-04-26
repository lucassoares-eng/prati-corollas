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