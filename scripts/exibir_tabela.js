function apagar_tabela() {
    document.getElementById("loader").style.display = "initial";
    let myNode = document.querySelector("#tabela-home");
    myNode.innerHTML = '';
}

function exibir_tabela() {

    /*filtrar dados*/
    metasFt = filtrar_metas()
    realFt = filtrar_real()

    /*incluir meta para os indicadores com real > 0*/
    var indicReal = removeDuplicates( 
        realFt.map( (el) => {
            return el.indicadorID
        })
    )
    var indicMeta = metasFt.map( (el) => {
        return el.indicadorID
    })
    var incluir = indicReal.filter( (el) => {
        return (indicMeta.includes(el) == false)
    })
    for (let i in incluir) {
        let el = []
        el["indicadorID"] = incluir[i]
        el["areaID"] = active_areaID
        el["ano_anterior"] = 0
        el["meta"] = 0
        metasFt.push(el)
    }

    /*metas em ordem decrescente por realAcum*/
    /*incluir realAcum*/
    indicMeta = metasFt.map( (el) => {
        return el.indicadorID
    })
    incluir = []
    for (let i in metasFt) {
        var realAcum = realFt.filter( (el) => {
            return el.indicadorID == metasFt[i].indicadorID
        }).map( (el) => {
            return el.perda
        }).reduce((a, b) => a + b, 0)
        if (realAcum > 0) {
            realAcum /= 125000 
        } else {
            realAcum = 0
        }
        metasFt[i].realAcum = realAcum
    }
    /*ordenar*/
    metasFt.sort(ordemDescrescente("realAcum"))

    /*renderizar tabela*/
    let totalMeta = new Array(14).fill(0)
    let totalReal = new Array(14).fill(0)
    let totalAnoAnterior = new Array(14).fill(0)

    /*linha total*/
    let l1 = document.createElement('div');
    l1.className = 'row'
    let p = document.querySelector('#tabela-home')
    p.appendChild(l1)
    let c1 = document.createElement('div')
    c1.className = 'total row-name'
    c1.id = 'total'
    l1.appendChild(c1)
    let span1 = document.createElement('span');
    span1.textContent = 'Total'
    c1.appendChild(span1)
    let c2 = document.createElement('div')
    c2.className = 'sub-container'
    l1.appendChild(c2)
    /*linha meta total*/
    let l2 = document.createElement('div')
    l2.className = 'sub-row'
    c2.appendChild(l2)
    let c21 = document.createElement('div')
    c21.className = 'total row-subname'
    l2.appendChild(c21)
    let span2 = document.createElement('span');
    span2.textContent = 'META'
    c21.appendChild(span2)
    /*linha real total*/
    let l3 = document.createElement('div')
    l3.className = 'sub-row'
    c2.appendChild(l3)
    let c23 = document.createElement('div')
    c23.className = 'total row-subname'
    l3.appendChild(c23)
    let span3 = document.createElement('span');
    span3.textContent = 'REAL'
    c23.appendChild(span3)
    /*linha real ano anterior*/
    let l4 = document.createElement('div')
    l4.className = 'sub-row'
    c2.appendChild(l4)
    let c24 = document.createElement('div')
    c24.className = 'total row-subname'
    l4.appendChild(c24)
    let span4 = document.createElement('span');
    span4.textContent = '2020'
    c24.appendChild(span4)
    /*linha por indicador*/
    for (let i in metasFt) {
        /*linha*/
        let l1 = document.createElement('div');
        l1.className = 'row'
        l1.onmouseover = function() {over(this)}
        l1.onmouseout = function() {out(this)}
        let p = document.querySelector('#tabela-home')
        p.appendChild(l1)
        let c1 = document.createElement('nav')
        c1.className = 'row-name'
        l1.appendChild(c1)
        let span1 = document.createElement('label')
        span1.textContent = indicadores.find(element => element.indicadorID === metasFt[i].indicadorID).indicadorName
        span1.htmlFor = 'rd-indicador' + metasFt[i].indicadorID
        try {
            if (document.querySelector('#'+span1.htmlFor)){
                span1.className = 'link'
            }
        } catch {}
        c1.appendChild(span1)
        let c2 = document.createElement('div')
        c2.className = 'sub-container'
        l1.appendChild(c2)
        /*linha meta*/
        let l2 = document.createElement('div')
        l2.className = 'sub-row'
        c2.appendChild(l2)
        let c21 = document.createElement('div')
        c21.className = 'row-subname'
        l2.appendChild(c21)
        let span2 = document.createElement('span');
        span2.textContent = 'META'
        c21.appendChild(span2)
        /*linha real*/
        let l3 = document.createElement('div')
        l3.className = 'sub-row'
        c2.appendChild(l3)
        let c23 = document.createElement('div')
        c23.className = 'row-subname'
        l3.appendChild(c23)
        let span3 = document.createElement('span');
        span3.textContent = 'REAL'
        c23.appendChild(span3)
        /*linha real ano anterior*/
        let l4 = document.createElement('div')
        l4.className = 'sub-row'
        c2.appendChild(l4)
        let c24 = document.createElement('div')
        c24.className = 'row-subname'
        l4.appendChild(c24)
        let span4 = document.createElement('span');
        span4.textContent = '2020'
        c24.appendChild(span4)
        /*filtrar real*/
        let arr3 = []
        for (let k in realFt){
            if (realFt[k].indicadorID==metasFt[i].indicadorID){
                arr3.push(realFt[k])
            }
        }
        /*sub-row meta*/
        for (let j=0; j < 12; j++) {
            let cm = document.createElement('div')
            cm.className = 'container-valor'
            l2.appendChild(cm)
            let sm = document.createElement('span')
            sm.className = 'span-valor'
            let v=metasFt[i].meta/12
            sm.textContent = v.toFixed(2).replace(".",",")
            cm.appendChild(sm)
            totalMeta[j] += v
        }
        /*sub-row real*/
        for (let j=0; j < 12; j++) {
            let cm = document.createElement('div')
            cm.className = 'container-valor'
            l3.appendChild(cm)
            let sm = document.createElement('span')
            sm.className = 'span-valor'
            if (j < meses) {
                let v
                try {
                    v = arr3.find(element => element.mes === j + 1).corollas
                } catch {
                    v = 0.00
                }
                sm.textContent = v.toFixed(2).replace(".",",")
                totalReal[j] += v
                if(v > metasFt[i].meta/12){
                    sm.className += ' vermelho'
                }else{
                    sm.className += ' verde'
                }
            }
            cm.appendChild(sm)
        }
        /*sub-row real ano anterior*/
        for (let j=0; j < 12; j++) {
            let cm = document.createElement('div')
            cm.className = 'container-valor'
            l4.appendChild(cm)
            let sm = document.createElement('span')
            sm.className = 'span-valor'
            let v=metasFt[i].ano_anterior/12
            sm.textContent = v.toFixed(2).replace(".",",")
            cm.appendChild(sm)
            totalAnoAnterior[j] += v
        }
        /*meta acum*/
        let cma = document.createElement('div')
        cma.className = 'container-valor'
        l2.appendChild(cma)
        let sma = document.createElement('div')
        sma.className = 'span-valor'
        let v=(metasFt[i].meta/12)*meses
        sma.textContent = v.toFixed(2).replace(".",",")
        cma.appendChild(sma)
        totalMeta[12] += v
        /*meta total*/
        let cmt = document.createElement('div')
        cmt.className = 'container-valor'
        l2.appendChild(cmt)
        let smt = document.createElement('span')
        smt.className = 'span-valor'
        smt.textContent = metasFt[i].meta.toFixed(2).replace(".",",")
        cmt.appendChild(smt)
        totalMeta[13] += metasFt[i].meta
        /*real acum*/
        let cra = document.createElement('div')
        cra.className = 'container-valor'
        l3.appendChild(cra)
        let sra = document.createElement('div')
        sra.className = 'span-valor'
        let va = 0
        if(arr3.length>0){
            va = arr3.map((el) => {
                return el.perda
            }).reduce((a, b) => a + b, 0)
            if (va > 0) {
                va = va / 125000
            } else{
                va = 0
            }
            sra.textContent = va.toFixed(2).replace(".",",")
            totalReal[12] += va
            totalReal[13] += va
        }else{
            sra.textContent = va.toFixed(2).replace(".",",")
        }
        if(va > (metasFt[i].meta/12)*meses){
            sra.className += ' vermelho'
        }else{
            sra.className += ' verde'
        }
        cra.appendChild(sra)
        /*real total*/
        let crt = document.createElement('div')
        crt.className = 'container-valor'
        l3.appendChild(crt)
        let srt = document.createElement('span')
        srt.className = 'span-valor'
        srt.textContent = va.toFixed(2).replace(".",",")
        if(va > (metasFt[i].meta)) {
            srt.className += ' vermelho'
        } else {
            srt.className += ' verde'
        }
        crt.appendChild(srt)
        /*ano anterior acum*/
        let caaa = document.createElement('div')
        caaa.className = 'container-valor'
        l4.appendChild(caaa)
        let saaa = document.createElement('div')
        saaa.className = 'span-valor'
        v=(metasFt[i].ano_anterior/12)*meses
        saaa.textContent = v.toFixed(2).replace(".",",")
        caaa.appendChild(saaa)
        totalAnoAnterior[12] += v
        /*ano anterior total*/
        let caa = document.createElement('div')
        caa.className = 'container-valor'
        l4.appendChild(caa)
        let saa = document.createElement('span')
        saa.className = 'span-valor'
        saa.textContent = metasFt[i].ano_anterior.toFixed(2).replace(".",",")
        caa.appendChild(saa)
        totalAnoAnterior[13] += metasFt[i].ano_anterior
    }
    for (let i in totalMeta) {
        /*linha total meta*/
        let cmt = document.createElement('div')
        cmt.className = 'total container-valor'
        l2.appendChild(cmt)
        let smt = document.createElement('span')
        smt.className = 'span-valor'
        smt.textContent = totalMeta[i].toFixed(2).replace(".",",")
        cmt.appendChild(smt)
        /*linha total real*/
        let crt = document.createElement('div')
        crt.className = 'total2 container-valor'
        l3.appendChild(crt)
        let srt = document.createElement('span')
        srt.className = 'span-valor'
        if (i < meses | i >11){
                srt.textContent = totalReal[i].toFixed(2).replace(".",",")
                if(totalReal[i] > totalMeta[i]){
                    srt.className += ' vermelho'
                }else{
                    srt.className += ' verde'
                }
            }
        crt.appendChild(srt)
        /*linha total ano anterior*/
        let caat = document.createElement('div')
        caat.className = 'total container-valor'
        l4.appendChild(caat)
        let saat = document.createElement('span')
        saat.className = 'span-valor'
        saat.textContent = totalAnoAnterior[i].toFixed(2).replace(".",",")
        caat.appendChild(saat)
    }
    ajustar_tela()
    document.getElementById("loader").style.display = "none";
}