from pandas import read_csv, DataFrame
from os import listdir
import json

def get_metas(diretoria, gerencia):
    #carregar dados de meta:
    dfMetas = read_csv('../dados/metas.csv', sep= ';', dtype= 'str')
    dfMetas.perda = dfMetas.perda.replace({',': '.'}, regex= True).astype('float')
    dfMetas.corollas = dfMetas.corollas.replace({',': '.'}, regex= True).astype('float')
    dfMetas.meta = dfMetas.meta.replace({',': '.'}, regex= True).astype('float')
    dfMetas = dfMetas.rename(columns={'corollas':'ano_anterior'})
    #incluir area
    dfMetas.loc[dfMetas.gerencia != '_TOTAL', 'area'] = dfMetas.diretoria + '_' + dfMetas.gerencia
    dfMetas.loc[dfMetas.gerencia == '_TOTAL', 'area'] = dfMetas.diretoria
    #carregar dados da arvore:
    dfArvore = read_csv('../dados/arvore.csv', sep= ';', encoding='latin 1', usecols=[0, 1], dtype={0: 'Int64'})
    #join areaID:
    dfMetas = dfMetas.join(dfArvore.set_index('area'), on= 'area', how= 'inner')
    #carregar dados de indicadores:
    dfIndicadores = read_csv('../dados/indicadores.csv', sep= ';', encoding='latin 1', usecols=[0, 1])
    #join areaID:
    dfMetas = dfMetas.join(dfIndicadores.set_index('indicador'), 'indicador')

    if diretoria != 'todos':
        dfMetas = dfMetas.loc[dfMetas.diretoria == diretoria]
        if gerencia != 'todos':
            dfMetas = dfMetas.loc[dfMetas.area == gerencia]

    #limpar dfMetas
    dfMetas = dfMetas[['indicadorID', 'areaID', 'ano_anterior', 'meta']]

    return dfMetas.to_json(orient='records', force_ascii= False)

def get_real(diretoria, gerencia):
    # carregar lista de meses:
    arquivos = listdir('../dados')
    meses = []
    for a in arquivos:
        if 'real_' in a:
            meses.append(a)
    meses.sort()

    # carregar dados real:
    dfReal = DataFrame()
    for mes in meses:
        dfTemp = read_csv(f'../dados/{mes}', sep=';', dtype='str')
        dfTemp['mes'] = int(mes[5:7])
        dfReal = dfReal.append(dfTemp)
    # excluir linhas vazias:
    dfReal = dfReal[~dfReal['indicador'].isna()]
    # converter str para float:
    dfReal.perda = dfReal.perda.replace({',': '.'}, regex= True).astype('float')
    dfReal.corollas = dfReal.corollas.replace({',': '.'}, regex= True).astype('float')
    # excluir linhas com perda == 0:
    dfReal = dfReal.loc[dfReal.perda != 0]
    #incluir area
    dfReal = dfReal.reset_index()
    dfReal.loc[dfReal.gerencia != '_TOTAL', 'area'] = dfReal.diretoria + '_' + dfReal.gerencia
    dfReal.loc[dfReal.gerencia == '_TOTAL', 'area'] = dfReal.diretoria
    #carregar dados da arvore:
    dfArvore = read_csv('../dados/arvore.csv', sep= ';', encoding='latin 1', usecols=[0, 1], dtype={0: 'Int64'})
    #join areaID:
    dfReal = dfReal.join(dfArvore.set_index('area'), on= 'area', how= 'inner')
    #carregar dados de indicadores:
    dfIndicadores = read_csv('../dados/indicadores.csv', sep= ';', encoding='latin 1', usecols=[0, 1])
    #join areaID:
    dfReal = dfReal.join(dfIndicadores.set_index('indicador'), 'indicador')

    if diretoria != 'todos':
        dfReal = dfReal.loc[dfReal.diretoria == diretoria]
        if gerencia != 'todos':
            dfReal = dfReal.loc[dfReal.area == gerencia]

    #limpar dfMetas
    dfReal = dfReal[['indicadorID', 'areaID', 'mes', 'perda', 'corollas']]

    return dfReal.to_json(orient='records', force_ascii= False)