from pandas import read_csv
from bs4 import BeautifulSoup
import prettierfier
from atualizar_arvore import get_arvore
from atualizar_indicadores import get_indicadores
import atualizar_dados as dados
from tqdm import tqdm

#solicitar versao:
version = input(f'Qual versão deseja gerar (AAAAMM)? ')

#carregar usuarios:
dfUsers = read_csv(f'../dados/users.csv', sep= ';')
users = dfUsers['user'].to_list()

for user in tqdm(users):

    #parâmetros:
    area = dfUsers.loc[dfUsers.user == user, 'area'].item()
    nivel = dfUsers.loc[dfUsers.user == user, 'nivel'].item()
    email = dfUsers.loc[dfUsers.user == user, 'email'].item()
    if nivel == 'grupo':
        diretoria = 'todos'
        gerencia = 'todos'
    elif nivel == 'diretoria':
        diretoria = area
        gerencia = 'todos'
    else:
        diretoria = area.split('_')[0]
        gerencia = area

    #carregar dados da arvore:
    areaID, diretorias, gerencias = get_arvore(diretoria, gerencia)

    #carregar indicadores:
    indicadores = get_indicadores()

    #carregar dados:
    metas = dados.get_metas(diretoria, gerencia)
    real = dados.get_real(diretoria, gerencia)

    #abrir arquivo html:
    with open('../index.html', encoding='UTF-8') as html:
        soup = BeautifulSoup(html, 'html.parser')

    #atualizar proprietario:
    #selecionar tag:
    s = soup.find('script', {'id':'proprietario'})
    # criar nova tag:
    new_tag = soup.new_tag('script', id="proprietario'")
    # definir conteúdo da nova tag:
    const = 'const areaID = ' + str(areaID) + '\n   const nivel = "' + nivel + '"'
    new_tag.string = const
    # substituir tag:
    s = s.replace_with(new_tag)

    #atualizar tag arvore:
    #selecionar tag:
    s = soup.find('script', {'id':'arvore'})
    # criar nova tag:
    new_tag = soup.new_tag('script', id="arvore")
    # definir conteúdo da nova tag:
    const = 'const diretorias = ' + diretorias + '\n   const gerencias = ' + gerencias
    new_tag.string = const
    # substituir tag:
    s = s.replace_with(new_tag)

    #atualizar tag indicadores:
    #selecionar tag:
    s = soup.find('script', {'id':"indicadores"})
    # criar nova tag:
    new_tag = soup.new_tag('script', id="indicadores")
    # definir conteúdo da nova tag:
    const = 'const indicadores = ' + indicadores
    new_tag.string = const
    # substituir tag:
    s = s.replace_with(new_tag)

    #atualizar tag dados:
    #selecionar tag:
    s = soup.find('script', {'id':"dados"})
    # criar nova tag:
    new_tag = soup.new_tag('script', id="dados")
    # definir conteúdo da nova tag:
    const = 'const metas = ' + metas + '\n   const real = ' + real
    new_tag.string = const
    # substituir tag:
    s = s.replace_with(new_tag)

    # salvar html:
    with open(f'../pages/corollas_{areaID}.{version}.html', "w", encoding='UTF-8') as file:
        file.write(soup.prettify(formatter=None))