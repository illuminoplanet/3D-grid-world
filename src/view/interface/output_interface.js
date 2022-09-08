import * as THREE from "https://cdn.skypack.dev/three@0.144.0"
import { Environment } from "./component/environment.js"


export class OutputInterface {
    constructor(data_buffer) {
        this.data_buffer = data_buffer

        this.scene = new THREE.Scene()
        this.camera = new THREE.OrthographicCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        this.env = new Environment(this.data_buffer)
        this.render()
    }
    update() {
        this.env.update(this.scene)
    }
    render() {
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)

        console.log(this.data_buffer)
    }
}