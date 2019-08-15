library(tidyverse)
library(tidytext)


download.file("https://raw.githubusercontent.com/jboscomendoza/rpubs/master/sentimientos_afinn/lexico_afinn.en.es.csv","lexico_afinn.en.es.csv")
afinn <- read.csv("lexico_afinn.en.es.csv", stringsAsFactors = F, fileEncoding = "latin1") %>% tbl_df()




tuits <- read.csv(file.choose(), quote = "\"", stringsAsFactors = F, sep = "&") %>% tbl_df()

names(tuits) <-c("tuits")

tuits <- tibble::rowid_to_column(tuits, "ID")

tuits$tuits <- gsub("#\\w+","",tuits$tuits)
tuits$tuits <- gsub("@\\w+","",tuits$tuits)
tuits$tuits <- gsub("[[:punct:]]","",tuits$tuits)
tuits$tuits <- gsub("\\w*[0-9]+\\w*\\s*", "",tuits$tuits)

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
