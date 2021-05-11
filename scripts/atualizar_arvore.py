from pandas import read_csv

def get_arvore(diretoria, gerencia):  
    #carregar dados da árvore:
    dfArvore = read_csv('../dados/arvore.csv', sep= ';', encoding='latin 1')

    #filtrar areaID:
    if diretoria == 'todos':
        areaID = 100
    else:
        if gerencia == 'todos':
            areaID = dfArvore.loc[dfArvore.area == diretoria, 'areaID'].item()
        else:
            areaID = dfArvore.loc[dfArvore.area == gerencia, 'areaID'].item()

    #filtrar diretorias:
    if diretoria == 'todos':
        diretorias = dfArvore.loc[dfArvore.nivel=='diretoria', ['areaID','area', 'areaName']]
    else:
        diretorias = dfArvore.loc[dfArvore.area==diretoria, ['areaID','area', 'areaName']]
    diretorias = diretorias[['areaID', 'areaName']].to_json(orient='records', force_ascii= False)

    #filtrar gerências:
    if gerencia == 'todos':
        if diretoria == 'todos':
            gerencias = dfArvore.loc[dfArvore.nivel=='gerencia', ['areaID','area', 'areaName']]
        else:
            gerencias = dfArvore.loc[dfArvore.nivel=='gerencia', ['areaID','area', 'areaName']]
            gerencias = dfArvore.loc[(dfArvore.area.str.split('_').str[0]==diretoria)&(dfArvore.nivel=='gerencia'), ['areaID','area', 'areaName']]
    else:
        gerencias = dfArvore.loc[dfArvore.area==gerencia, ['areaID','area', 'areaName']]
    gerencias = gerencias[['areaID', 'areaName']].to_json(orient='records', force_ascii= False)
    
    return areaID, diretorias, gerencias