from css_html_js_minify import process_single_js_file, process_single_css_file

process_single_css_file('./styles/main.css', overwrite=False)
process_single_js_file('scripts/ajustes_tela.js', overwrite=False)
process_single_js_file('scripts/carregar_filtros.js', overwrite=False)
process_single_js_file('scripts/exibir_tabela.js', overwrite=False)
process_single_js_file('scripts/filtrar.js', overwrite=False)
process_single_js_file('scripts/grafico_mensal.js', overwrite=False)
process_single_js_file('scripts/grafico_pareto.js', overwrite=False)