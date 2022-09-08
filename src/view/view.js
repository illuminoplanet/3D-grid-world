import { EventHandler } from "./functional/event_handler.js"
import { DataBuffer } from "./functional/data_buffer.js"
import { InputInterface } from "./interface/input_interface.js"
import { OutputInterface } from "./interface/output_interface.js"


class View {
    constructor() {
        this.data_buffer = new DataBuffer()
        this.event_handler = new EventHandler(this.data_buffer)

        this.input_interface = new InputInterface(this.event_handler)
        this.output_interface = new OutputInterface(this.data_buffer)
    }
}

window.onload = () => {
    new View()
}