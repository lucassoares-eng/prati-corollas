from pandas import ExcelFile, DataFrame, read_csv

def get_desligamentos(diretoria, gerencia):
    xl = ExcelFile('M:\PERDAS_COROLLAS\COROLLAS 2021\RELATORIOS_BASE\desligamentos\Desligamentos.xlsx')

    #desligamentos maior 90 dias
    df = DataFrame()
    for sheet in xl.sheet_names:
        if 'Maior90' in sheet:
            dfSheet = xl.parse(sheet_name= sheet, skiprows=1, header=0, usecols=[0,1,2,3,4], names= ['diretoria', 'gerencia', 'quadro', 'demitidos', 'demissionarios'])
            dfSheet['mes'] = int(sheet[:2])
            #incluir area
            dfSheet.loc[dfSheet.gerencia != '_TOTAL', 'area'] = dfSheet.diretoria + '_' + dfSheet.gerencia
            dfSheet.loc[dfSheet.gerencia == '_TOTAL', 'area'] = dfSheet.diretoria
            df = df.append(dfSheet)

    """ para o grupo, os desligamento < 90 dias estão sendo somados direto na planilha Desligamentos.xlsx
    if diretoria == 'todos':
        #desligamentos menor 90 dias
        for sheet in xl.sheet_names:
            if 'Menor90' in sheet:
                dfSheet = xl.parse(sheet_name= sheet, skiprows=1, header=0, usecols=[3,4], names= ['demitidos', 'demissionarios'])
                #somar
                df.loc[(df.diretoria == '_GRUPO') & (df.mes == int(sheet[:2])), 'demitidos'] += dfSheet.demitidos.item()
                df.loc[(df.diretoria == '_GRUPO') & (df.mes == int(sheet[:2])), 'demissionarios'] += dfSheet.demissionarios.item()
    """

    #carregar dados da arvore:
    dfArvore = read_csv('../dados/arvore.csv', sep= ';', encoding='latin 1', usecols=[0, 1], dtype={0: 'Int64'})
    #filtrar somente areas que constam na arvore:
    areas = dfArvore['area'].to_list()
    df = df.loc[df.area.isin(areas)]
    #join areaID:
    df = df.join(dfArvore.set_index('area'), on= 'area').reset_index()

    if diretoria != 'todos':
        df = df.loc[df.diretoria == diretoria]
        if gerencia != 'todos':
            df = df.loc[df.area == gerencia]

    df = df[['areaID', 'mes', 'quadro', 'demitidos', 'demissionarios']]

    return df.to_json(orient='records', force_ascii= False)