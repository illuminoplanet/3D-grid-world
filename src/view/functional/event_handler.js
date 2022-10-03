export class EventHandler {
    constructor(data_storage) {
        this.data_storage = data_storage
        this.initialized = undefined
    }
    handle(event) {
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
    get_data(event) {
        if (event == "initialize") {
            return { "env_shape" : [2, 2, 2], "algorithm" : "policy_iteration" }
        }
        else if (event == "reshape_env") {
            return [3, 5, 3] // placeholder
        }
        else if (event == "change_algorithm") {
            return "policy_iteration" // placeholder
        }
        else if (event == "toggle_run") {
            return !this.data_storage.get("env_run")
        }
        else if (event == "fetch_policy_value") {
            const policy_value = this.data_storage.get("policy_value")
            this.data_storage.set(policy_value)
        
            return 1
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