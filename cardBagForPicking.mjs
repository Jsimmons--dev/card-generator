import fs from 'fs'
const rarities = ["common", "uncommon", "rare", "epic", "legendary"]
const rarityWeights = [.30, .25, .20, .15, .10]

//read through cardLibrary directory and get all stats.json files
const cardStats = []
const cardLibrary = './cardLibrary'
const cardDirectories = fs.readdirSync(cardLibrary)
for (const theme of cardDirectories) {
    if (theme !== 'trading_card_back.webp') {

        const themeDir = `${cardLibrary}/${theme}`
        const cardTypes = fs.readdirSync(themeDir)
        for (const cardType of cardTypes) {
            const cardTypeDir = `${themeDir}/${cardType}`
            const rarities = fs.readdirSync(cardTypeDir)
            for (const rarity of rarities) {
                const rarityDir = `${cardTypeDir}/${rarity}`
                const cardIds = fs.readdirSync(rarityDir)
                for (const cardId of cardIds) {
                    const stats = JSON.parse(fs.readFileSync(`${rarityDir}/${cardId}/stats.json`))
                    cardStats.push({ ...stats, cardId })
                }
            }
        }
    }
}

//put cards in buckets based on rarity
const buckets = {
    common: [],
    uncommon: [],
    rare: [],
    epic: [],
    legendary: []
}
for (const card of cardStats) {
    buckets[card.rarity].push(card)
}

//create another set of buckets but just push the cardId
const cardIds = {
    common: [],
    uncommon: [],
    rare: [],
    epic: [],
    legendary: []
}
for (const card of cardStats) {
    delete card.prompt
    cardIds[card.rarity].push(card)
}

const cardStatsForDB = {
    numberOfCardsInSet: cardStats.length,
    cardIdsByRarity: cardIds,
    themes: cardDirectories.filter(theme => theme !== 'trading_card_back.webp'),
    cardTypes: cardDirectories.filter(theme => theme !== 'trading_card_back.webp').map(theme => {
        const cardTypes = fs.readdirSync(`${cardLibrary}/${theme}`)
        return { theme, cardTypes }
    }),
    rarities,
    rarityWeights
}

//write to firestore
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore'

initializeApp({
    credential: applicationDefault()
});

const db = getFirestore();

db.collection('cardStats').doc('cardStats-1-May-2024').set(cardStatsForDB)


//print the card stats for db with strigify pretty
// console.log(JSON.stringify(cardStatsForDB, null, 2))

function pickCardAtRandom() {

    //pick a rarity at random using the weights
    const rarity = rarities.find((_, i) => Math.random() < rarityWeights.slice(0, i + 1).reduce((a, b) => a + b))

    //pick a card at random from the bucket
    return cardStatsForDB.cardIdsByRarity[rarity][Math.floor(Math.random() * buckets[rarity].length)]
}

console.log(pickCardAtRandom())