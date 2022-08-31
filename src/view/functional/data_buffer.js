export class DataBuffer {
    constructor() {
        this.buffer = {}
    }
    append(json) {
        console.log(json)

        const key = Object.keys(json)[0]
        const data = json[key]

        if (!(key in this.buffer)) {
            this.buffer[key] = []
        }
        this.buffer[key].append(data)
    }
}