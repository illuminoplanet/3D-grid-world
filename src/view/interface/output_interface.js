import * as THREE from "https://cdn.skypack.dev/three@0.144.0"
import { Grid } from "./output_component/grid.js"
import { Agent } from "./output_component/agent.js"


export class OutputInterface {
    constructor(data_storage) {
        const [w, h] = [window.innerWidth, window.innerHeight]
        const zoom = 160
         
        // Scene
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xFFFFFF)

        // Camera
        this.camera = new THREE.OrthographicCamera(-w / zoom, h / zoom, w / zoom, -h / zoom, 1, 1000)
        this.camera.position.set(10, -10, 10)
        this.camera.lookAt(0, 0, 0)

        // Renderer
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
       
        // Light
        this.light = new THREE.PointLight(0xFFFFFF, 0.5)
        this.light.position.set(0, 10, 0)
        this.scene.add(this.light)
        
        this.data_storage = data_storage
        this.grid = new Grid(this.scene, this.data_storage)
        this.agent = new Agent(this.scene, this.data_storage)

        this.render()
    }
    update() {
        this.grid.update(this.scene)
        this.agent.update(this.scene)
    }
    render() {
        if (this.data_storage.num_changed) {
            this.update()
        }
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)
    }
}