library("tm")
library(tidyverse)
library(tidytext)
library(dplyr)

download.file("https://raw.githubusercontent.com/davnm5/Sentimientos_Uber-Cabify/master/fase2-R/sentimientos.csv?token=AGAFQW32AUGLJS73KLLCN2S5O255O","sentimientos.csv")
afinn <- read.csv("sentimientos.csv", stringsAsFactors = F, fileEncoding = "utf-8") %>% tbl_df()
archivos=read.csv("../fase1-Python/config/config.csv")
ubicacion=archivos$ubicacion
app=archivos$app
contador=0
contador_app=1
t=data.frame(ubicacion=c("---"),positivos=c("---"),negativos=c("---"),neutros=c("---"),app=c("---"))
t2=data.frame(palabra=c("---"))
t3=data.frame(palabra=c("---"))
t4=data.frame(palabra=c("---"))
t5=data.frame(palabra=c("---"))

write.table(t,"output/output.csv",quote=FALSE,row.names = FALSE,col.names = TRUE,append = FALSE,sep=",")
write.table(t2,"output/wordcloud_positivas_uber.csv",quote=FALSE,row.names = FALSE,col.names = TRUE,append = FALSE,sep=",")
write.table(t3,"output/wordcloud_negativas_uber.csv",quote=FALSE,row.names = FALSE,col.names = TRUE,append = FALSE,sep=",")
write.table(t4,"output/wordcloud_positivas_cabify.csv",quote=FALSE,row.names = FALSE,col.names = TRUE,append = FALSE,sep=",")
write.table(t5,"output/wordcloud_negativas_cabify.csv",quote=FALSE,row.names = FALSE,col.names = TRUE,append = FALSE,sep=",")

for (i in archivos$archivo){
h=paste("../fase1-Python/",i,sep="")
tuits <- read_csv2(h, quote = "\"", col_names = FALSE) %>% tbl_df()
names(tuits) <-c("tuits")

tuits <- tibble::rowid_to_column(tuits, "ID")

tuits$tuits <- gsub("@\\w+","",tuits$tuits)
tuits$tuits <- gsub("[[:punct:]]","",tuits$tuits)
tuits$tuits <- gsub("\\w*[0-9]+\\w*\\s*", "",tuits$tuits)
tuits$tuits= tolower(tuits$tuits)
tuits$tuits= removeWords(tuits$tuits, words = stopwords("spanish"))
tuits$tuits <- removePunctuation(tuits$tuits)
tuits$tuits <- stripWhitespace(tuits$tuits)
tuits$tuits <- gsub(" *\\b[[:alpha:]]{1,2}\\b *", " ", tuits$tuits)

tuits_afinn <- 
  tuits %>%
  unnest_tokens(input = "tuits", output = "Palabra") %>%
  inner_join(afinn, ., by = "Palabra") %>%
  mutate(Tipo = ifelse(Puntuacion > 0, "Positiva", "Negativa"))

tuits <-
  tuits_afinn %>%
  group_by(ID) %>%
  summarise(Puntuacion_tuit = mean(Puntuacion)) %>%
  left_join(tuits, ., by = "ID")

if(app[contador_app]=="uber"){
  positivas_uber=tuits_afinn[tuits_afinn$Puntuacion>0,1]
  negativas_uber=tuits_afinn[tuits_afinn$Puntuacion<0,1]
  write.table(positivas_uber,"output/wordcloud_positivas_uber.csv",row.names = FALSE,col.names = FALSE,quote=FALSE,fileEncoding ="utf-8",append = TRUE,sep=",")
  write.table(negativas_uber,"output/wordcloud_negativas_uber.csv",row.names = FALSE,col.names = FALSE,quote=FALSE,fileEncoding ="utf-8",append = TRUE,sep=",")
}
else{
  positivas_cabify=tuits_afinn[tuits_afinn$Puntuacion>0,1]
  negativas_cabify=tuits_afinn[tuits_afinn$Puntuacion<0,1]
  write.table(positivas_cabify,"output/wordcloud_positivas_cabify.csv",row.names = FALSE,col.names = FALSE,quote=FALSE,fileEncoding ="utf-8",append = TRUE,sep=",")
  write.table(negativas_cabify,"output/wordcloud_negativas_cabify.csv",row.names = FALSE,col.names = FALSE,quote=FALSE,fileEncoding ="utf-8",append = TRUE,sep=",")
}
contador_app=contador_app+1

tuits[is.na(tuits)] <- 0
tuits$Puntuacion_tuit <- round(tuits$Puntuacion_tuit)
total_negativas=sum(tuits$Puntuacion_tuit<0)

print(positivas)
total_positivas=sum(tuits$Puntuacion_tuit>0)
total_neutras=sum(tuits$Puntuacion_tuit==0)
contador=contador+1
aux=data.frame(ubicacion=ubicacion[contador],positivos=c(total_positivas),negativos=c(total_negativas),neutros=c(total_neutras),app=app[contador])
write.table(aux,"output/output.csv",quote=FALSE,row.names = FALSE,col.names = FALSE,append = TRUE,sep=",")
}


