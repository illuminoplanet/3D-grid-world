import * as THREE from "https://cdn.skypack.dev/three@0.144.0"


export class Environment {
	constructor(data_buffer) {
		this.data_buffer = data_buffer
        this.objects = []

        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
	}
    update(scene) {
        const shape = this.data_buffer.pop("reshape_environment")
        for (let x = 0; x < shape[0]; x++) {
            for (let y = 0; y < shape[1]; y++) {
                for (let z = 0; z < shape[2]; z++) {
                    const mesh = new THREE.Mesh(this.geometry, this.material)
                    mesh.position.x = x
                    mesh.position.y = y
                    mesh.position.z = z

                    scene.add(mesh)
                    this.objects.push(mesh)
                }
            }
        }
    }
}