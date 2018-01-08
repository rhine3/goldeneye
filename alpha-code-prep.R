#Convert alpha code file into preliminary dictionary

library(tidyverse)
library(stringr)

codes <- read.csv("C:/Users/tessa/Google Drive/Birding/IBP-alpha-codes-full.csv",
                  header=FALSE)
names(codes) <- c("nonspecies", "commonname", "code4", "scientficname", "code6")
threecols <- codes[1:3] #just nonspecies indicator, common name, and 4-letter code

data <- as_tibble(threecols)

print(data[[4, 2]])

# Separate columns into rows based on species status & alpha code regularity
normal <-
  filter(data, !grepl('[*]', code4) & !grepl('[+]', nonspecies))

specialcodes <- 
  filter(data, grepl('[*]', code4) & !grepl('[+]', nonspecies))

nonspecies <-
  filter(data, !grepl('[*]', code4) & grepl('[+]', nonspecies))
  
specialcodesandnonspecies <-
  filter(data, grepl('[*]', code4) & grepl('[+]', nonspecies))
  


#Create a dictionary by appending lines to dictionary.js.
#codes will be keys, species info will be values
dictionary = file("C:/Users/tessa/Google Drive/Birding/dictionary.js", "w")
write("var code_keys = {", file=dictionary)

#append lines containing alpha code/species name key pairs
for (i in seq_len(nrow(normal))){
  code <- normal[[i, "code4"]]
  commonname <- normal[[i, "commonname"]]
  line <- paste(code, ': "', commonname, '",', sep="")
  write(line, file=dictionary)
}

for(i in seq_len(nrow(specialcodes))){
  code <- substr(specialcodes[[i, "code4"]], 1, 4) #only the 4=letter code, no asterisks
  commonname <- specialcodes[[i, "commonname"]]
  line <- paste(code, ': "', commonname, ' (code conflicts)",', sep="")
  write(line, file=dictionary)
}

for(i in seq_len(nrow(nonspecies))){
  code <- nonspecies[[i, "code4"]]
  commonname <- nonspecies[[i, "commonname"]]
  line <- paste(code, ': "', commonname, ' (not a full species)",', sep="")
  write(line, file=dictionary)
}

for(i in seq_len(nrow(specialcodesandnonspecies))){
  code <- substr(specialcodesandnonspecies[[i, "code4"]], 1, 4) 
  commonname <- specialcodesandnonspecies[[i, "commonname"]]
  line <- paste(code, ': "', commonname, ' (not a full species; code conflicts)",', sep="")
  write(line, file=dictionary)
}

#end our dictionary with a "};"
write("};", file=dictionary)
write("", file=dictionary)


#made a bunch of edits to clean up dictionary... now make species-to-code dictionary
write("var species_keys = {", file=dictionary)


for (i in seq_len(nrow(data))){
  #strip each name of symbols and spaces
  name <- data[[i, "commonname"]]
  nopunctuationname <- str_replace_all(name, "[[:punct:]]", "")
  strippedname <- str_replace_all(nopunctuationname, fixed(" "), "")
  uppername <- toupper(strippedname)
  
  #remove any trailing asterisks
  code <- substr(data[[i, "code4"]], 1, 4)
  
  #put the stripped name as the key, alpha code as the value
  line <- paste(uppername, ': "', code, '",', sep="")
  write(line, file=dictionary)
}


write("};", file=dictionary)

close(dictionary)
closeAllConnections()

#Compare BBL Codes

bbl <- read.csv("C:/Users/tessa/Google Drive/Birding/BBL-alpha-codes.csv",
                  header=FALSE)
names(bbl) <- c("number", "code4", "commonname")
bbl <- bbl[2:3] #just 4-letter codes and common names
bblcodes <- as.tibble(bbl)

bbldict = file("C:/Users/tessa/Google Drive/Birding/conflicts.js", "w")
write("var bbl_species_keys = {", file=bbldict)

for (i in seq_len(nrow(bblcodes))){
  #strip each name of symbols and spaces
  name <- bblcodes[[i, 2]]
  nopunctuationname <- str_replace_all(name, "[[:punct:]]", "")
  print(c("NAME:", name))
  print(c("NOPUNC:", nopunctuationname))
  #if (length(nopunctuationname) > 1){ #file has some empty lines--don't add to bbldict
    strippedname <- str_replace_all(nopunctuationname, fixed(" "), "")
    uppername <- toupper(strippedname)
    print(c("STRIPPED:",strippedname))
    print(c("UPPER:",uppername))
    
    #remove any trailing asterisks
    code <- substr(bblcodes[[i, "code4"]], 1, 4)
    
    line <- paste(uppername, ': "', code, '",', sep="")
    write(line, file=bbldict)
    
  #}
  
}

write("};", file=bbldict)

close(bbldict)
closeAllConnections()

