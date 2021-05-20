from pandas import ExcelFile, DataFrame

def get_folha_fat(diretoria, gerencia):
    xl = ExcelFile('M:/PERDAS_COROLLAS/COROLLAS 2021/RELATORIOS_BASE/folha_fat/real_folha_fat.xlsx')
    meses = xl.parse(sheet_name= 'RELATÓRIO', skiprows=1, nrows=1, usecols=[2]).sum().item()
    df = DataFrame()
    #dados grupo:
    for mes in range(meses):
        temp = {}
        dfHead = xl.parse(sheet_name= 'RELATÓRIO', skiprows=4, usecols=[4 + 8 * (mes + 1)], nrows=5)
        temp['area'] = '_GRUPO'
        temp['mes'] = str(mes + 1)
        temp['meta_percent'] = dfHead.iloc[0].item()
        temp['meta_folha'] = dfHead.iloc[1].item()
        temp['meta_fat'] = dfHead.iloc[3].item()
        temp['real_fat'] = dfHead.iloc[4].item()
        df = df.append(temp, ignore_index=True)

    #dados áreas:

    return df#.to_json(orient='records', force_ascii= False)

folha = get_folha_fat('todos', 'todos')
print(folha)