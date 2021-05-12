from bs4 import BeautifulSoup
from atualizar_arvore import get_arvore
from atualizar_indicadores import get_indicadores
from atualizar_desligamentos import get_desligamentos
import atualizar_dados as dados

#parâmetros
diretoria = 'todos'
gerencia = 'todos'

#carregar dados da arvore
areaID, diretorias, gerencias = get_arvore(diretoria, gerencia)

#carregar indicadores
indicadores = get_indicadores()

#carregar dados
metas = dados.get_metas(diretoria, gerencia)
real = dados.get_real(diretoria, gerencia)

#carregar desligamentos
desligamentos = get_desligamentos(diretoria, gerencia)

#abrir arquivo html
with open('../indexDev.html', encoding='UTF-8') as html:
    soup = BeautifulSoup(html, 'html.parser')

#atualizar tag arvore
#selecionar tag
s = soup.find('script', {'id':'arvore'})
#criar nova tag
new_tag = soup.new_tag('script', id="arvore")
#definir conteúdo da nova tag
const = 'const diretorias = ' + diretorias + '\n   const gerencias = ' + gerencias
new_tag.string = const
#substituir tag
s = s.replace_with(new_tag)

#atualizar tag indicadores
#selecionar tag
s = soup.find('script', {'id':"indicadores"})
#criar nova tag
new_tag = soup.new_tag('script', id="indicadores")
#definir conteúdo da nova tag
const = 'const indicadores = ' + indicadores
new_tag.string = const
#substituir tag
s = s.replace_with(new_tag)

#atualizar tag dados
#selecionar tag
s = soup.find('script', {'id':"dados"})
#criar nova tag
new_tag = soup.new_tag('script', id="dados")
#definir conteúdo da nova tag
const = 'const metas = ' + metas + '\n   const real = ' + real
new_tag.string = const
#substituir tag
s = s.replace_with(new_tag)

#atualizar tag desligamentos
#selecionar tag
s = soup.find('script', {'id':"dados-desligamentos"})
#criar nova tag
new_tag = soup.new_tag('script', id="dados-desligamentos")
#definir conteúdo da nova tag
const = 'const desligamentos = ' + desligamentos
new_tag.string = const
#substituir tag
s = s.replace_with(new_tag)

#salvar html
with open("../teste.html", "w", encoding='UTF-8') as file:
    file.write(soup.prettify(formatter=None))

print('Página de teste gerada!')