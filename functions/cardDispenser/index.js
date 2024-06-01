const functions = require('@google-cloud/functions-framework');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

initializeApp({
    credential: applicationDefault()
});

const db = getFirestore();

const rarities = ["common", "uncommon", "rare", "epic", "legendary"]
const rarityWeights = [.30, .25, .20, .15, .10]

functions.http('giveCards', async (req, res) => {
    const cardStatsForSetSnap = await db.collection('cardStats').doc('cardStats-1-May-2024').get()
    const cardStatsForSet = cardStatsForSetSnap.data()


    //get all users that get a card
    const snapshot = await db.collection('users').get()
    for (const doc of snapshot.docs) {
        console.log(doc.id);
        const user = doc.id

        const rarity = rarities.find((_, i) => Math.random() < rarityWeights.slice(0, i + 1).reduce((a, b) => a + b))

        //pick a card at random from the bucket
        const card = cardStatsForSet.cardIdsByRarity[rarity][Math.floor(Math.random() * cardStatsForSet.cardIdsByRarity[rarity].length)]
        card.opened = false

        db.collection('users').doc(user).collection('cards').add(card)
    }
    //send messages to users
    res.send('Cards Given!');
});