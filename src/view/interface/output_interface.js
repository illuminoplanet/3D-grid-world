import * as THREE from "https://cdn.skypack.dev/three@0.144.0"
import { Environment } from "./component/environment.js"


export class OutputInterface {
    constructor(data_storage) {
        this.data_storage = data_storage
        this.env = new Environment(this.data_storage)
         
        // Scene
        this.scene = new THREE.Scene()

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(10, 10, 10)
        this.camera.lookAt(0, 0, 0)

        // Renderer
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
       
        // Light
        this.light = new THREE.HemisphereLight(0x404040, 0xFFFFFF, 0.5)
        this.scene.add(light)

        this.render()
    }
    update() {
        this.env.update(this.scene)
    }
    render() {
        if (this.data_storage.num_changed) {
            this.update()
        }
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)
    }
}