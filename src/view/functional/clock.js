export class Clock {
    constructor(data_storage, event_handler, interval) {
        this.data_storage = data_storage
        this.event_handler = event_handler
        this.tid = setInterval(this.ring.bind(this), interval)
    }
    ring() {
        if (this.data_storage.get("env_run")) {
            this.event_handler.handle("run_episode")
        }
    }
}