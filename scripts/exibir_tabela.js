function apagar_tabela() {
    document.getElementById("loader").style.display = "initial";
    let myNode = document.querySelector("#tabela-home");
    myNode.innerHTML = '';
}

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

function get_num_meses() {
    let arr = real.map((el) => {
        return el.mes
    })
    return max = arr.reduce(function(a, b) {
        return Math.max(a, b);
    });
}

function exibir_tabela() {

    var metasFt = filtrar_metas()
    var realFt = filtrar_real()
    var meses = get_num_meses()

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
    for (let i in metasFt) {
        /*linha*/
        let l1 = document.createElement('div');
        l1.className = 'row'
        l1.onmouseover = function() {over(this)}
        l1.onmouseout = function() {out(this)}
        let p = document.querySelector('#tabela-home')
        p.appendChild(l1)
        let c1 = document.createElement('div')
        c1.className = 'row-name'
        l1.appendChild(c1)
        let span1 = document.createElement('nav')
        span1.textContent = indicadores.find(element => element.indicadorID === metasFt[i].indicadorID).indicadorName
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
            if (real[k].indicador==metas[i].indicador){
                arr3.push(real[k])
            }
        }
        /*sub-row meta*/
        for (let j=0; j < 12; j++) {
            let cm = document.createElement('div')
            cm.className = 'container-valor'
            l2.appendChild(cm)
            let sm = document.createElement('span')
            sm.className = 'span-valor'
            let v=metas[i].meta/12
            sm.textContent = v.toFixed(2)
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
            if (j < meses.length){
                let v=0.00
                sm.textContent=v.toFixed(2)
                for (let k in arr3){
                    if(j+1==arr3[k].mes){
                        sm.textContent = arr3[k].corollas.toFixed(2)
                        totalReal[k] += arr3[k].corollas
                    }
                }
                if(sm.textContent > metas[i].meta/12){
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
            let v=metas[i].ano_anterior/12
            sm.textContent = v.toFixed(2)
            cm.appendChild(sm)
            totalAnoAnterior[j] += v
        }
        /*meta acum*/
        let cma = document.createElement('div')
        cma.className = 'container-valor'
        l2.appendChild(cma)
        let sma = document.createElement('div')
        sma.className = 'span-valor'
        let v=(metas[i].meta/12)*meses.length
        sma.textContent = v.toFixed(2)
        cma.appendChild(sma)
        totalMeta[12] += v
        /*meta total*/
        let cmt = document.createElement('div')
        cmt.className = 'container-valor'
        l2.appendChild(cmt)
        let smt = document.createElement('span')
        smt.className = 'span-valor'
        smt.textContent = metas[i].meta.toFixed(2)
        cmt.appendChild(smt)
        totalMeta[13] += metas[i].meta
        /*real acum*/
        let cra = document.createElement('div')
        cra.className = 'container-valor'
        l3.appendChild(cra)
        let sra = document.createElement('div')
        sra.className = 'span-valor'
        if(arr3.length>0){
            sra.textContent = arr3[arr3.length-1].corollas.toFixed(2)
            totalReal[12] += arr3[arr3.length-1].corollas
        }
        else{
            let v=0.00
            sra.textContent = v.toFixed(2)
        }
        if(sra.textContent>(metas[i].meta/12)*meses.length){
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
        if(arr3.length>0){
            srt.textContent = arr3[arr3.length-1].corollas.toFixed(2)
            totalReal[13] += arr3[arr3.length-1].corollas
        }
        else{
            let v=0.00
            srt.textContent = v.toFixed(2)
        }
        if(srt.textContent>metas[i].meta){
            srt.className += ' vermelho'
        }else{
            srt.className += ' verde'
        }
        crt.appendChild(srt)
        /*ano anterior acum*/
        let caaa = document.createElement('div')
        caaa.className = 'container-valor'
        l4.appendChild(caaa)
        let saaa = document.createElement('div')
        saaa.className = 'span-valor'
        v=(metas[i].ano_anterior/12)*meses.length
        saaa.textContent = v.toFixed(2)
        caaa.appendChild(saaa)
        totalAnoAnterior[12] += v
        /*ano anterior total*/
        let caa = document.createElement('div')
        caa.className = 'container-valor'
        l4.appendChild(caa)
        let saa = document.createElement('span')
        saa.className = 'span-valor'
        saa.textContent = metas[i].ano_anterior.toFixed(2)
        caa.appendChild(saa)
        totalAnoAnterior[13] += metas[i].ano_anterior
    }
    for (let i in totalMeta) {
        /*linha total meta*/
        let cmt = document.createElement('div')
        cmt.className = 'total container-valor'
        l2.appendChild(cmt)
        let smt = document.createElement('span')
        smt.className = 'span-valor'
        smt.textContent = totalMeta[i].toFixed(2)
        cmt.appendChild(smt)
        /*linha total real*/
        let crt = document.createElement('div')
        crt.className = 'total2 container-valor'
        l3.appendChild(crt)
        let srt = document.createElement('span')
        srt.className = 'span-valor'
        if (i < meses.length | i >11){
                srt.textContent = totalReal[i].toFixed(2)
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
        saat.textContent = totalAnoAnterior[i].toFixed(2)
        caat.appendChild(saat)
    }
    ajustar_tela()
    document.getElementById("loader").style.display = "none";
}