import * as THREE from 'three';

const contenedor = document.getElementById("scene-container");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
contenedor.appendChild(renderer.domElement);

// Estrellas
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);

// Loader
const textureLoader = new THREE.TextureLoader();

// Sol
const sunGeometry = new THREE.SphereGeometry(6, 32, 32);
const sunTexture = textureLoader.load('src/sun.png');

const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(10, 1, 3);
scene.add(sun);

// Luz del sol
const sunlight = new THREE.PointLight(0xffffff, 50, 200);
sunlight.position.copy(sun.position);
scene.add(sunlight);

// Órbita
const orbit = new THREE.Object3D();
orbit.position.copy(sun.position);
scene.add(orbit);

// Tierra
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthTexture = textureLoader.load('src/earth.jpg');

const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture
});

const orbit2 = new THREE.Object3D();




const cube = new THREE.Mesh(earthGeometry, earthMaterial);

const geometry3 = new THREE.SphereGeometry(0.2,4,4);
const texture3 = new THREE.MeshStandardMaterial({color: 0xffffff});
const moon = new THREE.Mesh(geometry3, texture3);

moon.position.x = 2;




// distancia al sol
cube.position.x = 10;

orbit.add(cube);

cube.add(orbit2);
orbit2.add(moon);

// Cámara
camera.position.z = 15;

// Animación
function animate() {
  requestAnimationFrame(animate);

  orbit.rotation.y += 0.005; // órbita
  cube.rotation.y += 0.01;   // rotación propia
  sun.rotation.y += 0.002;

  orbit2.rotation.y += 0.07;
  orbit2.rotation.x += 0.0001;

  renderer.render(scene, camera);
}

animate();
