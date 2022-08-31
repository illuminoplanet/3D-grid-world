export class EventHandler {
    contructor(data_buffer) {
        console.log(data_buffer)


        this.data_buffer = data_buffer
        console.log(this.data_buffer)
    }
    handle(event) {
        const url = `http://localhost:5000/${event}`
        const data = [0, 0, 0]
        const request = this.create_request(data)
        
        fetch(url, request)
        .then((res) => { return res.json() })
        .then((json) => {
            () => this.data_buffer.append(json)
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