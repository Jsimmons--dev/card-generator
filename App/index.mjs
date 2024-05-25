import * as THREE from './lib/three.module.js';
import { addFullSizeCard } from './cardDrawing/cardDrawing.mjs';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(0, -1.35, 3);
scene.add(light);

const cardGroup = addFullSizeCard({scene})

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    cardGroup.rotation.y = .2 * Math.sin(time);
    renderer.render(scene, camera);
}
animate();
