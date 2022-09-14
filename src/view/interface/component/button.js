export class Button {
	constructor(type) {
		this.button = document.createElement("button")
		this.button.className = "button"
		this.button.innerText = type
		// this.button.onclick = () => event_handler.handle(type)
		
		document.body.appendChild(this.button)
		return this.button
	}
}