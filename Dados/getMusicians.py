from sys import argv	

programacao = open("programacaoCsv.csv","r")

retorno = ""


for line in programacao.readlines():
	if line:
		temp = line.replace("\n","").split(",")
		for i in temp:
			if "junho" not in i and "julho" not in i and i not in retorno:
				retorno += i + "\n"
print retorno