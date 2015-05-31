__author__ = 'andryw'
import codecs

programacao = codecs.open('tudo.csv', encoding='utf-8-sig')

documentos = {}

import json

for line in programacao.readlines():
    if line:
        temp = line.replace("\n","").split(",")
        data = temp[0]
        banda = temp[1]
        print banda
        tag = temp[2]
        value = temp[3]

        if (not documentos.has_key(data)):
            documentos[data] = {'data':data,'bandas':{}}
        if (not documentos[data]['bandas'].has_key(banda)):
            documentos[data][banda] = {}
        if (tag != 'NA'):
            documentos[data][banda][tag] = value
tudoJson = codecs.open('tudo.json', "w", encoding='utf-8-sig')

json.dump(documentos,tudoJson, encoding='utf-8-sig', ensure_ascii=False)