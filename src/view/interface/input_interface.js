import { Button } from "./component/button.js"


export class InputInterface {
    constructor(event_handler) {
        this.sidebar = document.createElement("nav", { className: "sidebar" })
        document.body.appendChild(this.sidebar)
        
        this.components = [
            new Button("reshape_environment", event_handler), 
            new Button("change_algorithm", event_handler), 
            new Button("toggle_run", event_handler), 
            new Button("reset_environment", event_handler), 
            new Button("toggle_visualization", event_handler)
        ]
        for (let button of this.components) {
            this.sidebar.appendChild(button)
        }
    }
}