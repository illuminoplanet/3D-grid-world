import * as THREE from "https://cdn.skypack.dev/three@0.144.0"
import { Grid } from "./output_component/grid.js"
import { Agent } from "./output_component/agent.js"
import { Plane } from "./output_component/plane.js"


export class OutputInterface {
    constructor(data_storage) {
        const [w, h] = [window.innerWidth, window.innerHeight]
        const zoom = 160
         
        // Scene
        this.scene = new THREE.Scene()
        this.scene.background = 0xF8F8F8

        // Camera
        this.camera = new THREE.OrthographicCamera(-w / zoom, w / zoom, h / zoom, -h / zoom, 1, 1000)
        this.camera.position.set(10, 10, 10)
        this.camera.lookAt(this.scene.position)

        // Renderer
        this.renderer = new THREE.WebGLRenderer( { antialias: true })
        this.renderer.shadowMap.enabled = true
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
       
        // Light
        const key_light = new THREE.DirectionalLight(0xffffff, 1)
        key_light.position.set(0, 100, 0)
        key_light.castShadow = true
        key_light.shadowDarkness = 1
        this.scene.add(key_light)

        const fill_light = new THREE.DirectionalLight(0xffffff, 0.9)
        fill_light.position.set(100, 50, 80)
        this.scene.add(fill_light)
    
        const back_light = new THREE.DirectionalLight( 0xffffff, 0.6)
        back_light.position.set(50, 100, 50)
        this.scene.add(back_light)

        this.data_storage = data_storage
        this.grid = new Grid(this.scene, this.data_storage)
        this.agent = new Agent(this.scene, this.data_storage)
        this.plane = new Plane(this.scene)

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