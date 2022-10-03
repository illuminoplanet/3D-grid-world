import * as THREE from "https://cdn.skypack.dev/three@0.144.0"


export class Grid {
	constructor(scene, data_storage) {
        this.scene = scene
		this.data_storage = data_storage
        this.objects = []

        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, transparent : true, opacity : 0.5 })
	}
    update() {
        if (!this.data_storage.flag_changed["env_shape"]) {
            return 
        }
            
        for (const object of this.objects) {
            this.scene.remove(object)
        }
        this.object = []
        
        const shape = this.data_storage.get("env_shape")
        for (let x = 0; x < shape[0]; x++) {
            for (let y = 0; y < shape[1]; y++) {
                for (let z = 0; z < shape[2]; z++) {
                    const mesh = new THREE.Mesh(this.geometry, this.material)
                    mesh.position.set(x, y + 1, z) 
                    this.scene.add(mesh)
                    this.objects.push(mesh)
                }
            }
        }
    }
}