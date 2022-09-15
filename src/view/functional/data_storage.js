export class DataStorage {
    constructor() {
        this.storage = {}
        this.num_changed = 0 
        this.flag_changed = {}
    }
    set(json) {
        const key = Object.keys(json)[0]
        const data = json[key]

        if (!(key in this.storage)) {
            this.flag_changed[key] = false
        }

        this.storage[key] = data
        this.num_changed += !this.flag_changed[key]
        this.flag_changed[key] = true
    }
    get(key) {
        this.num_changed -= 1
        this.flag_changed[key] = false
        return this.storage[key]
    }
}