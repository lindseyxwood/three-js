import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const geometry = new THREE.BoxGeometry(10, 10, 10);

//set the color of the basic material in the object parameters `{}`
// Adding texture through standard material
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );

const cube = new THREE.Mesh( geometry, material );
cube.position.z = -15;
cube.position.x = -15;
cube.rotation.x = 2;
cube.rotation.y = .5;

// scene.add( cube );

const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const icoMesh = new THREE.Mesh(ico, icoMaterial);

// scene.add(icoMesh);

icoMesh.position.z= -15;
icoMesh.position.x= 15;

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -400);

scene.add(pointLight);
scene.add(ambientLight);

// Background

const shadesTexture = new THREE.TextureLoader().load('images/shades.JPG')

scene.background = shadesTexture;

// Object texture mapping

const smileTexture = new THREE.TextureLoader().load('images/rockSunset.jpeg')

const sphereGeometry = new THREE.SphereGeometry( 10, 22, 10 );

const smileMaterial = new THREE.MeshBasicMaterial({map: smileTexture})

const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);

scene.add(smileMesh);

// Normal Texture Map

const normalTexture = new THREE.TextureLoader().load('images/NormalMap.png');

const torusGeo = new THREE.TorusKnotGeometry( 5, 1, 250, 5, 9, 15 );
const torusMaterial = new THREE.MeshStandardMaterial( {
    normalMap: normalTexture,
    roughness: 0,
    metalness: .8
} );

const torusKnot = new THREE.Mesh( torusGeo, torusMaterial );

scene.add( torusKnot );
torusKnot.position.y = 20

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper)

// Orbit Control

const controls = new OrbitControls(camera, renderer.domElement)

// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper)

// Render the scene;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);
renderer.render(scene, camera);

function animate() {
    requestAnimationFrame( animate );
    // slowly rotate the cube:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // rotate the icosahedron a little faster in the opposite direction:
    icoMesh.rotation.z += -0.03
    icoMesh.rotation.y += -0.03
    // rotate the smiley sphere on the Y axis:
    smileMesh.rotation.y += 0.05
    // ALLOWS YOUR ORBIT CONTROLS TO UPDATE LIVE IN REAL-TIME:
    controls.update()

    renderer.render( scene, camera );
}

animate();

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>


// setupCounter(document.querySelector('#counter'))
