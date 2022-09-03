import { EventHandler } from "./functional/event_handler.js"
import { DataBuffer } from "./functional/data_buffer.js"
import { InputInterface } from "./interface/input_interface.js"


class View {
    constructor() {
        this.data_buffer = new DataBuffer()
        this.event_handler = new EventHandler(this.data_buffer)

        this.input_component = new InputInterface(this.event_handler)
    }
}

window.onload = () => {
    new View()
}