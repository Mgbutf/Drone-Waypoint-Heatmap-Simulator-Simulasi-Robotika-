import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. Setup Scene (Sci-Fi Dark Theme)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x030308);
scene.fog = new THREE.FogExp2(0x030308, 0.015);

// 2. Setup Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
// Mengatur posisi kamera lebih tinggi dan mundur agar aset di altitude tinggi terlihat
camera.position.set(40, 60, 80); 

// 3. Setup Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// 4. Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// Mengunci target fokus kamera pada mid-air, bukan pada lantai (Y=0)
controls.target.set(0, 25, 0); 
controls.update();

// 5. Environment (Holographic Grid)
const gridHelper = new THREE.GridHelper(200, 100, 0x004400, 0x001100);
scene.add(gridHelper);

// 6. Drone Waypoints (X, Y=Altitude, Z)
const waypoints = [
    new THREE.Vector3(-60, 10, -40),
    new THREE.Vector3(-30, 25, -10),
    new THREE.Vector3(0, 45, 10),
    new THREE.Vector3(30, 35, 30),
    new THREE.Vector3(50, 50, -20),
    new THREE.Vector3(-20, 60, -50)
];

// 7. Render Flight Path (Sci-Fi Line)
const pathGeometry = new THREE.BufferGeometry().setFromPoints(waypoints);
const pathMaterial = new THREE.LineBasicMaterial({ color: 0x00d4ff, linewidth: 2 });
const pathLine = new THREE.Line(pathGeometry, pathMaterial);
scene.add(pathLine);

// 8. Volumetric Heatmap Blocks
// Memvisualisasikan kepadatan data berdasarkan ketinggian waypoint
waypoints.forEach((pt) => {
    // Semakin tinggi altitude, blok semakin besar dan intens
    const intensity = pt.y / 60; 
    const size = 3 + (intensity * 8);
    
    const boxGeo = new THREE.BoxGeometry(size, size, size);
    const boxMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.05, 1, 0.4 + (intensity * 0.4)), // Merah/Oranye
        transparent: true,
        opacity: 0.3 + (intensity * 0.4),
        wireframe: true
    });
    
    const heatBlock = new THREE.Mesh(boxGeo, boxMat);
    heatBlock.position.copy(pt);
    scene.add(heatBlock);
});

// 9. Drone Object (Simple Sphere for now)
const droneGeo = new THREE.SphereGeometry(2, 16, 16);
const droneMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const drone = new THREE.Mesh(droneGeo, droneMat);
scene.add(drone);

// 10. Animation Loop & Logic
let progress = 0;
const altValUI = document.getElementById('alt-val');

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Logika pergerakan drone antar waypoint
    progress += 0.0015; // Kecepatan
    if (progress > 1) progress = 0;

    const totalSegments = waypoints.length - 1;
    const currentSegment = Math.floor(progress * totalSegments);
    const segmentProgress = (progress * totalSegments) - currentSegment;

    if (currentSegment < totalSegments) {
        const startNode = waypoints[currentSegment];
        const endNode = waypoints[currentSegment + 1];
        
        // Interpolasi posisi
        drone.position.lerpVectors(startNode, endNode, segmentProgress);
        
        // Update UI Telemetry
        altValUI.innerText = drone.position.y.toFixed(2);
    }

    renderer.render(scene, camera);
}

// 11. Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();
