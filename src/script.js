import './style.css'
import Satellite from "./physics/Satellite";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import gsap from 'gsap'
import * as dat from 'dat.gui'
// import { Vector3 } from "three";

/**
 * cursor
 * 
 * 
 */
// Scene
const scene = new THREE.Scene()
const Textur = new THREE.TextureLoader()
const textureEarth = Textur.load('/textures/earth.jpg')

const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
        cursor.x = (event.clientX / sizes.width - 0.5)
        cursor.y = -(event.clientY / sizes.height - 0.5)

    })
    // Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    // full screen
window.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    })
    /**
     * Camera
     */
    // Base camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100)
    // const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100)
camera.position.z = 15
scene.add(camera)
    // Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
    /**
     * Renderer
     */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//////////////////////////////////////////////////////////////////////////////////////
/**
 * Draw
 */
//light

// Earth
const earthGeometry = new THREE.SphereBufferGeometry(1.25, 60, 60)
const earthMaterial = new THREE.MeshBasicMaterial({
    map: textureEarth,
    bumpMap: Textur.load("/images/earthbump1k.jpg"),
    bumpScale: 0.75,
    color: 0xf1f1f1
})
const Erathmesh = new THREE.Mesh(earthGeometry, earthMaterial)
Erathmesh.rotation.x = 0.2
Erathmesh.position.x = 0
Erathmesh.position.y = 0
Erathmesh.position.z = 0
scene.add(Erathmesh)

// sun
const geometrysun = new THREE.SphereBufferGeometry(5, 100, 600)
const materialsun = new THREE.MeshBasicMaterial({
    map: Textur.load("/images/sun_texture.jpg"),
    // color: 'yellow'
})
const sunhmesh = new THREE.Mesh(geometrysun, materialsun)
sunhmesh.rotation.x = 0.2
sunhmesh.position.x = 39.6
sunhmesh.position.y = 10
sunhmesh.position.z = -49.5
scene.add(sunhmesh)
    //Clouds
const cloudGeometry = new THREE.SphereGeometry(1.3, 50, 50);
const cloudMaterial = new THREE.MeshBasicMaterial({
    map: Textur.load("/images/clouds_2.jpg"),
    transparent: true,
    opacity: 0.6
});
const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
clouds.rotation.x = 2
scene.add(clouds);

//Stars
var starGeometry = new THREE.SphereGeometry(60, 50, 50);
var starMaterial = new THREE.MeshBasicMaterial({
    map: Textur.load("/images/galaxy_starfield.png"),
    side: THREE.DoubleSide,
    shininess: 0
});
var starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);
// satellite

////////////////////Satellite
const SatlliteGroup = new THREE.Group()
const geometry2 = new THREE.SphereBufferGeometry(0.1, 16, 16)
const material2 = new THREE.MeshBasicMaterial({
    // map: texture,
    color: 'white',

})
const M = new THREE.Mesh(geometry2, material2)
M.position.x = -0
M.position.y = 0.2
M.position.z = 0.05
const S11 = new THREE.BoxGeometry(0.01, 0.1, 0.3);
const S12 = new THREE.MeshBasicMaterial({
    map: Textur.load("/images/earthcloudmap.jpg"),

    color: 'white',

});
const cu = new THREE.Mesh(S11, S12, M);
// cu.rotation.z = -0.4
cu.position.y = 0.2
cu.position.z = 0.5

// secand cube
const S13 = new THREE.BoxGeometry(0.01, 0.1, 0.3);
const S14 = new THREE.MeshBasicMaterial({
    map: Textur.load("/images/earthcloudmap.jpg"),
});
const cu2 = new THREE.Mesh(S13, S14);
// cu2.rotation.z = -0.4
cu2.position.y = 0.2
cu2.position.z = -0.5


// 
SatlliteGroup.add(cu, cu2, M);
scene.add(SatlliteGroup)
SatlliteGroup.rotation.y = 5
SatlliteGroup.position.x = 1
SatlliteGroup.position.y = 0
SatlliteGroup.position.z = -38500061
    /////////////////////////////////////////

// scene.add(M)
const parameters = {
        Satellite_Mass: 5.9742 * Math.pow(10, 24),
        drag_coeff: 1,
        Gravity_coeff: 6.67428 * Math.pow(10, -11),
        Erath_Mass: 5.9742 * Math.pow(10, 24),
        Plane_raduis: 6400,
        roo: 5520,
        atmo_rho: 1000,
        speed: 97938881429.888306,
        // speed: 77319660193690.66,
        AddtoinSpeed: 1,
        Pos: 9000000
    }
    //  * Debug
    //  */
const gui = new dat.GUI({
        // closed: true,
        width: 900,
        height: 1900
    })
    // gui.hide()
gui.add(parameters, 'AddtoinSpeed').min(0.6).max(2).step(0.00000000000000000000000000001).name('speed').onFinishChange()

gui.add(parameters, 'Erath_Mass').min(0.9042 * Math.pow(10, 24)).max(100.9742 * Math.pow(10, 24)).step(1.9742 * Math.pow(10, 24)).name('Planet_Mass')
gui.add(SatlliteGroup.position, 'z').min(18500061).max(88500061).step(1000000).name('Sattalite_position')
gui
    .add(parameters, 'Pos').min(4000000).max(14000000).step(1000000).name('Pos')
gui.add(SatlliteGroup, 'visible')
gui.add(earthMaterial, 'wireframe')

// gui
//     .addColor(parameters, 'color')
//     .onChange(() => {
//         material.color.set(parameters.color)
//     })
// star
const pratical = new THREE.TorusKnotGeometry(2, 60, 90)
const patcalm = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true
})
const patcalMesh = new THREE.Points(pratical, patcalm)
    // scene.add(patcalMesh)
let SatelliteErathGroupe = new THREE.Group()
const geometryCy = new THREE.Geometry()
const materialCy = new THREE.Geometry()
const meshCy = new THREE.Geometry(geometryCy, materialCy)
scene.add(SatelliteErathGroupe)

let SatellitePhysics = new Satellite(
    new THREE.Vector3(SatlliteGroup.position.x, SatlliteGroup.position.y, SatlliteGroup.position.z),
    new THREE.Vector3(Erathmesh.position.x, Erathmesh.position.y, Erathmesh.position.z),
    parameters.Gravity_coeff,
    parameters.drag_coeff,
    parameters.speed,
    parameters.roo

)


/**
 * Animate
 */
const clock = new THREE.Clock()
let OldTime = 0;


const tick = () => {

    console.log("parameters.AddtoinSpeed", parameters.AddtoinSpeed)
    const elapsedTime = clock.getElapsedTime()

    const deltatime = 0.00001
    SatellitePhysics.update(deltatime, parameters.AddtoinSpeed, parameters.Erath_Mass, parameters.Satellite_Mass)
    SatlliteGroup.position.z = SatellitePhysics.position.z / parameters.Pos
    SatlliteGroup.position.x = SatellitePhysics.position.x / parameters.Pos
    SatlliteGroup.position.y = SatellitePhysics.position.y / parameters.Pos
        // Moonmesh.position.x = Math.sin(elapsedTime) * 3
    parameters.AddtoinSpeed = 1

    console.log("XX", SatlliteGroup.position.x)
    console.log("YY", SatlliteGroup.position.y)
    console.log("zz", SatlliteGroup.position.z)
    console.log("velocity", SatellitePhysics.velocity)
    var dotGeometry = new THREE.Geometry();
    dotGeometry.vertices.push(new THREE.Vector3(SatlliteGroup.position.x, SatlliteGroup.position.y, SatlliteGroup.position.z));
    var dotMaterial = new THREE.PointsMaterial({ size: 1, sizeAttenuation: false });
    var dot = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dot);
    Erathmesh.rotation.y = elapsedTime / 5

    controls.update()
        // Render
    renderer.render(scene, camera)
        // Call tick again on the next frame
    window.requestAnimationFrame(tick)
        // console.log(tick)
}

tick()