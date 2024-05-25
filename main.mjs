import OpenAI from "openai";
import https from 'https'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

import cron from 'node-cron'

cron.schedule('*/5 * * * *', async () => {

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const themes =
        `Mystic Swamp:

Setting: A mysterious and enchanting swamp filled with magical flora and fauna. The swamp is shrouded in mist, with glowing plants, ancient trees, and hidden secrets beneath the murky waters.
Card Types: Swamp Witches, Mystical Beasts, Enchanted Artifacts, Swamp Spells, and Hidden Groves.
Art Style: Dark and vibrant fantasy art with elements of glowing plants, eerie lighting, and mystical symbols intertwined with the swamp's natural elements.

Great Undersea Reef:

Setting: A vibrant and expansive underwater world teeming with life. The reef is a kaleidoscope of colors with coral formations, exotic marine creatures, and hidden treasures.
Card Types: Sea Guardians, Exotic Marine Creatures, Sunken Treasures, Water Magic, and Coral Reefs.
Art Style: Bright, detailed underwater scenes with a focus on colorful corals, diverse sea creatures, and the shimmering light filtering through the water.

Celestial Empires:

Setting: A vast universe where different celestial empires vie for control over the stars. These empires are ruled by powerful beings and are characterized by their unique celestial bodies, from radiant suns to mysterious black holes. The universe is filled with cosmic phenomena, ancient starships, and mythical star creatures.
Card Types: Stellar Monarchs, Cosmic Beasts, Starships, Celestial Artifacts, Galactic Locations
Art Style: Bright, ethereal visuals with a focus on cosmic elements like stars, planets, and nebulae.  Detailed depictions of mythical creatures and powerful rulers.  A mix of futuristic technology and mystical, ancient aesthetics.
`


    const themeNames = ["Mystic Swamp", "Great Undersea Reef", "Celestial Empires"]
    // create a map of cardTypes under themes
    const cardTypes = {
        "Mystic Swamp": ["Swamp Witches", "Mystical Beasts", "Enchanted Artifacts", "Swamp Spells", "Hidden Groves"],
        "Great Undersea Reef": ["Sea Guardians", "Exotic Marine Creatures", "Sunken Treasures", "Water Magic", "Coral Reefs"],
        "Celestial Empires": ["Stellar Monarchs", "Cosmic Beasts", "Starships", "Celestial Artifacts", "Galactic Locations"]
    }

    const rarities = ["common", "uncommon", "rare", "epic", "legendary"]
    const rarityWeights = [.30, .25, .20, .15, .10]

    //pick a theme at random
    const theme = themeNames[Math.floor(Math.random() * themeNames.length)]
    //pick a cardType at random
    const cardType = cardTypes[theme][Math.floor(Math.random() * cardTypes[theme].length)]
    //pick a rarity at random using the weights
    const rarity = rarities.find((_, i) => Math.random() < rarityWeights.slice(0, i + 1).reduce((a, b) => a + b))

    const ask =
        `
Add elements to the prompt to add a flair of rarity. 
The rarities are common (30%), uncommon (25%), rare (20%), epic (15%), and legendary (10%).
Add flair for the rarity of the card. common cards should be interesting and generally whimsical and fantastical, while legendary cards should be grand and awe-inspiring.

Generate a DALLE-3 prompt for a new piece with the following types: ${rarity}, ${theme}, ${cardType}.

These are full art images with no text.

Output in the following JSON properties: { rarity, theme, cardType, cardName, prompt}
`


    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: themes + ask }],
        model: "gpt-4o",
        response_format: { type: "json_object" }
    });

    const card = JSON.parse(completion.choices[0].message.content)

    //make a directory in the cards folder with random hashed name
    const cardId = Math.random().toString(36)
    const dir = `./cardLibrary/${card.theme}/${card.cardType}/${card.rarity}/${cardId}`
    console.log(dir)
    fs.mkdirSync(dir)

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: completion.choices[0].message.content,
        n: 1,
        size: "1024x1024",
    });

    const artUrl = response.data[0].url
    //write artUrl to stats.json
    card.artUrl
    fs.writeFileSync(dir + '/stats.json', JSON.stringify(card))

    const fileName = `${dir}/art.png`
    const file = fs.createWriteStream(fileName);
    const request = https.get(artUrl, function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            console.log("Download Completed");
        });
    });
});