import * as THREE from './lib/three.module.js';
import { addFullSizeCard } from './cardDrawing/cardDrawing.mjs';
import { backendUrl } from './consts.mjs';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(0, -1.35, 3);
scene.add(light);

const cardLibrary = await fetch(`${backendUrl}/library`)
const libraryData = await cardLibrary.json()
console.log(libraryData)


const pickRandomCard = () => {
    //pick a random card theme
    try {
        const themes = Object.keys(libraryData)
        const theme = themes[Math.floor(Math.random() * themes.length)]

        //pick a random card type
        const cardTypes = Object.keys(libraryData[theme])
        const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)]

        //pick a random rarity
        const rarities = Object.keys(libraryData[theme][cardType])
        const rarity = rarities[Math.floor(Math.random() * rarities.length)]

        //pick a random card
        const cards = libraryData[theme][cardType][rarity].cards
        const card = cards[Math.floor(Math.random() * cards.length)]

        return card
    } catch (err) {
        console.error(err)
        return null
    }
}

let card = pickRandomCard()

while(!card) {
    card = pickRandomCard()
}

console.log(card)
const cardGroup = await addFullSizeCard({ card, scene })

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    cardGroup.rotation.y = .2 * Math.sin(time);
    renderer.render(scene, camera);
}
animate();
