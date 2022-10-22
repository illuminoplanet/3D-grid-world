import * as THREE from "https://cdn.skypack.dev/three@0.144.0"


export class Agent {
	constructor(scene, data_storage) {
        this.scene = scene
		this.data_storage = data_storage
        this.objects = []

        this.geometry = new THREE.ConeGeometry(0.2, 0.5, 32)
        this.material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, wireframe: true })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
	}
    update() {
        if (!this.data_storage.flag_changed["agent_pos"]) {
            return 
        }

        const [x, y, z] = this.data_storage.get("agent_pos")
        this.mesh.position.set(x, y, z) 
	}
}