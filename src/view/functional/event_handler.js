export class EventHandler {
    contructor(data_buffer) {
        this.data_buffer = data_buffer
    }
    handle(event, data) {
        const url = `http://grid-world-d-uyiya.run.goorm.io/{event}`
        const request = create_request(data)
        
        fetch(url, request)
        .then((res) => { return res.json() })
        .then((json) => {
            this.data_buffer.append(json)
        })
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