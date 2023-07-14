import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* when using three it's needed 3 things 
   1. Scene
   2. Camera
   3. Renderer 
*/

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera)

/* To create a object is needed the folowing things?
   1. geometry: the {x,y,z} points that makeup a shape 
   2. material: the wrapping paper for an object
   3. mesh: geometry + material
*/

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh( geometry, material);

// * add de object to the screen
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

/* Show the light point*/
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
   const geometry = new THREE.SphereGeometry(0.25,24,24);
   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
   const star = new THREE.Mesh( geometry, material );

   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

   star.position.set(x, y, z);
   scene.add(star);
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
scene.background = spaceTexture;

//porinho
const porinhoTexture = new THREE.TextureLoader().load('assets/porinho.jpg');

const porinho = new THREE.Mesh(
   new THREE.BoxGeometry(3,3,3),
   new THREE.MeshBasicMaterial({ map: porinhoTexture })
)

scene.add(porinho);
//mars
const marsTexture = new THREE.TextureLoader().load('assets/mars.jpg');
const normalTexture = new THREE.TextureLoader().load('assets/mars-normal.jpg');

const mars = new THREE.Mesh(
   new THREE.SphereGeometry(3,32,32),
   new THREE.MeshStandardMaterial({ 
      map: marsTexture,
      normalMap: normalTexture
   })
);
scene.add(mars);

mars.position.z = 30;
mars.position.setX(-10);

porinho.position.z = -5;
porinho.position.x = 2;


function moveCamera() {
   
   const t = document.body.getBoundingClientRect().top;

   mars.rotation.x += 0.05;
   mars.rotation.y += 0.075;
   mars.rotation.z += 0.05;

   porinho.rotation.y += 0.01;
   porinho.rotation.z += 0.01;

   camera.position.z = t * -0.01;
   camera.position.x = t * -0.0002;
   camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera()

function animate() {
   requestAnimationFrame( animate );

   torus.rotation.x += 0.01;
   torus.rotation.y += 0.005;
   torus.rotation.z += 0.01;

   // controls.update();
   renderer.render( scene, camera );
}

animate();