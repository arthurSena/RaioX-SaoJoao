setwd("~/Projects/RaioX-SaoJoao/Dados")
library(reshape)
prog = read.csv("programacao_wide.csv")
progWide = melt(prog,id="data")
progWide = progWide[complete.cases(progWide),]
progWide = progWide[progWide$value != "",]
newdata <- progWide[order(as.Date(progWide$data, format="%d/%m/%Y")),] 
newdata$variable = NULL
colnames(newdata)[2] <- c("banda")
write.table(newdata,"programacao_wide.csv",row.names = FALSE,quote = FALSE,sep=",")





banda_tag = read.csv("Banda_tag.csv")
merge = merge(prog,banda_tag,by="banda",all = TRUE)
merge <- merge[order(as.Date(merge$data, format="%d/%m/%Y"),merge$banda,merge$value),] 

write.table(merge,"bandas_tags.csv",row.names = FALSE,quote = FALSE,sep=",")
