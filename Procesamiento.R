library(tidyverse)
library(tidytext)
library(tm)
library(dplyr)

download.file("https://raw.githubusercontent.com/davnm5/Sentimientos_Uber-Cabify/master/sentimientos.csv?token=AGAFQW7UAEOB7EHL7SC7GAK5OK77W","sentimientos.csv")
afinn <- read.csv("sentimientos.csv", stringsAsFactors = F, fileEncoding = "latin1") %>% tbl_df()

tuits <- read_csv2(file.choose(), quote = "\"", col_names = FALSE) %>% tbl_df()

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


tuits[is.na(tuits)] <- 0
tuits$Puntuacion_tuit <- round(tuits$Puntuacion_tuit)
total_negativas=sum(tuits$Puntuacion_tuit<0)
total_positivas=sum(tuits$Puntuacion_tuit>0)
total_neutras=sum(tuits$Puntuacion_tuit==0)
print(total_positivas)
print(total_negativas)
print(total_neutras)