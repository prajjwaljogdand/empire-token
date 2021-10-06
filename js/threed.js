const canvas = document.querySelector('.webgl')
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth / 1.01, window.innerHeight / 1.01);

renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;



let tl = new gsap.timeline({ repeat: -1 });
var loader = new THREE.GLTFLoader();



loader.load('./logo2.glb', function (glb) {
    console.log(glb)
    root = glb.scene;
    root.scale.set(0.16, 0.16, 0.2)
    root.position.set(-5.39, 3.15, -0.2)
    root.rotation.set(0.09, 0.05, 0)
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;
    scene.add(root);
    scene.rotation.set(0, 0.4, 0)
    tl.to(scene.rotation, { x: 0, y: -0.4, duration: 3 });
    tl.to(scene.rotation, { x: 0, y: 0.4, duration: 3 });
  

}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + "% loaded")
}, function (error) {
    console.log(error)
})
var light = new THREE.AmbientLight(0x24DDDC, 0.001, 100)

scene.add(light)

var light_1 = new THREE.PointLight(0x24DDDC, 2, 10);
light_1.position.set(1, 1, 0.5);
light_1.castShadow = true;
light_1.rotation.z = 50;
scene.add(light_1);


var light_2 = new THREE.PointLight(0x7723ff, 8, 10);
light_2.position.set(-1, -1, -0.3);
light_2.castShadow = true;
scene.add(light_2);
light_2.rotation.z = 50;



window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect() = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera)
}
render();
