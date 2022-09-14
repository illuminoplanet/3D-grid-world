import { Sidebar } from "./component/sidebar.js"
import { Button } from "./component/button.js"


export class InputInterface {
    constructor(event_handler) {
        this.components = [
            new Sidebar([
                new Button("reshape_environment", event_handler), 
                new Button("change_algorithm", event_handler), 
                new Button("toggle_run", event_handler), 
                new Button("reset_environment", event_handler), 
                new Button("toggle_visualization", event_handler)
            ])
        ]
    }
}