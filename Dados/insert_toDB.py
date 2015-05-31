from pymongo import MongoClient
import json, codecs

client = MongoClient('localhost', 3001)
db = client.meteor
prog = db.bandas
##################CRIAR COLECAO, SE NAO EXISTER
#db.create_collection("bandas2")
bandas2 = db.bandas2
#bandas2.remove({})
print bandas2.find_one()
print db.collection_names(include_system_collections=False)
with codecs.open('tudo.json', encoding='utf-8-sig') as data_file:
    dados = json.load(data_file)
    all = []
    for data in dados.keys():
        jsonLegal = {'data':data,'bandas':[]}
        for banda in dados[data].keys():
            bandaLegal = {'nome':banda,'tags':[]}

            for tag in dados[data][banda].keys():
                print dados[data][banda][tag]
                tagLegal = {'tag':tag,'value':float(dados[data][banda][tag])}
                bandaLegal['tags'].append(tagLegal)
            jsonLegal['bandas'].append(bandaLegal)
        ############################################## PARA INSERIR DESCOMENTAR ESSA LINHA
        #bandas2.insert_one(jsonLegal)

