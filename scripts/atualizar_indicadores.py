from pandas import read_csv
import json

def get_indicadores():
    indicadores = read_csv('dados/indicadores.csv', sep= ';', encoding='latin 1', usecols=[0, 2])
    indicadores = indicadores.to_json(orient='records', force_ascii= False)
    
    return indicadores