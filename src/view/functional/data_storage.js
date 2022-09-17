export class DataStorage {
    constructor() {
        this.storage = { 
            "env_shape" : [3, 4, 5], 
            "agent_pos" : [0, 0, 0]
        }
        this.num_changed = Object.keys(this.storage).length
        this.flag_changed = {
            "env_shape" : true, 
            "agent_pos" : true
        }
    }
    set(json) {
        const keys = Object.keys(json)
        for (const key of keys) {
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