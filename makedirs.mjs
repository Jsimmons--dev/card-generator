//create a directory structure based around the themes, card types, and rarities
import fs from 'fs'

if (!fs.existsSync('./cardLibrary')) {
    fs.mkdirSync('./cardLibrary')
}
const themes = ['Mystic Swamp', 'Great Undersea Reef', 'Celestial Empires']
//create subtheme types nested in the theme folder
const subthemes = {
    'Mystic Swamp': ['Swamp Witches', 'Mystical Beasts', 'Enchanted Artifacts', 'Swamp Spells', 'Hidden Groves'],
    'Great Undersea Reef': ['Sea Guardians', 'Exotic Marine Creatures', 'Sunken Treasures', 'Water Magic', 'Coral Reefs'],
    'Celestial Empires': ['Stellar Monarchs', 'Cosmic Beasts', 'Starships', 'Celestial Artifacts', 'Galactic Locations']
}

const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary']

themes.forEach(theme => {
    const themePath = `./cardLibrary/${theme}`
    if (!fs.existsSync(themePath)) {
        fs.mkdirSync(themePath)
    }
    subthemes[theme].forEach(subtheme => {
        const subthemePath = `./cardLibrary/${theme}/${subtheme}`
        if (!fs.existsSync(subthemePath)) {
            fs.mkdirSync(subthemePath)
        }
        rarities.forEach(rarity => {
            if (!fs.existsSync(`./cardLibrary/${theme}/${subtheme}/${rarity}`)) {
                fs.mkdirSync(`./cardLibrary/${theme}/${subtheme}/${rarity}`)
            }
        })
    })
})
