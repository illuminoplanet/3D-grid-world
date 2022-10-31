export class Button {
	constructor(type, event_handler) {
		let $button = $("<button>", { "id" : type })
		$button.css({ "background" : `url(view/resources/${type}.svg)` })
		$button.click(() => event_handler.handle(type))

		return $button
	}
}