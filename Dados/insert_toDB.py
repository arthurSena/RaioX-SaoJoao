from pymongo import MongoClient
import json, codecs, datetime


#var d = new MongoInternals.RemoteCollectionDriver("mongodb://andryw:4n4lytics@ds033607.mongolab.com:33607/raiox-sj");
#Bandas = new Mongo.Collection("banda_tag", { _driver: d });
uri = "mongodb://andryw:4n4lytics@ds033607.mongolab.com:33607/raiox-sj"
client = MongoClient(uri)
#client = MongoClient('ds033607.mongolab.com', 33607)
db = client['raiox-sj']
prog = db.bandas
##################CRIAR COLECAO, SE NAO EXISTER
db.create_collection("bandas2")
bandas2 = db.bandas2
#bandas2.remove({})
def sort_date(date_list):
    temp = date_list[5:len(date_list)-1]
    for i in date_list[0:4]:
        temp.append(i)
    return temp

print bandas2.find_one()
print db.collection_names(include_system_collections=False)
with codecs.open('tudo.json', encoding='utf-8-sig') as data_file:
    dados = json.load(data_file)
    all = []
    keys_temp = sort_date(sorted(dados.keys()))  
    for data in keys_temp:
        print data
        jsonLegal = {'data':data,'bandas':[]}
        for banda in dados[data].keys():
            bandaLegal = {'nome':banda,'tags':[]}

            for tag in dados[data][banda].keys():
                print dados[data][banda][tag]
                tagLegal = {'tag':tag,'value':float(dados[data][banda][tag])}
                bandaLegal['tags'].append(tagLegal)
            jsonLegal['bandas'].append(bandaLegal)
        ############################################## PARA INSERIR DESCOMENTAR ESSA LINHA
        #   bandas2.insert_one(jsonLegal)

