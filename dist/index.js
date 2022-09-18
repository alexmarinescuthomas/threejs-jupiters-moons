import './style.css';
import * as THREE from 'three';

/***** SET UP SCENE & CAMERA *****/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

/***** LIGHTING *****/
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

/***** BACKGROUND *****/
var spaceTexture = new THREE.TextureLoader().load('jupiter-clouds-0.jpg');
var activeImageId = 0;
var nextImageId = 0; 

/***** HANDLE IMAGE ZOOM *****/

document.querySelectorAll('.card-list img').forEach(image => {
  image.onclick = () => {
    document.querySelector('.popup-image').style.display = 'block';
    document.querySelector('.popup-image img').src = image.getAttribute('src');
    document.querySelector('.popup-image p').innerHTML = image.getAttribute('description');
  }
});

/***** HANDLE IMAGE CLOSE *****/

document.querySelector('.popup-image span').onclick = () => {
  document.querySelector('.popup-image').style.display = 'none';
}

document.querySelector('.popup-image').onclick = () => {
  document.querySelector('.popup-image').style.display = 'none';
}

// setInterval(() => {
//     nextImageId = nextImageId + 1;
//     if (nextImageId < 3) {
//         spaceTexture = new THREE.TextureLoader().load('jupiter-clouds-' + nextImageId + '.jpg');
//         activeImageId = nextImageId;
//         scene.background = spaceTexture;
//     }
//     else {
//         spaceTexture = new THREE.TextureLoader().load('jupiter-clouds-' + nextImageId + '.jpg');
//         activeImageId = 3;
//         nextImageId = 0;
//         scene.background = spaceTexture;
//     }
// }, 10000);
scene.background = spaceTexture;

/***** ADD CLOSEST MOON TO THE SCENE, IO *****/
const ioTexture = new THREE.TextureLoader().load('io.jpg');
const normalTexture1 = new THREE.TextureLoader().load('normal.jpg');

const io = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: ioTexture,
    normalMap: normalTexture1,
  })
);

scene.add(io);

/***** ADD SECOND CLOSEST MOON TO THE SCENE, EUROPA *****/
const europaTexture = new THREE.TextureLoader().load('europa.jpg');
const normalTexture2 = new THREE.TextureLoader().load('normal.jpg');

const europa = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: europaTexture,
    normalMap: normalTexture2,
  })
);

scene.add(europa);

/***** ADD THIRD CLOSEST MOON TO THE SCENE, GANYMEDE *****/
const ganymedeTexture = new THREE.TextureLoader().load('ganymede.jpg');
const normalTexture3 = new THREE.TextureLoader().load('normal.jpg');

const ganymede = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: ganymedeTexture,
    normalMap: normalTexture3,
  })
);

scene.add(ganymede);

/***** ADD FOURTH CLOSEST MOON TO THE SCENE, CALLISTO *****/
const callistoTexture = new THREE.TextureLoader().load('callisto.jpg');
const normalTexture4 = new THREE.TextureLoader().load('normal.jpg');

const callisto = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: callistoTexture,
    normalMap: normalTexture4,
  })
);

scene.add(callisto);

io.position.z = 17;
io.position.x = 0;

europa.position.z = 48;
europa.position.x = -6;

ganymede.position.z = 74;
ganymede.position.x = -5;

callisto.position.z = 113;
callisto.position.x = -2;

/***** SCROLL ANIMATION *****/
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  io.rotation.y += 0.005;
  europa.rotation.y += 0.005;
  ganymede.rotation.y += 0.005;
  callisto.rotation.y += 0.005;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

/***** ANIMATION LOOP *****/
function animate() {
  requestAnimationFrame(animate);

  io.rotation.y += 0.0005;
  europa.rotation.y += 0.0005;
  ganymede.rotation.y += 0.0005;
  callisto.rotation.y += 0.0005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();