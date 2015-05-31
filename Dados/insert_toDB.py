from pymongo import MongoClient
import json

client = MongoClient('localhost', 3001)
db = client.meteor
prog = db.bandas
print prog.find_one()


with open('tudo.json') as data_file:
    data = json.load(data_file)
    print data.keys()