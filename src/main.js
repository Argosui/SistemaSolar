import * as THREE from "three";

const contenedor = document.getElementById("scene-container");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);






// Renderer
const renderer = new THREE.WebGLRenderer({});
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
const sunTexture = textureLoader.load("src/sun.png");

const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(40, 1, 0);
scene.add(sun);

// Luz del sol
const sunlight = new THREE.PointLight(0xffffff, 480, 200);
sunlight.position.copy(sun.position);
scene.add(sunlight);

// Luz de ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

// Órbitas

//Orbita Tierra
const orbit = new THREE.Object3D();
sun.add(orbit);

//Orbita Luna

const orbit2 = new THREE.Object3D();

//Orbita Mercurio

const orbitMer = new THREE.Object3D();
sun.add(orbitMer);

//Orbita Venus

const orbitVen = new THREE.Object3D();
sun.add(orbitVen);

//Orbita Marte

const orbitMars = new THREE.Object3D();
sun.add(orbitMars);

//Orbita Jupiter

const orbitJup = new THREE.Object3D();
sun.add(orbitJup);

//Orbita Saturno

const orbitSat = new THREE.Object3D();
sun.add(orbitSat);





//Orbita Urano

const orbitUrs = new THREE.Object3D();
sun.add(orbitUrs);

//Orbita Neptuno

const orbitNep = new THREE.Object3D();
sun.add(orbitNep);

//Mercurio
const mercuryGeometry = new THREE.SphereGeometry(0.5);
const mercuryTexture = textureLoader.load("src/mercury.png");

const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});

const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

//venus
const venusGeometry = new THREE.SphereGeometry(1);
const venusTexture = textureLoader.load("src/venus.png");

const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});

const venus = new THREE.Mesh(venusGeometry, venusMaterial);

// Tierra
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthTexture = textureLoader.load("src/earth.png");

const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});

const cube = new THREE.Mesh(earthGeometry, earthMaterial);

//Marte
const marsGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const marsTexture = textureLoader.load("src/mars.png");

const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});

const mars = new THREE.Mesh(marsGeometry, marsMaterial);

// Júpiter
const jupiterGeometry = new THREE.SphereGeometry(3);
const jupiterTexture = textureLoader.load("src/jupiter.png");
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);

// Saturno
const saturnGeometry = new THREE.SphereGeometry(2.5);
const saturnTexture = textureLoader.load("src/saturn.png");
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);


//anillo

const ringGeo = new THREE.RingGeometry(3, 5, 64);
const ringTexture = new THREE.MeshStandardMaterial(
  {color: 0xE3D283,
   side: THREE.DoubleSide
  });

const ringSat = new THREE.Mesh(ringGeo,ringTexture);
ringSat.rotation.x = Math.PI / 2;



// Urano
const uranusGeometry = new THREE.SphereGeometry(1.8);
const uranusTexture = textureLoader.load("src/uranus.jpg");
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);

// Neptuno
const neptuneGeometry = new THREE.SphereGeometry(1.8);
const neptuneTexture = textureLoader.load("src/neptune.png");
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);

const geometry3 = new THREE.SphereGeometry(0.2, 4, 4);
const texture3 = new THREE.MeshStandardMaterial({ color: 0xffffff });
const moon = new THREE.Mesh(geometry3, texture3);

moon.position.x = 2;

// distancia al sol
cube.position.x = 20;
const earthOrbit = createOrbit(20);
sun.add(earthOrbit);

mercury.position.x = 10;
const mercuryOrbit = createOrbit(10);
sun.add(mercuryOrbit);

venus.position.x = 15;
const venusOrbit = createOrbit(15);
sun.add(venusOrbit);

mars.position.x = 25;
const marsOrbit = createOrbit(25);
sun.add(marsOrbit);

// Júpiter
jupiter.position.x = 35;
const jupiterOrbit = createOrbit(35);
sun.add(jupiterOrbit);

// Saturno
saturn.position.x = 45;
const saturnOrbit = createOrbit(45);
sun.add(saturnOrbit);


// Urano
uranus.position.x = 55;
const uranusOrbit = createOrbit(55);
sun.add(uranusOrbit);

// Neptuno
neptune.position.x = 65;
const neptuneOrbit = createOrbit(65);
sun.add(neptuneOrbit);

//implementar orbitas
orbit.add(cube);
orbitMer.add(mercury);
orbitVen.add(venus);
orbitMars.add(mars);
orbitJup.add(jupiter);
orbitSat.add(saturn);
orbitUrs.add(uranus);
orbitNep.add(neptune);
saturn.add(ringSat);

cube.add(orbit2);
orbit2.add(moon);

// Cámara
camera.position.set(-50, 20, 30);
camera.lookAt(0,1,-30);

// Animación
function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.002;

  orbit.rotation.y += 0.005; // órbita
  cube.rotation.y += 0.004; // rotación propia

  orbitMer.rotation.y += 0.01;
  mercury.rotation.y += 0.01;

  orbitVen.rotation.y += 0.008;
  venus.rotation.y += 0.005;

  orbitMars.rotation.y += 0.007;
  mars.rotation.y += 0.006;

  orbitJup.rotation.y += 0.005;
  jupiter.rotation.y += 0.02;

  orbitSat.rotation.y += 0.004;
  saturn.rotation.y += 0.018;

  orbitUrs.rotation.y += 0.002;
  uranus.rotation.y += 0.015;

  orbitNep.rotation.y += 0.001;
  neptune.rotation.y += 0.014;

  orbit2.rotation.y += 0.07;

  renderer.render(scene, camera);
}

function createOrbit(radius) {
  const segments = 64;
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    points.push(new THREE.Vector3(x, 0, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    opacity: 0.3,
    transparent: true,
  });

  const orbitLine = new THREE.LineLoop(geometry, material);
  return orbitLine;
}

animate();
