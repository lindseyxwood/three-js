import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// import './style.css'
// import javascriptLogo from './javascript.svg'
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

var layers = [];
var ground = new THREE.Group();

// Increase base radius from 8 to 15
const baseRadius = 15;
const layerCount = 5;

for (var i = 0; i < layerCount; i++) {
    var h = 0.1;
    // Decrease radius more gradually to create a wider base
    var geometry = new THREE.CylinderGeometry(baseRadius - i * 2, baseRadius - i, h, 12);
    layers.push(new THREE.Mesh(geometry, mat_orange));
    layers[i].position.y = h * i;
    layers[i].receiveShadow = true;
    ground.add(layers[i]);
}

// Modify scales and rotations for a more organic look
layers[0].scale.set(0.9, 1, 0.9);
layers[1].scale.set(0.85, 1, 0.92);
layers[1].rotation.y = ((2 * pi) / 12) * 0.6;
layers[2].scale.set(0.9, 1, 0.93);
layers[2].rotation.y = ((2 * pi) / 12) * 0.3;
layers[3].scale.set(0.85, 1, 0.94);
layers[3].rotation.y = ((2 * pi) / 12) * 0.7;
layers[4].scale.set(0.8, 1, 0.95);
layers[4].rotation.y = ((2 * pi) / 12) * 0.9;

// Increase base geometry size
var geo_base = new THREE.CylinderGeometry(baseRadius, 1, 10, 12);
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
trunk.position.y = 2;
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
tree_1.position.set(-3, 0, -5);
tree_1.rotation.y = -pi / 5;
scene.add(tree_1);

var tree_2 = tree.clone();
tree_2.scale.set(0.7, 0.7, 0.7);
tree_2.position.set(-5, 0, 0.5);
tree_2.rotation.y = -pi / 12;
tree_2.children[2].rotation.x = -pi / 3;
tree_2.children[2].position.z = trunk.position.z - 1;
// tree_2.children[3].rotation.x = pi / 3;
// tree_2.children[3].position.z = trunk.position.z + 1;
scene.add(tree_2);



// Fence creation function
function createFenceSegment(length) {
    var fence = new THREE.Group();
    var wood = [];
    var geo_wood = new THREE.BoxGeometry(1, 1, 1);

    for (var i = 0; i < 4; i++) {
        wood[i] = new THREE.Mesh(geo_wood, mat_brown);
        fence.add(wood[i]);
        wood[i].castShadow = true;
        wood[i].receiveShadow = true;
    }

    // Adjust length parameter for fence segment
    wood[0].scale.set(0.15, 1.7, 0.4);
    wood[1].scale.set(0.15, 1.8, 0.4);
    wood[2].scale.set(0.1, 0.3, length);
    wood[3].scale.set(0.1, 0.3, length);

    wood[0].position.set(0, 1.2, -1);
    wood[1].position.set(0, 1, 1);
    wood[2].position.set(0, 1.5, 0);
    wood[3].position.set(0.12, 0.9, 0);

    wood[3].rotation.x = pi / 32;
    wood[2].rotation.x = -pi / 32;
    wood[2].rotation.y = pi / 32;

    return fence;
}

// Function to create a circular fence around the ground
function createCircularFence(radius) {
    const fenceSegmentCount = 16; // Increased segments for smoother circle
    const fenceLength = 2.5; // Reduced fence segment length

    // Create a group to hold all fence segments
    const fenceLine = new THREE.Group();

    for (let i = 0; i < fenceSegmentCount; i++) {
        // Calculate the angle for each segment
        const angle = (i / fenceSegmentCount) * (2 * pi);

        // Reduce radius slightly to fit within ground
        const adjustedRadius = radius * 0.8;

        // Create a fence segment
        const fenceSegment = createFenceSegment(fenceLength);

        // Position the segment around the circle
        fenceSegment.position.x = adjustedRadius * Math.cos(angle);
        fenceSegment.position.z = adjustedRadius * Math.sin(angle);

        // Rotate the segment to face inward
        fenceSegment.rotation.y = angle + (pi / 2);

        // Add the segment to the fence line
        fenceLine.add(fenceSegment);
    }

    // Position the entire fence group at the same height as the ground
    fenceLine.position.y = 0;

    return fenceLine;
}

// Create and add the circular fence to the scene
const circularFence = createCircularFence(baseRadius);
scene.add(circularFence);

// Optional: Remove the previous single fence
// scene.remove(fence);  // Uncomment this if you want to remove the original fence


// Materials for hay bales
const mat_hay_yellow = new THREE.MeshLambertMaterial({ color: 0xfeb42b }); // Bright yellow for hay
const mat_hay_binding = new THREE.MeshLambertMaterial({ color: 0xFF0000 }); // Bright red for binding

function createHayBale() {
    const hayBale = new THREE.Group();

    // Main hay body - rectangular
    const baleWidth = 2;
    const baleHeight = 1.2;
    const baleDepth = 1;

    const baleGeometry = new THREE.BoxGeometry(baleWidth, baleHeight, baleDepth);
    const baleMesh = new THREE.Mesh(baleGeometry, mat_hay_yellow);
    hayBale.add(baleMesh);

    // Thin red binding strips
    const bindingThickness = 0.05;

    // Vertical red bindings (going around the length/depth of the bale)
    const verticalBindingGeo1 = new THREE.BoxGeometry(bindingThickness, baleHeight, baleDepth + 0.1);
    const verticalBindingLeft = new THREE.Mesh(verticalBindingGeo1, mat_hay_binding);
    verticalBindingLeft.position.x = -baleWidth/2 - bindingThickness/2;
    hayBale.add(verticalBindingLeft);

    const verticalBindingRight = verticalBindingLeft.clone();
    verticalBindingRight.position.x = baleWidth/2 + bindingThickness/2;
    hayBale.add(verticalBindingRight);

    return hayBale;
}

// Create a stack of hay bales
const hayBaleStack = new THREE.Group();

// Bottom layer - two bales side by side
const bottomBale1 = createHayBale();
bottomBale1.position.set(-1, 0, 0);  // Shifted left
hayBaleStack.add(bottomBale1);

const bottomBale2 = createHayBale();
bottomBale2.position.set(1, 0, 0);  // Shifted right
hayBaleStack.add(bottomBale2);

// Top bale - centered on the two bottom bales
const topBale = createHayBale();
topBale.position.set(0, 1.2, 0);  // Positioned on top of the bottom bales
hayBaleStack.add(topBale);

// Position the hay bale stack near the fence
hayBaleStack.position.set(5, 1, 5);  // Adjust coordinates as needed
scene.add(hayBaleStack);


// Horse Model Loading
let horse;
const loader = new GLTFLoader();

loader.load(
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/models/gltf/Horse.glb',
    (gltf) => {
        horse = gltf.scene;

        // Scale the horse much smaller
        horse.scale.set(0.02, 0.02, 0.02);

        // Precise positioning on the ground
        // The ground base is at y = -5, and we want the horse to sit on top of the lowest layer
        horse.position.set(
            1,      // x position (centered)
            0.5,   // y position (just above the base, accounting for ground layers)
            -1      // z position (slightly back in the scene)
        );

        // Rotate the horse slightly
        horse.rotation.y = Math.PI / 4;

        // Add some shadows
        horse.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        scene.add(horse);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('An error happened', error);
    }
);



// Cow Model Loading
let cow; loader.load( 'images/cow.glb',
(gltf) => { cow = gltf.scene;

// Scale the cow
cow.scale.set(0.004, 0.004, 0.004);

// Position the cow in the scene
cow.position.set( -1, 0.5, 7);

// Rotate the cow slightly
cow.rotation.y = -Math.PI / 4;

// Add some shadows
cow.traverse((child) => {
    if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
    }
});

scene.add(cow);
},
    (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
    console.error('An error happened', error);
}
);



// Declaring jumpingPig
let jumpingPig = null;

// Pig Model Loading
const pigPositions = [
    { x: -7, z: 6 },
    { x: 5, z: -8},
    { x: 1.5, z: 5 }
];

pigPositions.forEach((pos, index) => {
    loader.load(
        'images/pig.glb',
        (gltf) => {
            const pig = gltf.scene;

            // Increase scale significantly
            pig.scale.set(0.05, 0.05, 0.05);

            // Position the pig
            pig.position.set(pos.x, 0.5, pos.z);

            // Rotate the pig slightly, with variation
            pig.rotation.y = Math.PI / 4 + (index * Math.PI / 6);

            // Add some shadows
            pig.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            if (pos.x === 5 && pos.z === -8) {
                jumpingPig = pig;
            }
            scene.add(pig);
        },
        (xhr) => {
            console.log(`Pig ${index + 1} ` + (xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error(`An error happened loading pig ${index + 1}`, error);
        }
    );
});


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
    if (jumpingPig) {
        const time = Date.now() * 0.001; // current time
        jumpingPig.position.y = 0.5 + Math.abs(Math.sin(time * 2) * 0.5); // Smooth up and down motion
    }

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
