import { EventHandler } from "./functional/event_handler.js"
import { DataStorage } from "./functional/data_storage.js"
import { InputInterface } from "./interface/input_interface.js"
import { OutputInterface } from "./interface/output_interface.js"


class View {
    constructor() {
        this.data_storage = new DataStorage()
        this.event_handler = new EventHandler(this.data_storage)

        this.input_interface = new InputInterface(this.event_handler)
        this.output_interface = new OutputInterface(this.data_storage)
    }
}

window.onload = () => {
    new View()
}