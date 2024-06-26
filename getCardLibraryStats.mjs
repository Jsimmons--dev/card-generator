import fs from 'fs'
import path from 'path'

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

const libraryData = {}
const cardIndex = {}
walk('./cardLibrary', (err, list) => {
    for(let file of list.filter(file => file.endsWith('.json'))){
        let [drive, UsersDir, user, src, lib, dir, theme, cardType, rarity, cardId] = file.split('\\')
        let data = JSON.parse(fs.readFileSync(file))
        cardIndex[cardId] = data
        if(!libraryData[theme]){
            libraryData[theme] = {}
        }
        if(!libraryData[theme][cardType]){
            libraryData[theme][cardType] = {}
        }
        if(!libraryData[theme][cardType][rarity]){
            libraryData[theme][cardType][rarity] = []
        }
        libraryData[theme][cardType][rarity].push({...data, cardId})
    }
    const numCards = Object.keys(cardIndex).length
    console.log(`num cards: ${numCards}`)

    const cardsPerTheme = {}
    const cardsPerType = {}
    const cardsPerRarity = {}
    
    for(let cardId in cardIndex){
        const card = cardIndex[cardId]
        if(!cardsPerTheme[card.theme]){
            cardsPerTheme[card.theme] = 0
        }
        if(!cardsPerType[card.cardType]){
            cardsPerType[card.cardType] = 0
        }
        if(!cardsPerRarity[card.rarity]){
            cardsPerRarity[card.rarity] = 0
        }
        cardsPerTheme[card.theme]++
        cardsPerType[card.cardType]++
        cardsPerRarity[card.rarity]++
    }

    console.log(cardsPerTheme)
    console.log(cardsPerType)
    console.log(cardsPerRarity)
})

