export class Clock {
    constructor(data_storage, event_handler, interval) {
        this.data_storage = data_storage
        this.event_handler = event_handler

        this.tid = setInterval(this.tick.bind(this), interval)
        this.count = 0
    }
    tick() {
        if (!this.data_storage.get("old_action_history").length) {
            this.event_handler.handle("run_episode")
        }
        else if (this.data_storage.get("env_run"))
        {
            this.event_handler.handle("step_agent")
        }
    }
}