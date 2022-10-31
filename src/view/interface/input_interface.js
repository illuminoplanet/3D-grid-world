import { Sidebar } from "./input_component/sidebar.js"
import { Button } from "./input_component/button.js"


export class InputInterface {
    constructor(event_handler) {
        let $sidebar = new Sidebar([
            new Button("environment", event_handler), 
            new Button("algorithm", event_handler), 
            new Button("play", event_handler), 
            new Button("reset", event_handler), 
            new Button("policy", event_handler)
        ])
        $("body").append($sidebar)
    }
}