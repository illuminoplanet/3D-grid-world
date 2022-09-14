import { Sidebar } from "./component/sidebar.js"
import { Button } from "./component/button.js"


export class InputInterface {
    constructor() {
        this.components = [
            new Sidebar([
                new Button("reshape_environment",this.event_queue), 
                new Button("change_algorithm", this.event_queue), 
                new Button("toggle_run", this.event_queue), 
                new Button("reset_environment", this.event_queue), 
                new Button("toggle_visualization", this.event_queue)
            ])
        ]
    }
}