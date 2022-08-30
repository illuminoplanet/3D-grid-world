import { Button } from "./component/button.js"

export class InputComponent {
    constructor(event_handler) {
        this.components = [
            new Button("reshape_environment", event_handler)
        ]
    }
}