import * as THREE from "https://cdn.skypack.dev/three@0.144.0"
import { Environment } from "./component/environment.js"


export class OutputInterface {
    constructor(data_storage) {
        const [w, h] = [window.innerWidth, window.innerHeight]
        const zoom = 160

        this.data_storage = data_storage
        this.env = new Environment(this.data_storage)
         
        // Scene
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xFFFFFF)

        // Camera
        this.camera = new THREE.OrthographicCamera(-w / zoom, h / zoom, w / zoom, -h / zoom, 1, 1000)
        this.camera.position.set(10, 10, 10)
        this.camera.lookAt(0, 0, 0)

        // Renderer
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
       
        // Light
        this.light = new THREE.PointLight(0xFFFFFF, 0.5)
        this.light.position.set(0, 10, 0)
        this.scene.add(this.light)

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