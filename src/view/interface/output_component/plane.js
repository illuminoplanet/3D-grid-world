import * as THREE from "https://cdn.skypack.dev/three@0.144.0"


export class Plane {
	constructor(scene) {
        this.scene = scene
        this.geometry = new THREE.PlaneGeometry(100, 100)
        this.material = new THREE.MeshPhongMaterial( { opacity : 0.5 })
        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.plane.receiveShadow = true
        this.plane.position.y = -2
        this.plane.rotation.x = -0.5 * Math.PI
        
        this.scene.add(this.plane)
	}
}