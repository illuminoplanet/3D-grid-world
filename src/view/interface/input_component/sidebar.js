export class Sidebar {
	constructor(buttons) {
        let $sidebar = $("<nav>", { "class" : "sidebar" })
		$sidebar.append(buttons)

        window.addEventListener('mousemove', this.mouse_move.bind(this))
        return $sidebar
    }
    mouse_move(event) {
        event = event || window.event
		$(".sidebar").attr("is_open", event.pageX <= 400)
	}
}