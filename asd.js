// console.log(THREE)

//scene
const scene =new THREE.Scene()

// cube
const geometry = new THREE.BoxGeometry(1,5,-1)
const material = new THREE.MeshBasicMaterial({color: 'blue'})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//size
const sizes = {
    width : 800,
    height : 600 
}


//camera

const camera = new THREE.PerspectiveCamera(75 , sizes.width / sizes.height)
camera.position.z = 5
camera.position.x = 1
camera.position.y = 1
scene.add(camera)

//render

const canvas = document.querySelector('.webgl AH')
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})

renderer.setSize(sizes.width , sizes.height )
renderer.render(scene , camera)


