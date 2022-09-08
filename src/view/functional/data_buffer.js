export class DataBuffer {
    constructor() {
        this.buffer = {}
    }
    push(json) {
        const key = Object.keys(json)[0]
        const data = json[key]

        if (!(key in this.buffer)) {
            this.buffer[key] = {"data" : []}
        }
        this.buffer[key]["data"].push(data)
        this.buffer[key]["latest"] = false
    }
    pop(key) {
        this.buffer[key]["latest"] = true
        return this.buffer[key]["data"].pop()
    }
    latest() {
        let latest = true
        for (let key in this.buffer) {
            latest = latest && 
        }
    }
}