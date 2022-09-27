import * as THREE from "three";
import { OrbitControls } from "/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";

let scene;
let camera;
let renderer;
const canvas = document.querySelector(".webgl");
const loader = new THREE.TextureLoader();

scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

const controls = new OrbitControls(camera, renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;

const earthShape = new THREE.SphereGeometry(0.6, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
  roughness: 1,
  metalness: 0,
  map: loader.load('texture/earthmap1k.jpg'),
  bumpMap: loader.load('texture/earthbump.jpg'),
  bumpScale: 0.3
});
const earthMesh = new THREE.Mesh(earthShape, earthMaterial);

const cloudShape = new THREE.SphereGeometry(0.63, 43, 32)
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: loader.load('texture/earthCloud.png'),
    transparent: true,
})
const cloudMesh = new THREE.Mesh(cloudShape, cloudMaterial)

const starShape = new THREE.SphereGeometry(80, 64, 64)
const starMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('texture/galaxy.png'),
    side: THREE.BackSide,
})
const starMesh = new THREE.Mesh(starShape, starMaterial)

scene.add(earthMesh)
scene.add(cloudMesh)
scene.add(starMesh)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

const render = () => {
  renderer.render(scene, camera);
};

const animate = () => {
  requestAnimationFrame(animate)
  earthMesh.rotation.y -= 0.0015
  cloudMesh.rotation.y -= 0.001
  starMesh.rotation.y -= 0.002
  controls.update()
  render();
};

animate();
