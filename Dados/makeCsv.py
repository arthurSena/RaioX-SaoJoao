from sys import argv	

programacao = open("programacao.txt","r")


csv = ""
for line in programacao:
	if "junho" in line or "julho" in line:
		csv += "\n"+line.replace("\n","") + ","
	else:
		csv += line.replace("\n","").replace(" ","") + ","
print csv
