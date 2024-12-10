import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js';

var pi = Math.PI;


// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

// const geometry = new THREE.BoxGeometry(10, 10, 10);

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

const starTexture = new THREE.TextureLoader().load('images/starBackground.jpg')

scene.background = starTexture;

// Object texture mapping

/* const smileTexture = new THREE.TextureLoader().load('images/rockSunset.jpeg')

const sphereGeometry = new THREE.SphereGeometry( 10, 22, 10 );

const smileMaterial = new THREE.MeshBasicMaterial({map: smileTexture})

const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);

scene.add(smileMesh); */

//materials
var mat_orange = new THREE.MeshLambertMaterial({ color: 0xff8c75 });
var mat_grey = new THREE.MeshLambertMaterial({ color: 0xf3f2f7 });
var mat_yellow = new THREE.MeshLambertMaterial({ color: 0xfeb42b });
var mat_dark = new THREE.MeshLambertMaterial({ color: 0x5a6e6c });
var mat_brown = new THREE.MeshLambertMaterial({ color: 0xa3785f });
var mat_stone = new THREE.MeshLambertMaterial({ color: 0x9eaeac });
//-------------------------------------ground-------------------------------------
var layers = [];
var ground = new THREE.Group();
for (var i = 0; i < 5; i++) {
    var h = 0.1;
    var geometry = new THREE.CylinderGeometry(8 - i - 0.01, 8 - i, h, 9);
    layers.push(new THREE.Mesh(geometry, mat_orange));
    layers[i].position.y = h * i;
    layers[i].receiveShadow = true;
    ground.add(layers[i]);
}
layers[0].scale.x = 0.8;
layers[1].scale.set(0.77, 1, 0.91);
layers[1].rotation.y = ((2 * pi) / 9) * 0.6;
layers[2].scale.set(0.8, 1, 0.91);
layers[2].rotation.y = ((2 * pi) / 9) * 0.3;
layers[3].scale.set(0.75, 1, 0.92);
layers[3].rotation.y = ((2 * pi) / 9) * 0.7;
layers[4].scale.set(0.7, 1, 0.93);
layers[4].rotation.y = ((2 * pi) / 9) * 0.9;

var geo_base = new THREE.CylinderGeometry(8, 1, 10, 9);
var base = new THREE.Mesh(geo_base, mat_dark);
base.scale.x = layers[0].scale.x;
base.position.y = -5;
ground.add(base);

scene.add(ground);

//-------------------------------------trees-------------------------------------
var tree = new THREE.Group();

//trunk
var geo_trunk = new THREE.IcosahedronGeometry(9, 0);
var trunk = new THREE.Mesh(geo_trunk, mat_grey);
var a = new THREE.Vector3(1, 0, 10);
trunk.rotation.x = pi / 2;
trunk.position.y = 5;
trunk.scale.set(0.03, 0.03, 1);
trunk.castShadow = true;
trunk.receiveShadow = true;
tree.add(trunk);

//crown
// var geo_crown = new THREE.IcosahedronGeometry(2.5, 0);
// var crown = new THREE.Mesh(geo_crown, mat_yellow);
// crown.scale.y = 0.4;
// crown.rotation.z = -0.5;
// crown.rotation.x = -0.2;
// crown.position.set(trunk.position.x, 12, trunk.position.z);
// crown.castShadow = true;
// tree.add(crown);

//leaf
var leaf = new THREE.Group();
var mainStem = new THREE.Mesh(geo_trunk, mat_grey);
mainStem.scale.set(0.007, 0.007, 0.16);
mainStem.rotation.x = pi / 2;
mainStem.castShadow = true;
leaf.add(mainStem);

var geo_blade = new THREE.CylinderGeometry(0.7, 0.7, 0.05, 12);
var blade = new THREE.Mesh(geo_blade, mat_yellow);
blade.rotation.z = pi / 2;
blade.scale.x = 1.2;
blade.position.set(-0.05, 0.4, 0);
blade.castShadow = true;
leaf.add(blade);

var subStems = [];
for (var i = 0; i < 8; i++) {
    subStems[i] = mainStem.clone();
    subStems[i].scale.set(0.0055, 0.0055, 0.01);
    subStems[i].castShadow = true;
    leaf.add(subStems[i]);
}
subStems[0].rotation.x = -pi / 4;
subStems[0].scale.z = 0.04;
subStems[0].position.set(0, 0.8, 0.2);

subStems[2].rotation.x = -pi / 6;
subStems[2].scale.z = 0.05;
subStems[2].position.set(0, 0.5, 0.25);

subStems[4].rotation.x = -pi / 8;
subStems[4].scale.z = 0.055;
subStems[4].position.set(0, 0.2, 0.3);

subStems[6].rotation.x = -pi / 10;
subStems[6].scale.z = 0.045;
subStems[6].position.set(0, -0.1, 0.26);

for (var i = 1; i < 8; i += 2) {
    subStems[i].rotation.x = -subStems[i - 1].rotation.x;
    subStems[i].scale.z = subStems[i - 1].scale.z;
    subStems[i].position.set(
        0,
        subStems[i - 1].position.y,
        -subStems[i - 1].position.z
    );
}
leaf.rotation.x = pi / 3;
leaf.rotation.z = 0.2;
leaf.position.set(trunk.position.x - 0.2, 5, trunk.position.z + 1);
tree.add(leaf);

var leaf_1 = leaf.clone();
leaf_1.rotation.x = -pi / 3;
leaf_1.position.set(trunk.position.x - 0.2, 6, trunk.position.z - 1);
tree.add(leaf_1);
tree.rotation.y = -pi / 12;
tree.position.set(-2, 0, -2);
scene.add(tree);

var tree_1 = tree.clone();
tree_1.scale.set(0.8, 0.8, 0.8);
tree_1.position.set(-1, 0, -5);
tree_1.rotation.y = -pi / 5;
scene.add(tree_1);

var tree_2 = tree.clone();
tree_2.scale.set(0.7, 0.7, 0.7);
tree_2.position.set(-2, 0, 0.5);
tree_2.rotation.y = -pi / 12;
tree_2.children[2].rotation.x = -pi / 3;
tree_2.children[2].position.z = trunk.position.z - 1;
// tree_2.children[3].rotation.x = pi / 3;
// tree_2.children[3].position.z = trunk.position.z + 1;
scene.add(tree_2);

//-------------------------------------horse-------------------------------------
//horse body
var horse = new THREE.Group();

// Horse head (elongated and angular)
var geo_horseHead = new THREE.CylinderGeometry(0.5, 0.3, 1.5, 8);
var horseHead = new THREE.Mesh(geo_horseHead, mat_dark); // Dark color for head
horseHead.position.y = 2.5;
horseHead.rotation.x = -0.3;
horseHead.castShadow = true;
horse.add(horseHead);

// Horse body (elongated and thinner)
var geo_horseBody = new THREE.CylinderGeometry(1.5, 1, 4, 8);
var horseBody = new THREE.Mesh(geo_horseBody, new THREE.MeshStandardMaterial({ color: 0x8B4513 })); // Brown body color
horseBody.position.set(0, horseHead.position.y, -3);
horseBody.rotation.set(3.1, 0, 0);
horseBody.castShadow = true;
horse.add(horseBody);

// Tail (long, thin, and tapered, with a new color)
var geo_tail = new THREE.CylinderGeometry(0.15, 0.05, 2, 8);
var tail = new THREE.Mesh(geo_tail, new THREE.MeshStandardMaterial({ color: 0x000000 })); // Black tail
tail.position.set(horseHead.position.x, horseHead.position.y - 0.7, -4.5);
tail.castShadow = true;
horse.add(tail);

// Mane (black, flowing along the neck)
var mane = [];
var geo_mane = new THREE.IcosahedronGeometry(0.3, 0);
for (var i = 0; i < 7; i++) {
    mane[i] = new THREE.Mesh(geo_mane, new THREE.MeshStandardMaterial({ color: 0x000000 })); // Black mane
    mane[i].castShadow = true;
    horse.add(mane[i]);
}

// Mane positions and rotations along the neck
mane[0].position.set(-0.6, horseHead.position.y + 1.2, 0);
mane[1].position.set(-0.3, horseHead.position.y + 1.3, 0);
mane[2].position.set(0, horseHead.position.y + 1.4, 0);
mane[3].position.set(0.3, horseHead.position.y + 1.3, 0);
mane[4].position.set(0.6, horseHead.position.y + 1.2, 0);
mane[5].position.set(0.7, horseHead.position.y + 1.1, 0);
mane[6].position.set(0.9, horseHead.position.y + 1.0, 0);

// Mane rotations to give a natural flowing effect
for (var i = 0; i < mane.length; i++) {
    mane[i].rotation.set(pi / 12, 0, pi / 3);
}

// Legs (thin, long, and cylindrical like horse legs)
var legs = [];
var geo_leg = new THREE.CylinderGeometry(0.2, 0.15, 2.5, 8);
for (var i = 0; i < 4; i++) {
    legs[i] = new THREE.Mesh(geo_leg, mat_dark);
    legs[i].castShadow = true;
    legs[i].receiveShadow = true;
    horse.add(legs[i]);
}

// Adjusting positions of the legs for a horse-like stance
legs[0].position.set(0.6, 1.1, -2.2);  // Front right
legs[1].position.set(-0.6, 1.1, -2.2); // Front left
legs[2].position.set(0.8, 1.1, -4);  // Back right
legs[3].position.set(-0.8, 1.1, -4); // Back left

// Hooves (more rectangular and flattened, like horse hooves)
var hooves = [];
var geo_hoof = new THREE.CylinderGeometry(0.25, 0.3, 0.2, 8);
for (var i = 0; i < legs.length; i++) {
    hooves[i] = new THREE.Mesh(geo_hoof, new THREE.MeshStandardMaterial({ color: 0x2F4F4F })); // Dark hooves
    horse.add(hooves[i]);
    hooves[i].scale.set(1, 0.5, 1);
    hooves[i].castShadow = true;
    hooves[i].receiveShadow = true;
    hooves[i].position.set(legs[i].position.x, 0, legs[i].position.z + 0.2);
}
hooves[0].position.y = 0.55;
hooves[1].position.y = 0.55;
hooves[2].position.y = 0.65;
hooves[3].position.y = 0.65;

// Eyes (larger and more forward on the head)
var geo_eye = new THREE.CylinderGeometry(0.25, 0.2, 0.05, 8);
var eyes = [];
for (var i = 0; i < 2; i++) {
    eyes[i] = new THREE.Mesh(geo_eye, new THREE.MeshStandardMaterial({ color: 0x000000 })); // Black eyes
    horse.add(eyes[i]);
    eyes[i].castShadow = true;
    eyes[i].position.set(0, horseHead.position.y + 0.25, 0.7);
    eyes[i].rotation.x = pi / 2 - pi / 15;
}
eyes[0].position.x = 0.3;
eyes[1].position.x = -eyes[0].position.x;

eyes[0].rotation.z = -pi / 15;
eyes[1].rotation.z = -eyes[0].rotation.z;

// Eyeballs
var geo_eyeball = new THREE.SphereGeometry(0.12, 8, 8);
var eyeballs = [];
for (var i = 0; i < 2; i++) {
    eyeballs[i] = new THREE.Mesh(geo_eyeball, new THREE.MeshStandardMaterial({ color: 0xffffff })); // White eyeballs
    horse.add(eyeballs[i]);
    eyeballs[i].castShadow = true;
    eyeballs[i].position.set(
        eyes[i].position.x,
        eyes[i].position.y,
        eyes[i].position.z + 0.02
    );
}

// Positioning the horse in the scene and fixing body rotation
horse.position.set(2, -0.2, -1);
horse.scale.set(1, 1, 1);
horse.rotation.set(0, pi / 4, 0); // Rotate to align the body properly
horseBody.rotation.x = -pi / 8;  // Adjust the rotation of the body to make it horizontal
scene.add(horse);

// Normal Texture Map

/* const normalTexture = new THREE.TextureLoader().load('images/NormalMap.png');

// const torusGeo = new THREE.TorusKnotGeometry( 5, 1, 250, 5, 9, 15 );
// const torusMaterial = new THREE.MeshStandardMaterial( {
//    normalMap: normalTexture,
//    roughness: 0,
    metalness: .8
} ); */

// Knot
// const torusKnot = new THREE.Mesh( torusGeo, torusMaterial );

// scene.add( torusKnot );
// torusKnot.position.y = 20

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
    // // slowly rotate the cube:
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // // rotate the icosahedron a little faster in the opposite direction:
    // icoMesh.rotation.z += -0.03
    // icoMesh.rotation.y += -0.03
    // // rotate the smiley sphere on the Y axis:
    // smileMesh.rotation.y += 0.05
    // rotate horse:
    // horse.rotation.x += 0.01;
    horse.rotation.y += 0.01;
    // ALLOWS YOUR ORBIT CONTROLS TO UPDATE LIVE IN REAL-TIME:
    controls.update()

    renderer.render( scene, camera );
}

animate();

//render
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};
render();

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
