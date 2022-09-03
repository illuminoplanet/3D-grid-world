import { Button } from "./component/button.js"

export class InputInterface {
    constructor(event_handler) {
        this.nav = document.createElement("nav")
        document.body.appendChild(this.nav)
        
        this.components = [
            new Button("reshape_environment", event_handler), 
            new Button("change_algorithm", event_handler), 
            new Button("toggle_run", event_handler), 
            new Button("reset_environment", event_handler), 
            new Button("toggle_visualization", event_handler), 
        ]
        for (let button in this.components) {
            this.nav.appendChild(button)
        }
    }
}