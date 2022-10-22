export class EventHandler {
    constructor(data_storage) {
        this.data_storage = data_storage
        this.initialized = undefined

        this.internal_event = ["step_agent"]
    }
    handle(event) {
        if (this.internal_event.includes(event)) {
            this.handle_internal_event(event)
        }
        else {
            const url = `http://localhost:5000/${event}`
            const request = this.create_request(event)
            
            fetch(url, request)
            .then((res) => { return res.json() })
            .then((json) => {
                this.data_storage.set(json)
                if (event == "initialize") {
                    this.initialized()
                }
            })
        }
    }
    handle_internal_event(event) {
        if (event == "step_agent") {
            let old_action_history = this.data_storage.get("old_action_history")
            let agent_pos = this.data_storage.get("agent_pos") 
            const action_displacement = old_action_history.shift()

            agent_pos = agent_pos.map((e, i) => e + action_displacement[i])
            
            this.data_storage.set({
                "old_action_history" : old_action_history, 
                "agent_pos" : agent_pos
            })
        }
    }
    get_data(event) {
        if (event == "initialize") {
            return { "env_shape" : [2, 2, 2], "algorithm" : "policy_iteration" }
        }
        else if (event == "reshape_environment") {
            return [3, 5, 3] // placeholder
        }
        else if (event == "change_algorithm") {
            return "policy_iteration" // placeholder
        }
        else if (event == "toggle_run") {
            return !this.data_storage.get("env_run")
        }
        else if (event == "run_episode") {
            const old_policy = this.data_storage.get("policy")
            const old_action_history = this.data_storage.get("action_history")
            
            this.data_storage.set({
                "old_policy" : old_policy, 
                "old_action_history" : old_action_history, 
                "agent_pos" : [0, 0, 0]
            })
            return { "episode_stride" : 1, "max_episode_length" : 20 }
        }
    }
    create_request(event) {
        const data = this.get_data(event)
        const request = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({data : data})
        }
        return request
    }
}