__author__ = 'andryw'
import codecs

programacao = codecs.open('tudo.csv', encoding='utf-8-sig')

documentos = {}

import json

def saveTags(tags):
    jsonTags = []
    for tag in tags:
        jsonTags.append({'tag':tag})
    tagsJson = codecs.open('tags.json', "w",encoding='utf-8-sig')
    json.dump(jsonTags,tagsJson, encoding='utf-8-sig')


tags = set()
i = 0

for line in programacao.readlines():

    if line:
        i = i + 1

        if i == 1:
            continue
        temp = line.replace("\n","").split(",")
        print temp
        data = temp[0]
        banda = temp[1]
        tag = temp[2]
        value = temp[3]

        if (not documentos.has_key(data)):
            documentos[data] = {}
        if (not documentos[data].has_key(banda)):
            documentos[data][banda] = {}
        if (tag != 'NA'):
            documentos[data][banda][tag] = value
            tags.add(tag)

saveTags(tags)
tudoJson = codecs.open('tudo.json', "w",encoding='utf-8-sig')
json.dump(documentos,tudoJson, encoding='utf-8-sig')