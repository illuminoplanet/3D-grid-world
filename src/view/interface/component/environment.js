import * as THREE from "https://cdn.skypack.dev/three@0.144.0"


export class Environment {
	constructor(data_storage) {
		this.data_storage = data_storage
        this.objects = []

        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, wireframe: true })
	}
    update(scene) {
        if (!this.data_storage.flag_changed["reshape_environment"]) {
            return 
        }

        const shape = this.data_storage.get("reshape_environment")["env_shape"][0]
        for (let x = 0; x < shape[0]; x++) {
            for (let y = 0; y < shape[1]; y++) {
                for (let z = 0; z < shape[2]; z++) {
                    const mesh = new THREE.Mesh(this.geometry, this.material)
                    mesh.position.set(x, y, z) 
                    scene.add(mesh)
                    this.objects.push(mesh)
                }
            }
        }
    }
}