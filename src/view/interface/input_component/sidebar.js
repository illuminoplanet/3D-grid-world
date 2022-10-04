export class Sidebar {
	constructor(components) {
        this.components = components
        
        this.sidebar = document.createElement("nav")
        this.sidebar.className = "sidebar"
        this.sidebar.setAttribute("open", false)

        for (let comp of this.components) {
			this.sidebar.appendChild(comp)
		}
        document.body.appendChild(this.sidebar)
        window.addEventListener('mousemove', this.mouse_move.bind(this))

        return this.sidebar
    }
    mouse_move(event) {
        event = event || window.event
        for (let comp of this.components) {
			comp.setAttribute("open", event.pageX <= 400)
		}
	}
}