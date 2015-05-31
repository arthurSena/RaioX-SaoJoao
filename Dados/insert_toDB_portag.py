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
# db.create_collection("media_dias")
collections = db["media_dias"]
#bandas2.remove({})
#print bandas2.find_one()
#print db.collection_names(include_system_collections=False)
def calculateMedia(tagsDia,totalDia):
    tags = tagsDia.keys()
    mediaTags = {}
    for tag in tags:
        mediaTags[tag] = tagsDia[tag] / totalDia
    return mediaTags

def saveDiasPorTags():
    global listaJsonsTags, tag, jsonTag, data
    listaJsonsTags = []
    for tag in uniqueTags:
        jsonTag = {"name": tag, "datas": []}
        for data in datas:
            if tag in data['media_tags']:
                jsonTag["datas"].append(data)
        print jsonTag
        collections.insert_one(jsonTag)
        listaJsonsTags.append(jsonTag)

def sort_date(date_list):
    temp = date_list[5:len(date_list)-1]
    for i in date_list[0:4]:
        temp.append(i)
    return temp

datas = []
uniqueTags = set()

with codecs.open('tudo.json', encoding='utf-8-sig') as data_file:
    dados = json.load(data_file)
    all = []
    keys_temp = sort_date(sorted(dados.keys()))

    for data in keys_temp:
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

        print dataLegal
        datas.append(dataLegal)
        ############################################## PARA INSERIR DESCOMENTAR ESSA LINHA
        collections.insert_one(dataLegal)




# saveDiasPorTags()

