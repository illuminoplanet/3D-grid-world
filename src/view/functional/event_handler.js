export class EventHandler {
    constructor(data_buffer) {
        this.data_buffer = data_buffer
    }
    handle(event) {
        const url = `http://d-grid-world-hxtn.run.goorm.io/${event}`
        const data = this.get_data(event)
        const request = this.create_request(data)
        
        fetch(url, request)
        .then((res) => { return res.json() })
        .then((json) => {
            this.data_buffer.append(json)
        })
    }
    get_data(event) {
        if (event == "reshape_environment") {
            return [3, 3, 3]
        }
        else if (event == "change_algorithm") {
            return "policy_iteration"
        }
    }
    create_request(data) {
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