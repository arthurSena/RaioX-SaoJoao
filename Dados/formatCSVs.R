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




prog = read.csv("programacao_wide.csv")
banda_tag = read.csv("Tags banda - toExport.csv")
merge = merge(prog,banda_tag,by="banda",all = TRUE)
merge <- merge[order(merge$banda),] 

merge <- merge[order(as.Date(merge$data, format="%d/%m/%Y"),merge$banda,merge$value),] 
merge = merge[,c(2,1,3,4)]
write.table(merge,"tudo.csv",row.names = FALSE,quote = FALSE,sep=",")
