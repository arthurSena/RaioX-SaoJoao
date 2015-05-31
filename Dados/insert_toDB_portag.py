from pymongo import MongoClient
import json, codecs


#var d = new MongoInternals.RemoteCollectionDriver("mongodb://andryw:4n4lytics@ds033607.mongolab.com:33607/raiox-sj");
#Bandas = new Mongo.Collection("banda_tag", { _driver: d });
uri = "mongodb://andryw:4n4lytics@ds033607.mongolab.com:33607/raiox-sj"
client = MongoClient(uri)
#client = MongoClient('ds033607.mongolab.com', 33607)
db = client['raiox-sj']
#prog = db.bandas
##################CRIAR COLECAO, SE NAO EXISTER
db.create_collection("tag_dias")
collections = db["tag_dias"]
#bandas2.remove({})
#print bandas2.find_one()
#print db.collection_names(include_system_collections=False)
def calculateMedia(tagsDia,totalDia):
    tags = tagsDia.keys()
    mediaTags = {}
    for tag in tags:
        mediaTags[tag] = tagsDia[tag] / totalDia
    return mediaTags

datas = []
uniqueTags = set()
with codecs.open('tudo.json', encoding='utf-8-sig') as data_file:
    dados = json.load(data_file)
    all = []
    for data in dados.keys():
        dataLegal = {'data':data,'bandas':[]}
        tagsDia = {}
        totalDia = 0
        for banda in dados[data].keys():
            dataLegal['bandas'].append(banda)
            for tag in dados[data][banda].keys():
                value = float(dados[data][banda][tag])
                totalDia += value
                uniqueTags.add(tag)
                if (not (tagsDia.has_key(tag))):
                    tagsDia[tag] = 0
                tagsDia[tag] += value
        mediaTags = calculateMedia(tagsDia,totalDia)
        dataLegal['media_tags'] = mediaTags

        #print dataLegal
        datas.append(dataLegal)
        ############################################## PARA INSERIR DESCOMENTAR ESSA LINHA
        #bandas2.insert_one(jsonLegal)

listaJsonsTags = []
for tag in uniqueTags:
    jsonTag = {"name":tag,"datas":[]}
    for data in datas:
        if tag in data['media_tags']:
            jsonTag["datas"].append(data)
    print jsonTag
    collections.insert_one(jsonTag)
    listaJsonsTags.append(jsonTag)

