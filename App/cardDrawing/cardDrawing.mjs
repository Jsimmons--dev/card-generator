import { drawHexagon } from "../drawLib.mjs";
import * as THREE from '../lib/three.module.js';
import { colorsHex } from "../consts.mjs";
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

export function addFullSizeCard({url, x, y, cardWidth = 10, cardHeight = 10, scene} = {}) {
    const r = 2;	// radius corner
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
    // const cardUrl = "http://localhost:8082/cardLibrary/Celestial Empires/Celestial Artifacts/common/0.dpyocvn0wwi/art.png"
    const cardUrl = "http://localhost:8082/cardLibrary/Mystic Swamp/Swamp Spells/epic/0.1yhjzgyjjkp/art.png"
    const videoTexture = new THREE.TextureLoader().load(cardUrl);

    const material = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.FrontSide, wireframe: false });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    const mesh = new THREE.Mesh(geometry, material);

    const cardBackUrl = "http://localhost:8082/cardLibrary/trading_card_back.webp"
    const videoBackTexture = new THREE.TextureLoader().load(cardBackUrl);

    const materialBack = new THREE.MeshBasicMaterial({ map: videoBackTexture, side: THREE.BackSide, wireframe: false });

    const geometryBack = new THREE.BufferGeometry();
    geometryBack.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometryBack.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    const meshBack = new THREE.Mesh(geometryBack, materialBack);

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
            color: colorsHex.mainOrange,
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
            true // allow groups
        ),
        [
            material,
            materialBack
        ]
    );

    const group = new THREE.Group()
    group.add(plane)
    group.add(hexagon)
    scene.add(group)

    return group
}