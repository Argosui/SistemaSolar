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
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load("/textures/sun.png"),
  })
);
sun.position.set(40, 1, 0);
scene.add(sun);

// Luces
const sunlight = new THREE.PointLight(0xffffff, 480, 200);
sunlight.position.copy(sun.position);
scene.add(sunlight);

scene.add(new THREE.AmbientLight(0xffffff, 0.05));

// Función para crear órbitas visuales
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

  return new THREE.LineLoop(geometry, material);
}

// Función para crear planetas
function createPlanet({ size, texture, distance }) {
  const orbit = new THREE.Object3D();
  sun.add(orbit);

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(size, 32, 32),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`/textures/${texture}`),
    })
  );

  planet.position.x = distance;
  orbit.add(planet);

  const orbitLine = createOrbit(distance);
  sun.add(orbitLine);

  return { orbit, planet };
}

// Crear planetas
const mercury = createPlanet({
  size: 0.5,
  texture: "mercury.png",
  distance: 10,
});

const venus = createPlanet({
  size: 1,
  texture: "venus.png",
  distance: 15,
});

const earth = createPlanet({
  size: 1,
  texture: "earth.png",
  distance: 20,
});

const mars = createPlanet({
  size: 0.6,
  texture: "mars.png",
  distance: 25,
});

const jupiter = createPlanet({
  size: 3,
  texture: "jupiter.png",
  distance: 35,
});

const saturn = createPlanet({
  size: 2.5,
  texture: "saturn.png",
  distance: 45,
});

const uranus = createPlanet({
  size: 1.8,
  texture: "uranus.jpg",
  distance: 55,
});

const neptune = createPlanet({
  size: 1.8,
  texture: "neptune.png",
  distance: 65,
});

// Anillo de Saturno
const ringGeo = new THREE.RingGeometry(3, 5, 64);
const ringMat = new THREE.MeshStandardMaterial({
  color: 0xe3d283,
  side: THREE.DoubleSide,
});
const ringSat = new THREE.Mesh(ringGeo, ringMat);
ringSat.rotation.x = Math.PI / 2;
saturn.planet.add(ringSat);

// Luna
const moonOrbit = new THREE.Object3D();
earth.planet.add(moonOrbit);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 8, 8),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
moon.position.x = 2;
moonOrbit.add(moon);

// Cámara
camera.position.set(-50, 20, 30);
camera.lookAt(0, 1, -30);

// Animación
function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.002;

  mercury.orbit.rotation.y += 0.01;
  venus.orbit.rotation.y += 0.008;
  earth.orbit.rotation.y += 0.005;
  mars.orbit.rotation.y += 0.007;
  jupiter.orbit.rotation.y += 0.005;
  saturn.orbit.rotation.y += 0.004;
  uranus.orbit.rotation.y += 0.002;
  neptune.orbit.rotation.y += 0.001;

  earth.planet.rotation.y += 0.004;
  moonOrbit.rotation.y += 0.07;

  renderer.render(scene, camera);
}

animate();
