export class DataStorage {
    constructor() {
        this.storage = {}
        this.num_changed = Object.keys(this.storage).length
        this.flag_changed = {}
    }
    set(json) {
        for (const key of Object.keys(json)) {
            const data = json[key]

            this.storage[key] = data
            this.num_changed += !this.flag_changed[key]
            this.flag_changed[key] = true
        }
    }
    get(key) {
        this.num_changed -= 1
        this.flag_changed[key] = false
        return this.storage[key]
    }
}