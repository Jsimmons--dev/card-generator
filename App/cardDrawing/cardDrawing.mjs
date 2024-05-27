import { drawHexagon } from "../drawLib.mjs";
import * as THREE from '../lib/three.module.js';

import { colorsHex, textColorsHex, backendUrl } from "../consts.mjs";
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
const loader = new FontLoader();

function loadFont(fontUrl) {
    return new Promise((resolve, reject) => {
        loader.load('Jacquard 12_Regular.json', function (font) {
            resolve(font)
        });
    })
}

function generateRoundedRectGeometry(x, y, width, height, radius, smoothness) {
    const r = 1;	// radius corner
    const s = 18;	// smoothness

    // helper stuff 
    const wi = width / 2 - r;
    const hi = height / 2 - r;
    const w2 = width / 2;
    const h2 = height / 2;
    const ul = r / width;
    const ur = (width - r) / width;
    const vl = r / height;
    const vh = (height - r) / height;

    let positions = [

        -wi, -h2, 0, wi, -h2, 0, wi, h2, 0,
        -wi, -h2, 0, wi, h2, 0, -wi, h2, 0,
        -w2, -hi, 0, -wi, -hi, 0, -wi, hi, 0,
        -w2, -hi, 0, -wi, hi, 0, -w2, hi, 0,
        wi, -hi, 0, w2, -hi, 0, w2, hi, 0,
        wi, -hi, 0, w2, hi, 0, wi, hi, 0

    ];

    let uvs = [

        ul, 0, ur, 0, ur, 1,
        ul, 0, ur, 1, ul, 1,
        0, vl, ul, vl, ul, vh,
        0, vl, ul, vh, 0, vh,
        ur, vl, 1, vl, 1, vh,
        ur, vl, 1, vh, ur, vh

    ];

    let phia = 0;
    let phib, xc, yc, uc, vc;

    for (let i = 0; i < s * 4; i++) {

        phib = Math.PI * 2 * (i + 1) / (4 * s);


        xc = i < s || i >= 3 * s ? wi : - wi;
        yc = i < 2 * s ? hi : -hi;

        positions.push(xc, yc, 0, xc + r * Math.cos(phia), yc + r * Math.sin(phia), 0, xc + r * Math.cos(phib), yc + r * Math.sin(phib), 0);

        uc = xc = i < s || i >= 3 * s ? ur : ul;
        vc = i < 2 * s ? vh : vl;

        uvs.push(uc, vc, uc + ul * Math.cos(phia), vc + vl * Math.sin(phia), uc + ul * Math.cos(phib), vc + vl * Math.sin(phib));

        phia = phib;

    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    return geometry
}

function getColorFromRarity(rarity) {
    switch (rarity) {
        case 'common':
            return colorsHex.mainGrey
        case 'uncommon':
            return colorsHex.mainGreen
        case 'rare':
            return colorsHex.mainBlue
        case 'epic':
            return colorsHex.mainPurple
        case 'legendary':
            return colorsHex.mainOrange
        default:
            return 0x000000
    }
}

function getTextColorFromRarity(rarity) {
    switch (rarity) {
        case 'common':
            return textColorsHex.white
        case 'uncommon':
            return textColorsHex.green
        case 'rare':
            return textColorsHex.blue
        case 'epic':
            return textColorsHex.purple
        case 'legendary':
            return textColorsHex.orange
        default:
            return 0x000000
    }
}

export async function addFullSizeCard({ card, x, y, cardWidth = 10, cardHeight = 10, scene } = {}) {

    const cardBorderWidth = .1
    const cardArtUrl = `${backendUrl}/cardLibrary/${card.theme}/${card.cardType}/${card.rarity}/${card.cardId}/art.png`
    const r = 1;	// radius corner
    const s = 18;	// smoothness

    // helper stuff 
    const wi = cardWidth / 2 - r;
    const hi = cardHeight / 2 - r;
    const w2 = cardWidth / 2;
    const h2 = cardHeight / 2;
    const ul = r / cardWidth;
    const ur = (cardWidth - r) / cardWidth;
    const vl = r / cardHeight;
    const vh = (cardHeight - r) / cardHeight;

    let positions = [

        -wi, -h2, 0, wi, -h2, 0, wi, h2, 0,
        -wi, -h2, 0, wi, h2, 0, -wi, h2, 0,
        -w2, -hi, 0, -wi, -hi, 0, -wi, hi, 0,
        -w2, -hi, 0, -wi, hi, 0, -w2, hi, 0,
        wi, -hi, 0, w2, -hi, 0, w2, hi, 0,
        wi, -hi, 0, w2, hi, 0, wi, hi, 0

    ];

    let uvs = [

        ul, 0, ur, 0, ur, 1,
        ul, 0, ur, 1, ul, 1,
        0, vl, ul, vl, ul, vh,
        0, vl, ul, vh, 0, vh,
        ur, vl, 1, vl, 1, vh,
        ur, vl, 1, vh, ur, vh

    ];

    let phia = 0;
    let phib, xc, yc, uc, vc;

    for (let i = 0; i < s * 4; i++) {

        phib = Math.PI * 2 * (i + 1) / (4 * s);


        xc = i < s || i >= 3 * s ? wi : - wi;
        yc = i < 2 * s ? hi : -hi;

        positions.push(xc, yc, 0, xc + r * Math.cos(phia), yc + r * Math.sin(phia), 0, xc + r * Math.cos(phib), yc + r * Math.sin(phib), 0);

        uc = xc = i < s || i >= 3 * s ? ur : ul;
        vc = i < 2 * s ? vh : vl;

        uvs.push(uc, vc, uc + ul * Math.cos(phia), vc + vl * Math.sin(phia), uc + ul * Math.cos(phib), vc + vl * Math.sin(phib));

        phia = phib;

    }
    const videoTexture = new THREE.TextureLoader().load(cardArtUrl);

    const material = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.FrontSide, wireframe: false });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));

    const cardBackUrl = `${backendUrl}/cardLibrary/trading_card_back.webp`
    const videoBackTexture = new THREE.TextureLoader().load(cardBackUrl);

    const materialBack = new THREE.MeshBasicMaterial({ map: videoBackTexture, side: THREE.BackSide, wireframe: false });

    const geometryBack = new THREE.BufferGeometry();
    geometryBack.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometryBack.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));

    function generateHexagonMesh(x, y, z, radius) {
        const pts = [];
        pts.push(new THREE.Vector3(x + 0, y + radius, z));
        pts.push(new THREE.Vector3(x + radius * 0.866, y + radius * 0.5, z));
        pts.push(new THREE.Vector3(x + radius * 0.866, y - radius * 0.5, z));
        pts.push(new THREE.Vector3(x + 0, y - radius, z));
        pts.push(new THREE.Vector3(x - radius * 0.866, y - radius * 0.5, z));
        pts.push(new THREE.Vector3(x - radius * 0.866, y + radius * 0.5, z));

        const hex = new THREE.Shape(pts);


        const geometry = new THREE.ShapeGeometry(hex);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, z));
        const material = new THREE.MeshStandardMaterial({
            color: getColorFromRarity(card.rarity),
            roughness: 0,
            metalness: 0,
            flatShading: true,
            side: THREE.DoubleSide
        });

        return { geometry: geometry, material: material }
    }

    const { geometry: hexGeometry, material: hexMaterial } = generateHexagonMesh(3.5, -3.5, .01, .4)
    const hexagon = new THREE.Mesh(hexGeometry, hexMaterial);

    let plane = new THREE.Mesh(
        BufferGeometryUtils.mergeGeometries(
            [
                geometry,
                geometryBack
            ],
            true
        ),
        [
            material,
            materialBack
        ]
    );

    const font = await loadFont('Jacquard 12_Regular.json')
    const textGeometry = new TextGeometry(card.cardName, {
        font: font,
        size: 1,
        depth: .1,
    });

    const TextMaterial = new THREE.MeshBasicMaterial({ color: getTextColorFromRarity(card.rarity) })

    const text = new THREE.Mesh(textGeometry, TextMaterial)
    text.geometry.computeBoundingBox()
    console.log(text)
    text.translateY(cardWidth / 2 + .10)
    text.translateX(-text.geometry.boundingBox.max.x / 2)

    const cardBorderGeometry = generateRoundedRectGeometry(-cardWidth / 2, -cardWidth / 2, 10.1, 10.1, 1)
    const cardBorderMaterial = new THREE.MeshBasicMaterial({ color: getTextColorFromRarity(card.rarity) })
    const cardBorder = new THREE.Mesh(cardBorderGeometry, cardBorderMaterial)
    cardBorder.translateZ(-.01)

    const group = new THREE.Group()
    group.add(plane)
    group.add(cardBorder)
    group.add(hexagon)
    group.add(text)
    scene.add(group)

    return group
}